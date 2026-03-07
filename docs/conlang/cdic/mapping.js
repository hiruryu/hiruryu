document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const hasId = params.has('id');
    if (!hasId) return;

    document.body.classList.add('detail-view');

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.style.display = 'none';

    const back = document.createElement('div');
    back.className = 'back-to-top';
    back.innerHTML = `<a href="cdic.html">📖 辞書トップへ戻る</a>`;
    document.body.insertBefore(back, document.body.firstChild);
  });

let dictionary = {}; // 辞書データを格納するオブジェクト
    const idToWord = {}; // ID → 単語 を引くためのマッピング
    let searchResults = []; // 検索結果を保存する配列
    let currentPage = 1; // 現在のページ番号
    const itemsPerPage = 30; // 1ページに表示する単語数⁺

    // 品詞ごとに CSS クラスを割り当てるための対応表
    const partsStyles = {
  "名象": "meishou",
  "動詞": "doushi",
  "名飾": "meishoku",
  "副飾": "fukushoku",
  "接辞": "fukuji",
  "離辞": "fukuji",
  "付称辞": "fukuji",
  "間投詞": "kanto",
};

// 意味テキストから翻訳語を抽出する関数
// ［注釈］や（補足）を削除し、カンマで分割して配列にする
function extractTranslations(text) {
      const cleaned = text.replace(/［[^］]*］/g, "").replace(/（[^）]*）/g, "").trim();
      return cleaned.split(/\s*,\s*/).filter(item => item !== "");
    }

    // ［注釈］や（補足）などを削除するユーティリティ関数
    function removeAnnotations(text) {
      return text.replace(/［[^］]*］/g, "").replace(/（[^）]*）/g, "").trim();
    }
  
  // Markdown を HTML に変換して表示する関数
  function renderMarkdown(md) {　
      
  // null や undefined の場合は空文字
  if (md === null || md === undefined) return "";

  // Markdown を HTML に変換して表示する関数
  if (Array.isArray(md)) md = md.join('\n\n');

  try {
    const rawHtml = marked.parse(String(md)); // marked.js で Markdown → HTML
    return DOMPurify.sanitize(rawHtml); // DOMPurify で XSS を防ぐためにサニタイズ
  } catch (e) {
    console.error('renderMarkdown error:', e); // エラーが起きた場合はログ出力
    return DOMPurify.sanitize(String(md)).replace(/\n/g, '<br>'); // フォールバック：改行を <br> に変換
  }
}

// Markdown 内の <h5> 見出しをリンク化する処理
function processH5Links(text) {
  return text.replace(/<h5>(.*?)<\/h5>/g, (match, innerText) => {
    const trimmedText = innerText.trim();

    // 見出しテキストに対応するリンクを取得
    const mappedLink = linkMapping[trimmedText] || trimmedText;

    // 外部URLなら新しいタブで開く
    if (/^https?:\/\//.test(mappedLink)) {
      return `<h5><a href="${mappedLink}" target="_blank" rel="noopener noreferrer">${trimmedText}</a></h5>`;
    }
    // 内部リンクなら辞書内単語を読み込む
    return `<h5><a href="#" onclick="loadWord('${mappedLink}'); return false;">${trimmedText}</a></h5>`;
  });
}

// 性的な意味の表示 / 非表示 を切り替えるボタン
    function toggleVulgarMeaning(linkElem) {
  const span = linkElem.nextElementSibling;
  if (span.style.display === "none") {
    span.style.display = "inline";
    linkElem.textContent = "性的な意味を非表示";
  } else {
    span.style.display = "none";
    linkElem.textContent = "性的な意味を表示";
  }
}
// 検索用正規化（ひらがな/カタカナ同一視、ラテンは小文字化＋アクセント除去）
function normalizeForSearch(input) {
  if (input === null || input === undefined) return "";
  let s = String(input);

  // 互換文字を統一（全角→半角等）
  s = s.normalize('NFKC');

  // カタカナ → ひらがな
  s = Array.from(s).map(ch => {
    const cp = ch.codePointAt(0);
    if (cp >= 0x30A1 && cp <= 0x30F6) {
      return String.fromCodePoint(cp - 0x60);
    }
    return ch;
  }).join('');

  // アクセントなどの結合文字を削除
  s = s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

  // NFC に戻して返す
  return s.normalize('NFC');
}

// JSON辞書を読み込んで……
    Promise.all([
      fetch('Cdic.json').then(response => response.json())
    ]).then(([nounData, noun2Data, verbData, adjectiveData, othersData]) => {
      // 読み込んだ辞書を統合するよ！
      dictionary = { ...nounData, ...noun2Data, ...verbData, ...adjectiveData, ...othersData };
      
      // ID → 単語のマッピングを作る
      for (const [word, data] of Object.entries(dictionary)) {
    if (data.id != null) {
      idToWord[String(data.id)] = word;
    }
  }

  // 検索高速化のため、正規化済みデータを事前計算して保存
for (const [word, data] of Object.entries(dictionary)) {
  // 単語キーを正規化
  const keyClean = removeAnnotations(word);
  data._normKey = normalizeForSearch(keyClean);

  // 意味を正規化
  const meaningText = data.meaning
    ? (Array.isArray(data.meaning) ? data.meaning.join(' ') : String(data.meaning))
    : "";
  data._normMeaning = normalizeForSearch(removeAnnotations(meaningText));

  // variants1 / variants2 を統合
  const variants = [];
  if (data.variants1) variants.push(...(Array.isArray(data.variants1) ? data.variants1 : [data.variants1]));
  if (data.variants2) variants.push(...(Array.isArray(data.variants2) ? data.variants2 : [data.variants2]));
  data._normVariants = normalizeForSearch(variants.join(' '));

  // vulgarMeaning も検索対象にする
  const vul = data.vulgarMeaning ? (Array.isArray(data.vulgarMeaning) ? data.vulgarMeaning.join(' ') : String(data.vulgarMeaning)) : "";
  data._normVulgar = normalizeForSearch(removeAnnotations(vul));
  try {
  // 活用形を生成するよ
  const inflRaw = (typeof generateInflections === "function") ? generateInflections(word) || [] : [];
  // 配列に変換するよ
  const inflArray = Array.isArray(inflRaw) ? inflRaw : Object.values(inflRaw || {});
  // 注釈除去するよ
  const inflCleanArray = inflArray
    .map(i => i == null ? "" : removeAnnotations(String(i)).trim())
    .filter(Boolean);

  data._inflArray = inflCleanArray;

  // 検索用正規化
  data._normInflArray = inflCleanArray.map(i => normalizeForSearch(i));
  data._normInflText = data._normInflArray.join(' ');
} catch (e) {
  // エラー時は空配列にしてね！
  data._inflArray = [];
  data._normInflArray = [];
  data._normInflText = "";
}
}

// URLパラメータがある場合はサイドバーを非表示にするよ！
      const sidebar = document.querySelector('.sidebar');
  if (location.search && sidebar) {
    sidebar.style.display = 'none';
  }

for (const [word, data] of Object.entries(dictionary)) {
  if (data.id != null) {
    idToWord[String(data.id)] = word;
  }
}

// URLパラメータから単語を取得するよ！
    function getWordFromParam() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (!id) return null;
  if (idToWord[id]) return idToWord[id];
  if (dictionary[id]) return id;
  return null;
}
    const initial = getWordFromParam();

    // 活用キャッシュ作成
    buildInflectionCache();
    // URLで指定した単語を表示するよ！
    if (initial) {
      showDetails(initial);
      placeholder.style.display    = 'none';
      wordList.innerHTML           = '';  
      pageInfoSpan.textContent     = '';
      prevPageBtn.disabled         = true;
      nextPageBtn.disabled         = true;
      document.getElementById('pagination').style.display = 'none';     
    }
  }).catch(error => console.error("JSON読み込みエラー:", error));

  // ↓セーフサーチトグルの設定だよ↓
  document.getElementById("safeSearchToggle").addEventListener("change", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  // 単語ページなら再表示
  if (id) {
    const word = idToWord[id];
    if (word) showDetails(word);
    return;
  }
  // 検索結果なら再検索
  performSearch();
});
// DOM要素を取得するよ
    const searchBox = document.getElementById("searchBox");
    const searchModeSelect = document.getElementById("searchMode");
    const wordList = document.getElementById("wordList");
    const details = document.getElementById("details");
    const placeholder = document.getElementById("placeholder");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageInfoSpan = document.getElementById("pageInfo");
