document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const hasId = params.has('id');
  const view = params.get('view');

  // view が side のときは戻るボタンを出さない
  if (hasId && view !== 'side') {
    const back = document.createElement('div');
    back.className = 'back-to-top';
    back.innerHTML = `<a href="ndic.html">📖 辞書トップへ戻る</a>`;
    document.body.insertBefore(back, document.body.firstChild);
  }

  // ここでURLの状態を見てサイドバーの有無を判定させる
  syncUIWithURL();
});

let dictionary = {};     // 検索対象
let etymDictionary = {}; // 語源専用
const idToWord = {}; // ID → 単語 を引くためのマッピング
let searchResults = []; // 検索結果を保存する配列
let currentPage = 1; // 現在のページ番号
const itemsPerPage = 12; // 1ページに表示する単語数⁺
const itemsCognates = 20; // 1ページに表示する単語数⁺


function showMoreCognates() {
  const all = window._cognatesAll;
  const start = window._cognatesIndex;
  const step = window._cognatesStep;

  const next = all.slice(start, start + step);

  window._cognatesIndex += next.length;

  const html = next.map(([word, entry]) => {
    return createWordLink(word, entry);
  }).join("，");

  const list = document.getElementById("cognatesList");

  list.innerHTML += ", " + html;

  // 全表示したら
  if (window._cognatesIndex >= all.length) {
    document.getElementById("cognatesMore").style.display = "none";
  }

  // 閉じる表示
  document.getElementById("cognatesClose").style.display = "block";
}

function closeCognates() {
  const all = window._cognatesAll;
  const step = window._cognatesStep;

  const initial = all.slice(0, step);
  window._cognatesIndex = initial.length;

  const html = initial.map(([word, entry]) => {
    return createWordLink(word, entry);
  }).join(", ");

  // リストを初期状態に戻す
  document.getElementById("cognatesList").innerHTML = html;

  // 「もっと見る」を復活（まだ残りがある場合）
  if (all.length > step) {
    document.getElementById("cognatesMore").style.display = "";
  }

  // 「閉じる」を隠す
  document.getElementById("cognatesClose").style.display = "none";
}


function showMoreSimilars() {
  const start = window._similarsIndex;
  const end = start + window._similarsStep;

  const next = window._similarsAll.slice(start, end);

  const html = next.map(([word, entry]) => {
    return createWordLink(word, entry);
  }).join(", ");

  const list = document.getElementById("similarsList");

  if (list && html) {
    list.innerHTML += ", " + html;
  }
  window._similarsIndex = end;

  // 全表示したら
  if (window._similarsIndex >= window._similarsAll.length) {

    const more = document.getElementById("similarsMore");
    const close = document.getElementById("similarsClose");

    if (more) more.style.display = "none";
    if (close) close.style.display = "block";
  }
}

function closeSimilars() {
  const all = window._similarsAll;
  const step = window._similarsStep;

  const initial = all.slice(0, step);

  window._similarsIndex = initial.length;

  const html = initial.map(([word, entry]) => {
    return createWordLink(word, entry);
  }).join(", ");

  // 同類語リストを戻す
  document.getElementById("similarsList").innerHTML = html;

  // もっと見る復活
  if (all.length > step) {
    document.getElementById("similarsMore").style.display = "";
  }

  // 閉じるを隠す
  document.getElementById("similarsClose").style.display = "none";
}


// 単語をクリックした時にURLを更新し、詳細を表示する関数
function loadWord(word) {
  const data = dictionary[word];
  if (!data) return;

  const safeSearch = document.getElementById("safeSearchToggle").checked;
  if (safeSearch && data.safe === false) {
    alert("この語はセーフサーチが有効なため表示できません。セーフサーチをオフにしてください。");
    return;
  }

  const params = new URLSearchParams(window.location.search);
  params.set('id', data.id || word);

  const newURL = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({ word: word }, '', newURL);

  showDetails(word);
  syncUIWithURL();
  window.scrollTo(0, 0);
}

// 品詞ごとに CSS クラスを割り当てるための対応表
const partsStyles = {
  "名象": "meishou",
  "動詞": "doushi",
  "名飾": "meishoku",
  "副飾": "fukushoku",
  "包飾": "bunshoku",
  "副合辞<br>包飾": "bunshoku",
  "接辞": "fukuji",
  "離辞": "fukuji",
  "屈折接辞": "fukuji",
  "派生接辞": "fukuji",
  "副辞": "fukuji",
  "外詞": "kanto",
};

// 意味テキストから翻訳語を抽出する関数
// ［注釈］や（補足）を削除し、カンマで分割して配列にする
function extractTranslations(text) {
  const cleaned = text.replace(/［[^］]*］/g, "").replace(/〈[^］]*〉/g, "").replace(/⫽[^］]*⫽/g, "").replace(/（[^）]*）/g, "").trim();
  return cleaned.split(/\s*,\s*/).filter(item => item !== "");
}

// ［注釈］や（補足）などを削除するユーティリティ関数
function removeAnnotations(text) {
  return text.replace(/［[^］]*］/g, "").replace(/〈[^］]*〉/g, "").replace(/⫽[^］]*⫽/g, "").replace(/（[^）]*）/g, "").trim();
}
// 検索用に、旧形式・新形式のどちらからでも文字列を取り出す
function getSearchText(value) {
  if (value === null || value === undefined) return "";

  // 文字列・数値など
  if (typeof value !== "object") {
    return String(value);
  }

  // 配列
  if (Array.isArray(value)) {
    return value
      .map(v => getSearchText(v))
      .filter(Boolean)
      .join(" ");
  }

  // オブジェクト
  const parts = [];

  // meaning の本体
  if (value.text != null) {
    parts.push(getSearchText(value.text));
  }

  // 例文
  if (value.examples != null) {
    parts.push(getSearchText(value.examples));
  }

  // 注釈
  if (value.note != null) {
    parts.push(getSearchText(value.note));
  }

  // 例文オブジェクトの各フィールド
  if (value.word != null) {
    parts.push(getSearchText(value.word));
  }

  if (value.pron != null) {
    parts.push(getSearchText(value.pron));
  }

  if (value.gloss != null) {
    parts.push(getSearchText(value.gloss));
  }

  if (value.sentence != null) {
    parts.push(getSearchText(value.sentence));
  }

  if (value.translation != null) {
    parts.push(getSearchText(value.translation));
  }

  // 同義語
  if (value.synonyms != null) {
    const synonyms = Array.isArray(value.synonyms)
      ? value.synonyms
      : [value.synonyms];

    parts.push(
      synonyms.map(s => {
        // IDなら辞書から単語を取得
        const word = idToWord[String(s)];
        return word || String(s);
      }).join(" ")
    );
  }

  return parts.filter(Boolean).join(" ");
}

// 語素/変成体の判定
function isMorphemeOrVariant(entry) {
  if (!entry || !entry.etymology || !entry.etymology.intro) return false;

  const intro = Array.isArray(entry.etymology.intro)
    ? entry.etymology.intro
    : [entry.etymology.intro];

  return intro.some(t => {
    const str = String(t);
    return str.includes("語素");
  });
}

const seiiMap = {
  h: "￣",
  l: "＿",
  d: "＼",
  u: "／",
  a: "‾\\",
  v: "_/",
  "?": "—+￣",
};

// 声位を変換する関数
function renderSeii(seiiArray) {
  if (!seiiArray || !Array.isArray(seiiArray)) return "";
  return seiiArray
    .map(group => {
      const converted = group
        .split("")
        .map(char => seiiMap[char] || char)
        .join("");
      return `[${converted}]`;
    })
    .join(" ");
}

// 語源文中のIDを辞書リンクに変換
function resolveEtymologyText(text) {
  if (!text) return "";

  const pages = {
    n: "ndic.html",
    e: "../etym/etym.html",
    c: "../cdic/cdic.html",
    t: "../tdic/tdic.html",
    ng: "../ngdic/ngdic.html",
    r: "../rdic/rdic.html",
    p: "../pdic/pdic.html"
  };
  const placeholders = [];

  // ① 他辞書を一旦退避
  text = text.replace(/\b(n|e|t|c|ng|r|p):(\d+)\b/gi, (match, dict, id) => {

    const page = pages[dict];
    if (!page) return match;

    let extDict = null;
    if (dict === "e") extDict = etymDictionary;
    if (dict === "t") extDict = tdicDictionary;
    if (dict === "c") extDict = cdicDictionary;
    if (dict === "ng") extDict = ngdicDictionary;
    if (dict === "r") extDict = rdicDictionary;
    if (dict === "p") extDict = pdicDictionary;
    let word = id;
    let meaning = "";

    if (extDict) {
      for (const [w, data] of Object.entries(extDict)) {
        if (String(data.id) === id) {
          word = w;
          meaning = getFirstMeaning(data);
          const safeSearch = document.getElementById("safeSearchToggle")?.checked;
          if (safeSearch && data.safe === false) {
            placeholders.push(`<span class="etymology-hidden"></span>`);
            return placeholder;
          }
          break;
        }
      }
    }

    const placeholder = `__LINK${placeholders.length}__`;

    placeholders.push(
      `<a href="${page}?id=${id}" target="_blank" class="etymology-link">${word}<sup>+</sup></a>`
    );

    return placeholder;
  });

  // ② ndic ID
  text = text.replace(/\b(\d+)\b/g, (match, id) => {

    const word = idToWord[id];
    if (!word) return match;

    const entry = dictionary[word];
    if (!entry) return word;

    const safeSearch = document.getElementById("safeSearchToggle")?.checked;
    if (safeSearch && entry.safe === false) {
      return `<span class="etymology-hidden"></span>`;
    }

    const meaning = getFirstMeaning(entry);

    const part = Array.isArray(entry.part)
      ? entry.parts[0]
      : entry.parts ?? "";

    const partClass = partsStyles[part] ?? "";

    return `<a href="#"
onclick="loadWord('${word}'); return false;"
class="etymology-link">
${word}</a>`;
  });

  // ③ 他辞書リンクを戻す
  placeholders.forEach((link, i) => {
    text = text.replace(`__LINK${i}__`, link);
  });

  return text;
}

function createWordLink(word, entry) {
  const meaning = getFirstMeaning(entry);

  const part = Array.isArray(entry.part)
    ? entry.parts[0]
    : entry.parts ?? "";

  const partClass = partsStyles[part] ?? "";

  return `
    <a href="#"
       onclick="loadWord('${word}'); return false;"
       class="etymology-link ${partClass}">
       ${word}
    </a>
    <span class="meaning">
      <span class="link-meaning">（ ${meaning} ）</span>
    </span>
  `;
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

window.toggleMeaning = function (el) {
  const parent = el.closest("ul");
  const hiddenItems = parent.querySelectorAll(".extraMeaning");

  if (hiddenItems.length === 0) return;

  const isHidden = getComputedStyle(hiddenItems[0]).display === "none";

  hiddenItems.forEach(item => {
    item.style.display = isHidden ? "list-item" : "none";
  });

  el.textContent = isHidden
    ? "閉じる"
    : el.textContent.replace("閉じる", "もっと見る");
};

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

function syncUIWithURL() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const viewMode = params.get("view");
  const sidebar = document.querySelector('.sidebar');
  const detailsContainer = document.getElementById("details");
  const placeholder = document.getElementById("placeholder");
  const safeSearch = document.getElementById("safeSearchToggle").checked;

  if (id) {
    const word = idToWord[id] || id;

    // 辞書が読み込まれている時だけ詳細を表示
    if (dictionary && dictionary[word]) {
      const entry = dictionary[word];
      if (safeSearch && entry && entry.safe === false) {
        detailsContainer.innerHTML = `<p class="placeholder">この語はセーフサーチが有効なため表示できません。</p>`;
        if (placeholder) placeholder.style.display = 'none';
      } else {
        showDetails(word);
        if (placeholder) placeholder.style.display = 'none';
      }
    }

    // UI 切り替えは辞書の有無に関係なく必ず行う
    if (viewMode === 'side') {
      sidebar.style.display = 'block';
      document.body.classList.remove('detail-view');
    } else {
      sidebar.style.display = 'none';
      document.body.classList.add('detail-view');
    }

  } else {
    // id が無いときは一覧モード
    sidebar.style.display = 'block';
    document.body.classList.remove('detail-view');
    detailsContainer.innerHTML = '';
    placeholder.style.display = 'block';
  }
}

// JSON辞書を読み込んで……
Promise.all([
  fetch('Ndic.json').then(r => r.json()),
  fetch('../etym/Etym.json').then(r => r.json()),
  fetch('../tdic/Tdic.json').then(r => r.json()),
  fetch('../cdic/Cdic.json').then(r => r.json()),
  fetch('../ngdic/Ngdic.json').then(r => r.json()),
  fetch('../rdic/Rdic.json').then(r => r.json()),
  fetch('../pdic/Pdic.json').then(r => r.json())
]).then(([dicData, oldData, tdicData, cdicData, ngdicData, rdicData, pdicData]) => {

  dictionary = { ...dicData };
  etymDictionary = oldData;
  tdicDictionary = tdicData;
  cdicDictionary = cdicData;
  ngdicDictionary = ngdicData;
  rdicDictionary = rdicData;
  pdicDictionary = pdicData;
  // 語源リンク用
  const linkDictionary = { ...dicData };

  for (const [word, data] of Object.entries(linkDictionary)) {
    if (data.id != null) {
      idToWord[String(data.id)] = word;
    }
  }

  function renderEtymology(etymology) {
    if (!etymology) return "";

    let html = "";

    if (etymology.intro) {
      const intro = Array.isArray(etymology.intro)
        ? etymology.intro
        : [etymology.intro];
      html += intro
        .map(line => resolveEtymologyText(line))
        .join("<br>");
    }
    return html;
  }

  // 検索高速化のため、正規化済みデータを事前計算して保存
  for (const [word, data] of Object.entries(dictionary)) {
    // 単語キーを正規化
    const keyClean = removeAnnotations(word);
    data._normKey = normalizeForSearch(keyClean);

    // 意味を正規化
    const meaningTexts = Array.isArray(data.meaning)
      ? data.meaning.map(m => {
        if (m && typeof m === "object") {
          return m.text || "";
        }
        return String(m ?? "");
      })
      : data.meaning
        ? [String(data.meaning)]
        : [];

    data._normMeaning = normalizeForSearch(
      meaningTexts
        .map(text => removeAnnotations(text))
        .join(" ")
    );

    // variants1 / variants2 を統合
    const variants = [];
    if (data.variants1) variants.push(...(Array.isArray(data.variants1) ? data.variants1 : [data.variants1]));
    if (data.variants2) variants.push(...(Array.isArray(data.variants2) ? data.variants2 : [data.variants2]));
    data._normVariants = normalizeForSearch(variants.join(' '));

    // vulgarMeaning も検索対象にする
    const vul = data.vulgarMeaning ? (Array.isArray(data.vulgarMeaning) ? data.vulgarMeaning.join(' ') : String(data.vulgarMeaning)) : "";
    data._normVulgar = normalizeForSearch(removeAnnotations(vul));

    // 縫言録も検索対象にする
    let kanjiReadings = "";
    if (data.kanji) {
      const nui = Array.isArray(data.kanji.nui)
        ? data.kanji.nui
        : (data.kanji.nui ? [data.kanji.nui] : []);

      const chel = Array.isArray(data.kanji.chel)
        ? data.kanji.chel
        : (data.kanji.chel ? [data.kanji.chel] : []);

      kanjiReadings = [...nui, ...chel].join(" ");
    }

    // 正規表現を使わない安全な記号除去
    const symbolsToRemove = [
      "-", "‐", "‑", "–", "—", "―", "_",
      "(", ")", "［", "］", "〈", "〉", "⫽", "⫽", "「", "」",
      "[", "]", "{", "}", "<", ">"
    ];

    let cleanedKanjiReadings = kanjiReadings;
    symbolsToRemove.forEach(sym => {
      cleanedKanjiReadings = cleanedKanjiReadings.split(sym).join(" ");
    });

    cleanedKanjiReadings = cleanedKanjiReadings.replace(/\s+/g, " ").trim();

    // 正規化して保存
    data._normKanjiReadings = normalizeForSearch(cleanedKanjiReadings);


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
  syncUIWithURL();
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
function getEntry(word) {
  return dictionary[word];
}

// ID抽出関数
function extractEtymologyIDs(data) {
  const ids = [];
  if (!data.etymology) return ids;

  // 配列でなければ配列に変換
  const etymList = Array.isArray(data.etymology)
    ? data.etymology
    : [data.etymology];

  etymList.forEach(text => {
    if (typeof text !== "string") return;

    // 数字IDを全部取得
    const matches = text.match(/\d+/g);
    if (matches) {
      ids.push(...matches);
    }
  });
  return ids;
}

function renderMeaningBlock(meanings) {
  if (!Array.isArray(meanings) || meanings.length === 0) {
    return "";
  }
  console.log("【意味データ】", meanings);

  const circles = [
    "①", "②", "③", "④", "⑤",
    "⑥", "⑦", "⑧", "⑨", "⑩",
    "⑪", "⑫", "⑬", "⑭", "⑮",
    "⑯", "⑰", "⑱", "⑲", "⑳"
  ];

  return `
    <section class="meaning-section">

      ${meanings.map((meaning, index) => {

    const text =
      typeof meaning === "object"
        ? meaning.text ?? ""
        : String(meaning);

    const pos =
      typeof meaning === "object"
        ? meaning.pos ?? ""
        : "";

    const examples =
      typeof meaning === "object"
        ? meaning.examples ?? []
        : [];

    const synonyms =
      typeof meaning === "object"
        ? meaning.synonyms ?? []
        : [];

    const number =
      circles[index] ?? `(${index + 1})`;

    return `
          <article class="meaning-entry">

            <div class="meaning-title">
  <span class="meaning-number">${number}</span>
  <span class="meaning-pos">${pos}</span>
</div>


            <div class="meaning-text">
  ${renderMeaningText(text)}
</div>

            ${renderMeaningExamples(examples)}

            ${renderMeaningSynonyms(synonyms)}

          </article>
        `;

  }).join("")}

    </section>
  `;
}

function renderMeaningText(text) {
  if (text === null || text === undefined) {
    return "";
  }

  let html = String(text);

  // HTMLとして解釈されないように最低限エスケープ
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

      // 〔 ... 〕
  html = html.replace(
    /〔([^\[\]]+)〕/g,
    '<span class="meaning-bracket square">〔$1〕</span>'
  );

  // [ ... ]
  html = html.replace(
    /\[([^\[\]]+)\]/g,
    '<span class="meaning-bracket square">[$1]</span>'
  );

  // 【 ... 】
  html = html.replace(
    /【([^【】]+)】/g,
    '<span class="meaning-bracket corner">【$1】</span>'
  );

  // （ ... ）
  html = html.replace(
    /（([^（）]+)）/g,
    '<span class="meaning-bracket round">（$1）</span>'
  );

  // ｟ ... ｠
  html = html.replace(
    /｟([^（）]+)｠/g,
    '<span class="meaning-bracket round">｟$1｠</span>'
  );

  // 〈 ... 〉
  html = html.replace(
    /〈([^（）]+)〉/g,
    '<span class="meaning-bracket tri">〈$1〉</span>'
  );

  // 《 ... 》
  html = html.replace(
    /《([^（）]+)》/g,
    '<span class="meaning-bracket dtri">《$1》</span>'
  );

  // （...）ではなく通常の ( ... ) も対象にする
  html = html.replace(
    /\(([^()]+)\)/g,
    '<span class="meaning-bracket round">($1)</span>'
  );

  return html;
}

function renderMeaningForms(forms) {
  if (!forms || typeof forms !== "object") {
    return "";
  }

  const groups = {};

  for (const [index, char] of Object.entries(forms)) {
    if (!groups[char]) {
      groups[char] = [];
    }

    groups[char].push(index);
  }

  return Object.entries(groups)
    .map(([char, indexes]) => {
      const numbers = indexes
        .map(index => {
          const n = Number(index);

          if (n >= 1 && n <= 20) {
            const circles = [
              "①", "②", "③", "④", "⑤",
              "⑥", "⑦", "⑧", "⑨", "⑩",
              "⑪", "⑫", "⑬", "⑭", "⑮",
              "⑯", "⑰", "⑱", "⑲", "⑳"
            ];

            return circles[n - 1];
          }

          return `(${index})`;
        })
        .join("");

      return `<span class="form-group">
        <span class="form-numbers">${numbers}</span>
        <span class="form-char">${char}</span>
      </span>`;
    })
    .join("");
}


function renderMeaningExamples(examples) {
  if (!Array.isArray(examples) || examples.length === 0) {
    return "";
  }

  return `
    <div class="meaning-examples">

      ${examples.map(example => {

    if (!example) return "";

    // 単語例
    if (example.word) {
      const word = String(example.word);

      let link = word;

      if (
        example.id != null &&
        idToWord[String(example.id)] &&
        dictionary[idToWord[String(example.id)]]
      ) {
        const targetWord = idToWord[String(example.id)];
        link = createWordLink(
          targetWord,
          dictionary[targetWord]
        );
      } else if (dictionary[word]) {
        link = createWordLink(
          word,
          dictionary[word]
        );
      }

      return `
            <div class="meaning-example">

              <div class="example-head">
                <span class="example-arrow">▸</span>
                <span class="example-word">${link}</span>

                ${example.pron
          ? `<span class="example-pron">
                        ${example.pron}
                       </span>`
          : ""
        }
              </div>

              ${example.gloss
          ? `<div class="example-gloss">
                      「 ${example.gloss} 」
                     </div>`
          : ""
        }

            </div>
          `;
    }

    // 文章例
    if (example.sentence) {
      return `
            <div class="meaning-example sentence-example">

              <div class="example-head">
                <span class="example-arrow">▸</span>
                <span>${example.sentence}</span>
              </div>

              ${example.translation
          ? `<div class="example-gloss">
                      「 ${example.translation}」
                     </div>`
          : ""
        }
            </div>
          `;
    }
    return "";
  }).join("")}
    </div>
  `;
}

function renderMeaningSynonyms(synonyms) {
  if (!Array.isArray(synonyms) || synonyms.length === 0) {
    return "";
  }

  const links = synonyms.map(value => {

    // ID
    if (
      typeof value === "number" ||
      /^\d+$/.test(String(value))
    ) {
      const id = String(value);
      const word = idToWord[id];

      if (word && dictionary[word]) {
        return createWordLink(
          word,
          dictionary[word]
        );
      }

      return String(value);
    }

    // 単語
    if (
      typeof value === "string" &&
      dictionary[value]
    ) {
      return createWordLink(
        value,
        dictionary[value]
      );
    }

    return String(value);

  }).join("、");

  return `
    <div class="meaning-synonyms">
      <span class="synonym-label">同義語</span>
      ${links}
    </div>
  `;
}

function renderEtymologyBlock(etymology) {
  if (!etymology) return "";

  let html = `
    <section class="etymology-section">
      <h3 class="section-title">語源</h3>
  `;

  if (etymology.intro) {

    const intro = Array.isArray(etymology.intro)
      ? etymology.intro
      : [etymology.intro];

    html += `
      <div class="etymology-intro">
        ${intro.map(text => `
          <div>${processH5Links(
      resolveEtymologyText(String(text))
    )}</div>
        `).join("")}
      </div>
    `;
  }

  if (
    Array.isArray(etymology.changes) &&
    etymology.changes.length
  ) {

    html += `
      <div class="etymology-changes">

        ${etymology.changes.map((change, index) => {

      const form = resolveEtymologyText(
        String(change.form ?? "")
      );

      const notes = change.note
        ? (
          Array.isArray(change.note)
            ? change.note
            : [change.note]
        )
          .map(note =>
            processH5Links(
              resolveEtymologyText(String(note))
            )
          )
          .join(" ")
        : "";

      return `
            <div class="etymology-change">

              <div class="etymology-stage">
                ${change.stage ?? ""}
              </div>

              <div class="etymology-form">
                ${form}

                ${notes
          ? `<span class="etymology-note">
                        ${notes}
                       </span>`
          : ""
        }
              </div>

            </div>
          `;

    }).join("")}

      </div>
    `;
  }

  html += `</section>`;

  return html;
}

function extractEtymologyIDs(entry) {
  const ids = [];
  if (!entry.etymology || !entry.etymology.intro) return ids;
  const texts = Array.isArray(entry.etymology.intro)
    ? entry.etymology.intro
    : [entry.etymology.intro];
  texts.forEach(text => {
    const matches = String(text).match(/\d+/g);
    if (matches) ids.push(...matches);
  });
  return ids;
}

function renderNotes(data) {
  if (!data) return "";

  const htmlParts = [];

  // =========================
  // note1 = 一般言語学
  // =========================
  if (data.note1) {
    const items = normalizeNote(data.note1);

    const list = items
      .map(item =>
        `<li class="noteList">${processNoteText(item)}</li>`
      )
      .join("");

    if (list) {
      htmlParts.push(`
        <table class="detailTable">
          <tbody>
            <tr>
              <th id="stripeth">一般言語学</th>
              <td colspan="3">
                <ul>${list}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      `);
    }
  }

  // =========================
  // note2 = 縫語解説
  // =========================
  if (data.note2) {

    const title = data.note2.title
      ? normalizeNote(data.note2.title)
      : [];

    const txt = data.note2.txt
      ? normalizeNote(data.note2.txt)
      : [];

    const img = data.note2.img
      ? normalizeNote(data.note2.img)
      : [];

    const titleHTML = title
      .map(t => `<div class="note2-title">${processNoteText(t)}</div>`)
      .join("");

    const txtHTML = txt
      .map(t => `<li class="noteList">${processNoteText(t)}</li>`)
      .join("");

    const imgHTML = img.join("");

    if (titleHTML || txtHTML || imgHTML) {
      htmlParts.push(`
        <table class="detailTable">
          <tbody>
            <tr>
              <th id="stripeth">智語解説</th>
              <td colspan="3">
                ${titleHTML}
                ${txtHTML ? `<ul>${txtHTML}</ul>` : ""}
                ${imgHTML}
              </td>
            </tr>
          </tbody>
        </table>
      `);
    }
  }

  // =========================
  // note3 = 備考
  // =========================
  if (data.note3) {
    const items = normalizeNote(data.note3);

    const list = items
      .map(item =>
        `<li class="noteList">${processNoteText(item)}</li>`
      )
      .join("");

    if (list) {
      htmlParts.push(`
        <table class="detailTable">
          <tbody>
            <tr>
              <th id="stripeth">備考</th>
              <td colspan="3">
                <ul>${list}</ul>
              </td>
            </tr>
          </tbody>
        </table>
      `);
    }
  }

  // =========================
  // alert = 注意事項
  // =========================
  if (data.alert) {

    const a1 = data.alert.a1
      ? normalizeNote(data.alert.a1)
      : [];

    const a2 = data.alert.a2
      ? normalizeNote(data.alert.a2)
      : [];

    const a1HTML = a1
      .map(item =>
        `<li class="alertList">${processNoteText(item)}</li>`
      )
      .join("");

    const a2HTML = a2
      .map(item =>
        `<li class="alertList">${processNoteText(item)}</li>`
      )
      .join("");

  }
  return htmlParts.join("");
}

function renderAlert(alertObj) {
  if (!alertObj) return "";

  const a1 = alertObj.a1 ? normalizeNote(alertObj.a1) : [];
  const a2 = alertObj.a2 ? normalizeNote(alertObj.a2) : [];

  const a1HTML = a1.map(t => `<div class="alert-line" style="color:#ff5555;">${t}</div>`).join("");

  const a2HTML = a2.map(raw => {
    const id = String(raw).replace(/[^\d]/g, "");
    if (id && idToWord[id]) {
      const word = idToWord[id];
      const entry = dictionary[word];
      return `<span class="marker">${createWordLink(word, entry)}</span>`;
    }
    return raw;
  }).join("<br>");

  return `
    <table class="detailTable">
      <tbody>
        <tr>
          <th id="stripeth">⚠ 注意</th>
          <td colspan="3">
            ${a1HTML}
            ${a2HTML}
          </td>
        </tr>
      </tbody>
    </table>
  `;
}

function normalizeNote(val) {
  if (!val) return [];

  if (Array.isArray(val)) {
    return val;
  }

  if (typeof val === "object") {
    if (Array.isArray(val.txt)) {
      return val.txt;
    }

    return Object.values(val).flat();
  }

  return String(val)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function processNoteText(text) {
  let resolved = resolveEtymologyText(String(text ?? ""));

  resolved = resolved.replace(
    /<h5>(.*?)<\/h5>/g,
    (match, innerText) => {

      const key = innerText
        .replace(/^⇒\s*/, "")
        .trim();

      const linkWord = linkMapping[key] || key;

      return `
        <h5>
          <a href="#"
             onclick="loadWord('${linkWord}'); return false;">
            ${innerText.trim()}
          </a>
        </h5>
      `;
    }
  );

  return resolved;
}

// 意味を1つ取得する関数
function getFirstMeaning(entry) {
  if (!entry || !entry.meaning) return "";

  const first = Array.isArray(entry.meaning)
    ? entry.meaning[0]
    : entry.meaning;

  // 新形式:
  if (first && typeof first === "object") {
    return removeAnnotations(first.text || "")
      .split(",")[0]
      .trim();
  }

  // 旧形式
  return removeAnnotations(String(first))
    .split(",")[0]
    .trim();
}

// 語リスト表示生成
function buildWordList(list) {
  return list.map(([word, entry]) => {
    const meaning = getFirstMeaning(entry);
    return `<a href="#" onclick="loadWord('${word}'); return false;">
              ${word}
            </a><span class="meaning"><span class="link-meaning">（ ${meaning} ）</span></span>`;
  }).join(", ");
}

// 類義語自動生成
function getSynonyms(data) {
  return Object.entries(dictionary).filter(([word, entry]) => {
    // 自分自身を除外
    if (entry.id === data.id) return false;
    // meaningがない場合除外
    if (!entry.meaning || !data.meaning) return false;
    // 意味一致
    return entry.meaning === data.meaning;
  });
}

// 関連語
function getCognates(data) {
  const myID = String(data.id);
  const sourceIDs = extractEtymologyIDs(data);

  return Object.entries(dictionary).filter(([word, entry]) => {
    // * から始まるものは除外する
    if (word.startsWith("*")) return false;

    // 1. 自分自身は除外
    if (entry.id === data.id) return false;

    // 2. 相手（表示候補）が「語素」なら除外
    if (isMorphemeOrVariant(entry)) return false;

    const entryIDs = extractEtymologyIDs(entry);

    // 3. 自分の語源に含まれる語（親）なら表示
    if (sourceIDs.includes(String(entry.id))) return true;

    // 4. 自分が語源になっている語（子）なら表示
    if (entryIDs.includes(myID)) return true;

    // 5. 同じ語源を共有する語（兄弟）の判定
    return entryIDs.some(id => {
      // 共通の語源 ID を持っているか？
      if (sourceIDs.includes(id)) {
        // その共通 ID の語が「語素」でないかチェック
        // idToWord などを使って辞書から引き、語素判定をかける
        const sourceWord = idToWord[id];
        const sourceEntry = dictionary[sourceWord];

        // 共通の語源が語素でない場合のみ true（関連語とする）
        return !isMorphemeOrVariant(sourceEntry);
      }
      return false;
    });
  });
}


// 同類語
function getSimilarWords(data) {
  // 1. 自分のタグを配列に標準化。かつ「ー」や空文字を除外
  const normalize = (t) => {
    if (!t) return [];

    // 配列化
    const arr = Array.isArray(t) ? t : [t];

    // 無効タグ除外
    return arr.filter(v => v && v !== "ー" && v !== "-");
  };

  const myTags = normalize(data.tag);

  // 自分がタグを持っていないなら、同類語は探さない
  if (myTags.length === 0) return [];

  return Object.entries(dictionary).filter(([word, entry]) => {
    // 自分自身を除外
    if (entry.id === data.id) return false;

    // 2. 相手のタグも同様に標準化
    const entryTags = normalize(entry.tag);

    // 相手が有効なタグを持っていないなら除外
    if (entryTags.length === 0) return false;

    // * から始まるものは除外する
    if (word.startsWith("*")) return false;

    // 3. 共通するタグが1つでもあるか判定
    return myTags.some(tag => entryTags.includes(tag));

  });
}

// 単語の詳細表示についてだよ！
function showDetails(word) {
  const data = getEntry(word);

  if (!data) {
    alert("単語「" + word + "」の詳細が見つかりません。");
    return;
  }

  const safeSearch =
    document.getElementById("safeSearchToggle")?.checked;

  if (safeSearch && data.safe === false) {
    document.getElementById("details").innerHTML =
      `<p class="placeholder">
        この語はセーフサーチが有効なため表示できません。
      </p>`;
    return;
  }

  const headerClass =
    partsStyles[data.parts] || "default";

  /*
   * ─────────────────────
   * ヘッダー
   * ─────────────────────
   */

  const pronunciation =
    Array.isArray(data.pronunciation)
      ? data.pronunciation
      : data.pronunciation
        ? [data.pronunciation]
        : [];

  const pronHTML = pronunciation
    .map(p => `<span>${p}</span>`)
    .join(" ");

  let html = `
    <div class="ndic-entry">
      <header class="entry-header">
        <div class="entry-title">
          <span class="entry-word">
            ${word}
          </span>
          ${pronHTML
      ? `<span class="entry-pronunciation">
                  ${pronHTML}
                 </span>`
      : ""
    }
        </div>

        <div class="entry-meta">
          ${data.tag
      ? `<span>
                  <b>タグ</b>:
                  <span class="meta">
                  ${Array.isArray(data.tag)
        ? data.tag.join("、")
        : data.tag
      }
                  </span>
                 </span>`
      : ""
    }
          
          ${data.seii
      ? `<span>
                  <b>声位</b>:
                  <span class="meta">
                  ${renderSeii(data.seii)}
                  </span>
                 </span>`
      : ""
    }

          ${data.vari
      ? `<span>
                  <b>異体字</b>: <span class="meta">${data.vari}</span>
                 </span>`
      : ""
    }

    ${data.forms
    ? `<span>
          <b>表記</b>:
          <span class="meta meaning-forms">
            ${renderMeaningForms(data.forms)}
          </span>
       </span>`
    : ""
}
        </div>
      </header>

      ${renderMeaningBlock(data.meaning)}
      ${renderNotes(data)}
      ${renderAlert(data.alert)}
  `;

  /*
   * ─────────────────────
   * 全体例文
   * ─────────────────────
   */

  if (
    Array.isArray(data.examples) &&
    data.examples.length
  ) {
    html += `
      <section class="extra-section">
        <h3 class="section-title">例文</h3>

        <div class="extra-content">
          ${data.examples.join("<br>")}
        </div>
      </section>
    `;
  }

  /*
   * ─────────────────────
   * 類義語
   * ─────────────────────
   */

  if (
    Array.isArray(data.variants1) &&
    data.variants1.length
  ) {

    const links = data.variants1
      .map(id => {

        const w = idToWord[String(id)];

        if (!w || !dictionary[w]) {
          return "";
        }

        return createWordLink(
          w,
          dictionary[w]
        );
      })
      .filter(Boolean)
      .join("、");

    if (links) {
      html += `
        <section class="extra-section">
          <h3 class="section-title">類義語</h3>
          <div class="extra-content">
            ${links}
          </div>
        </section>
      `;
    }
  }

  /*
   * ─────────────────────
   * 関連語
   * ─────────────────────
   */

  const cognates =
    getCognates(data)
      .filter(([w, e]) =>
        !safeSearch || e.safe !== false
      );

  if (cognates.length) {

    window._cognatesAll = cognates;
    window._cognatesIndex =
      Math.min(itemsCognates, cognates.length);
    window._cognatesStep = itemsCognates;

    const initial =
      cognates.slice(0, itemsCognates);

    const links =
      initial
        .map(([w, e]) =>
          createWordLink(w, e)
        )
        .join("、");

    html += `
      <section class="extra-section">

        <h3 class="section-title">
          関連語かも
        </h3>

        <div
          id="cognatesList"
          class="extra-content"
        >
          ${links}
        </div>

        ${cognates.length > itemsCognates
        ? `<div
                 id="cognatesMore"
                 class="morelink"
                 onclick="showMoreCognates()"
               >もっと見る</div>`
        : ""
      }

        <div
          id="cognatesClose"
          class="morelink"
          style="display:none"
          onclick="closeCognates()"
        >
          閉じる
        </div>

      </section>
    `;
  }

  /*
   * ─────────────────────
   * 同類語
   * ─────────────────────
   */

  const similars =
    getSimilarWords(data)
      .filter(([w, e]) =>
        !safeSearch || e.safe !== false
      );

  if (similars.length) {

    window._similarsAll = similars;
    window._similarsIndex =
      Math.min(itemsCognates, similars.length);
    window._similarsStep = itemsCognates;

    const initial =
      similars.slice(0, itemsCognates);

    const links =
      initial
        .map(([w, e]) =>
          createWordLink(w, e)
        )
        .join("、");

    html += `
      <section class="extra-section">

        <h3 class="section-title">
          同類語
        </h3>

        <div
          id="similarsList"
          class="extra-content"
        >
          ${links}
        </div>

        ${similars.length > itemsCognates
        ? `<div
                 id="similarsMore"
                 class="morelink"
                 onclick="showMoreSimilars()"
               >もっと見る</div>`
        : ""
      }

        <div
          id="similarsClose"
          class="morelink"
          style="display:none"
          onclick="closeSimilars()"
        >
          閉じる
        </div>

      </section>
    `;
  }

  html += `</div>`;

  document.getElementById("details").innerHTML = html;
}

// 単語リスト項目生成
function createWordListItem(word) {
  const data = getEntry(word);
  const li = document.createElement("li");

  // 意味テキストを取得
  const meaningText = getFirstMeaning(data);

  // 翻訳を抽出
  const translations = extractTranslations(meaningText);
  let displayText = translations.join(", ");

  // 表示文字数制限
  const maxLength = 20;
  if (displayText.length > maxLength) {
    displayText = displayText.substring(0, maxLength) + "……";
  }

  // 品詞による色分け
  const headerClass = partsStyles[data.parts] || "default";

  li.innerHTML = `
    <strong class="${headerClass}">${word}</strong>
    <br>
    <span class="pagespan">${displayText}</span>
  `;

  // クリックで詳細表示
  li.addEventListener("click", () => {
    showDetails(word);

    // URL更新
    const value = data.id != null
      ? String(data.id)
      : encodeURIComponent(word);

    const params = new URLSearchParams(location.search);

    // 常に id をセット
    params.set("id", value);

    // 検索結果クリック時はサイド表示
    if (!params.has("view")) {
      params.set("view", "side");
    }

    const newUrl =
      `${location.pathname}?${params.toString()}`;

    history.pushState(null, "", newUrl);

    // UI同期
    syncUIWithURL();
  });

  return li;
}

function renderPage() {
  wordList.innerHTML = "";

  // 総ページ数を計算
  const total = Math.ceil(searchResults.length / itemsPerPage);
  // 検索結果が0件の場合は……
  if (total === 0) {
    const li = document.createElement("li");
    // メッセージを出すよ！
    li.textContent = "該当する単語はありません｡";
    li.style.color = "gray";
    wordList.appendChild(li);
    // ページ情報をリセット
    pageInfoSpan.textContent = "0 / 0";
    prevPageBtn.disabled = nextPageBtn.disabled = true;
    return;
  }

  // 現在ページを範囲内に補正
  currentPage = Math.max(1, Math.min(currentPage, total));

  // 表示する単語の範囲を取得
  const start = (currentPage - 1) * itemsPerPage;
  const slice = searchResults.slice(start, start + itemsPerPage);

  slice.forEach(item => {
    // 見出し（検索カテゴリ）
    if (item.type === "heading") {
      const li = document.createElement("li");
      li.textContent = item.text;
      li.style.fontWeight = "bold";
      li.style.backgroundColor = "#f4f0f4";
      wordList.appendChild(li);
      // 単語
    } else {
      wordList.appendChild(createWordListItem(item.value));
    }
  });
  // ページ表示更新
  pageInfoSpan.textContent = `${currentPage} / ${total}`;

  // ボタンの状態を制御
  prevPageBtn.disabled = (currentPage === 1);
  nextPageBtn.disabled = (currentPage === total);
}


function performSearch() {
  const rawSearch = searchBox.value || "";
  const normalizedSearch = normalizeForSearch(rawSearch);
  const searchTerm = searchBox.value.toLowerCase();
  wordList.innerHTML = "";

  if (searchTerm === "") {
    placeholder.style.display = "block";
    searchResults = [];
    pageInfoSpan.textContent = "0 / 0";
    prevPageBtn.disabled = true;
    nextPageBtn.disabled = true;
    details.innerHTML = `<p class="placeholder">左側のリストから単語をクリックしてください｡</p>`;
    return;
  } else {
    placeholder.style.display = "none";
  }

  if (Object.keys(dictionary).length === 0) {
    wordList.innerHTML = "<li>データ読み込み中...</li>";
    return;
  }

  const searchMode = searchModeSelect.value;
  searchResults = [];

  if (searchMode === "tag") {
    const searchTags = searchTerm
      .split(",")
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);

    const tagResults = Object.keys(dictionary).filter(word => {
      const data = getEntry(word);
      if (!data.tag) return false;
      const tags = Array.isArray(data.tag)
        ? data.tag.map(t => removeAnnotations(t).toLowerCase())
        : [removeAnnotations(data.tag).toLowerCase()];
      return searchTags.every(searchTag => tags.includes(searchTag));
    });

    tagResults.sort((a, b) => a.localeCompare(b));

    if (tagResults.length > 0) {
      searchResults.push({ type: "heading", text: "【タグでの検索結果】" });
      tagResults.forEach(word => searchResults.push({ type: "word", value: word }));
    }

  } else {
    const primaryResults = Object.keys(dictionary).filter(word => {
      if (word.startsWith("*")) return false;
      const data = getEntry(word);

      let matchKey = false;
      if (searchMode === "exact") matchKey = (data._normKey === normalizedSearch);
      else if (searchMode === "prefix") matchKey = data._normKey.startsWith(normalizedSearch);
      else matchKey = data._normKey.includes(normalizedSearch);

      const matchMeaning = (() => {
        const norm = data._normMeaning || "";

        if (searchMode === "exact") {
          return norm === normalizedSearch;
        }

        if (searchMode === "prefix") {
          return norm.startsWith(normalizedSearch);
        }

        return norm.includes(normalizedSearch);
      })();

      let matchVulgar = false;
      if (data.vulgarMeaning) {
        const list = Array.isArray(data.vulgarMeaning) ? data.vulgarMeaning : [data.vulgarMeaning];
        matchVulgar = list.some(v => {
          const cleaned = removeAnnotations(v).toLowerCase();
          if (searchMode === "exact") return cleaned === searchTerm;
          if (searchMode === "prefix") return cleaned.startsWith(searchTerm);
          return cleaned.includes(searchTerm);
        });
      }

      let matchWord = false;
      if (data.word) {
        const words = Array.isArray(data.word)
          ? data.word
          : [data.word];

        matchWord = words.some(v => {
          const norm = normalizeForSearch(removeAnnotations(v));

          if (searchMode === "exact")
            return norm === normalizedSearch;

          if (searchMode === "prefix")
            return norm.startsWith(normalizedSearch);

          return norm.includes(normalizedSearch);
        });
      }

      let matchVariants2 = false;
      if (data.variants2) {
        matchVariants2 = data.variants2.some(v => {
          const cleaned = removeAnnotations(v).toLowerCase();
          if (searchMode === "exact") return cleaned === searchTerm;
          if (searchMode === "prefix") return cleaned.startsWith(searchTerm);
          return cleaned.includes(searchTerm);
        });
      }

      return matchKey || matchMeaning || matchWord || matchVariants2 || matchVulgar;
    });

    const variantResults = Object.keys(dictionary).filter(word => {
      const data = getEntry(word);
      if (data.variants1) {
        const variants1 = Array.isArray(data.variants1)
          ? data.variants1
          : [data.variants1];

        matchVariants1 = variants1.some(v => {

          const candidates = [
            String(v),
            idToWord[String(v)]
          ].filter(Boolean);

          return candidates.some(candidate => {
            const cleaned = normalizeForSearch(
              removeAnnotations(candidate)
            );

            if (searchMode === "exact") {
              return cleaned === normalizedSearch;
            }

            if (searchMode === "prefix") {
              return cleaned.startsWith(normalizedSearch);
            }

            return cleaned.includes(normalizedSearch);
          });
        });
      }
    });

    const tagResults = Object.keys(dictionary).filter(word => {
      const data = getEntry(word);
      if (!data.tag) return false;
      if (Array.isArray(data.tag)) {
        return data.tag.some(t => removeAnnotations(t).toLowerCase() === searchTerm);
      }
      return removeAnnotations(data.tag).toLowerCase() === searchTerm;
    });

    const primarySet = new Set(primaryResults);
    const variantOnlyResults = variantResults.filter(w => !primarySet.has(w));
    const variantSet = new Set(variantOnlyResults);
    const tagOnlyResults = tagResults.filter(w => !primarySet.has(w) && !variantSet.has(w));

    primaryResults.sort();
    variantOnlyResults.sort();
    tagOnlyResults.sort();

    // セーフサーチ判定
    const safeSearch = document.getElementById("safeSearchToggle").checked;

    // safe=false の語を除外
    const usePrimary = safeSearch ? primaryResults.filter(w => dictionary[w].safe !== false) : primaryResults;
    const useVariantOnly = safeSearch ? variantOnlyResults.filter(w => dictionary[w].safe !== false) : variantOnlyResults;
    const useTagOnly = safeSearch ? tagOnlyResults.filter(w => dictionary[w].safe !== false) : tagOnlyResults;

    searchResults = [];

    if (usePrimary.length > 0) {
      searchResults.push({ type: "heading", text: "通常検索の結果" });
      usePrimary.forEach(word => searchResults.push({ type: "word", value: word }));
    }

    if (useVariantOnly.length > 0) {
      searchResults.push({ type: "heading", text: "関連語検索の結果" });
      useVariantOnly.forEach(word => searchResults.push({ type: "word", value: word }));
    }

    if (useTagOnly.length > 0) {
      searchResults.push({ type: "heading", text: "タグ検索の結果" });
      useTagOnly.forEach(word => searchResults.push({ type: "word", value: word }));
    }
  }

  if (searchResults.length === 0) {
    const li = document.createElement("li");
    li.textContent = "該当する単語はありません｡";
    li.style.color = "gray";
    wordList.appendChild(li);
    pageInfoSpan.textContent = "0 / 0";
    prevPageBtn.disabled = true;
    nextPageBtn.disabled = true;
    return;
  }

  currentPage = 1;
  renderPage();
}


searchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    performSearch();
  }
});


// 検索モードを変更したら再検索されるよ
searchModeSelect.addEventListener("change", performSearch);

// ページ送りの処理だよ！
prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPage();
  }
});
nextPageBtn.addEventListener("click", () => {
  currentPage++;
  renderPage();
  console.log(data.word);
  console.log(typeof data.word);
});

// 辞書ファイル一覧だよ！
const files = ['Ndic.json'];

// 語数カウントするよ！
async function countWords() {
  try {
    // 全辞書ファイル読み込んで……
    const responses = await Promise.all(files.map(file => fetch(file).then(res => res.json())));

    // 辞書を統合して……
    const mergedData = Object.assign({}, ...responses);

    // 単語数をカウントしたら、
    const wordCount = Object.keys(mergedData).length;

    // それを表示するよ！
    document.getElementById('word-count').textContent = wordCount;
  } catch (error) {
    console.error('語数カウント中にエラー:', error);
    document.getElementById('word-count').textContent = 'エラー';
  }
}
window.addEventListener('popstate', () => {
  syncUIWithURL();
});
// ページ読み込み後に語数を表示するようにするよ！
document.addEventListener('DOMContentLoaded', countWords);

// hover → tap対応
document.addEventListener("click", function (e) {
  const cell = e.target.closest(".has-hover");

  // 全部閉じる
  document.querySelectorAll(".has-hover").forEach(el => {
    if (el !== cell) el.classList.remove("active");
  });

  // 押したセルだけトグル
  if (cell) {
    cell.classList.toggle("active");
  }
});
