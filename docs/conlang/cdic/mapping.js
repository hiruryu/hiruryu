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


let dictionary = {};     // 検索対象
let etymDictionary = {}; // 語源専用
    const idToWord = {}; // ID → 単語 を引くためのマッピング
    let searchResults = []; // 検索結果を保存する配列
    let currentPage = 1; // 現在のページ番号
    const itemsPerPage = 20; // 1ページに表示する単語数⁺

    // 品詞ごとに CSS クラスを割り当てるための対応表
    const partsStyles = {
  "体象": "meishou",
  "動詞": "doushi",
  "名飾": "meishoku",
  "副飾": "fukushoku",
  "文飾": "bunshoku",
  "副合辞<br>文飾": "bunshoku",
  "接辞": "fukuji",
  "離辞": "fukuji",
  "屈折接辞": "fukuji",
  "派生接辞": "fukuji",
  "離辞": "fukuji",
  "外詞": "kanto",
};

// 意味テキストから翻訳語を抽出する関数
// ［注釈］や（補足）を削除し、カンマで分割して配列にする
function extractTranslations(text) {
      const cleaned = text.replace(/［[^］]*］/g, "").replace(/〈[^］]*〉/g, "").replace(/《[^］]*》/g, "").replace(/（[^）]*）/g, "").trim();
      return cleaned.split(/\s*,\s*/).filter(item => item !== "");
    }

    // ［注釈］や（補足）などを削除するユーティリティ関数
    function removeAnnotations(text) {
      return text.replace(/［[^］]*］/g, "").replace(/〈[^］]*〉/g, "").replace(/《[^］]*》/g, "").replace(/（[^）]*）/g, "").trim();
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

// 語源文中のIDを辞書リンクに変換
function resolveEtymologyText(text) {
  if (!text) return "";

  const pages = {
    c: "cdic.html",
    e: "../etym/etym.html",
    n: "../ndic/ndic.html",
    t: "../tdic/tdic.html",
    ng: "../ngdic/ngdic.html",
    r: "../rdic/rdic.html",
    p: "../pdic/pdic.html"
  };

  const placeholders = [];

  // ① 他辞書を一旦退避
  text = text.replace(/\b(c|e|t|n|ng|r|p):(\d+)\b/gi, (match, dict, id) => {

  const page = pages[dict];
  if (!page) return match;

  let extDict = null;
  if (dict === "e") extDict = etymDictionary;
  if (dict === "t") extDict = tdicDictionary;
  if (dict === "n") extDict = ndicDictionary;
  if (dict === "ng") extDict = ngdicDictionary;
  if (dict === "r") extDict = rdicDictionary;
  if (dict === "p") extDict = pdicDictionary;
  let word = id;
  let meaning = "";

  if (extDict) {
    for (const [w, data] of Object.entries(extDict)) {
      if (String(data.id) === id) {
        word = w;
        meaning = removeAnnotations(data.meaning?.[0] ?? "");
        break;
      }
    }
  }

  const placeholder = `__LINK${placeholders.length}__`;

  placeholders.push(
    `<a href="${page}?id=${id}" target="_blank" class="etymology-link">${word}</a>（ ${meaning} ）`
  );

  return placeholder;
});


  // ② cdic ID
  text = text.replace(/\b(\d+)\b/g, (match, id) => {

    const word = idToWord[id];
    if (!word) return match;

    const entry = dictionary[word];
    if (!entry) return word;

    let meaning = entry.meaning?.[0] ?? "";
    meaning = removeAnnotations(meaning);

    return `<a href="#" onclick="loadWord('${word}'); return false;" class="etymology-link">${word}</a>（ ${meaning} ）`;
  });

  // ③ 他辞書リンクを戻す
  placeholders.forEach((link, i) => {
    text = text.replace(`__LINK${i}__`, link);
  });

  return text;
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

window.toggleMeaning = function(el) {
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

// JSON辞書を読み込んで……
  Promise.all([
  fetch('Cdic.json').then(r => r.json()),
  fetch('../etym/Etym.json').then(r => r.json()),
  fetch('../tdic/Tdic.json').then(r => r.json()),
  fetch('../ndic/Ndic.json').then(r => r.json()),
fetch('../ngdic/Ngdic.json').then(r => r.json()),
  fetch('../rdic/Rdic.json').then(r => r.json()),
fetch('../pdic/Pdic.json').then(r => r.json())
]).then(([dicData, oldData, tdicData, ndicData,ngdicData, rdicData,pdicData]) => {

  dictionary = { ...dicData };
  etymDictionary = oldData;
  tdicDictionary = tdicData;
  ndicDictionary = ndicData;
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

// 意味を1つ取得する関数
function getFirstMeaning(entry) {
  if (!entry.meaning) return "";

  // 配列なら最初の要素
  let m = Array.isArray(entry.meaning)
    ? entry.meaning[0]
    : entry.meaning;

  // 注釈削除
  m = removeAnnotations(m);

  // カンマ区切りなら最初だけ
  return m.split(",")[0].trim();

}

// 語リスト表示生成
function buildWordList(list) {
  return list.map(([word, entry]) => {
    const meaning = getFirstMeaning(entry);
    return `<a href="#" onclick="loadWord('${word}'); return false;">
              ${word}
            </a>（${meaning}）`;
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

    // 自分自身は除外
    if (entry.id === data.id) return false;

    // 「語素」や「変成体」は除外
    if (isMorphemeOrVariant(entry)) return false;
    const entryIDs = extractEtymologyIDs(entry);

    // 自分の語源に含まれる語
    if (sourceIDs.includes(String(entry.id))) return true;

    // 自分が語源になっている語
    if (entryIDs.includes(myID)) return true;

    // 同じ語源を共有する語
    return entryIDs.some(id => sourceIDs.includes(id));
  });
}


// 同類語
function getSimilarWords(data) {
  return Object.entries(dictionary).filter(([word, entry]) => {

    // 自分自身を除外
    if (entry.id === data.id) return false;

    // tagが存在しない場合
    if (!entry.tag || !data.tag) return false;

    // tagが「-」なら除外
    if (entry.tag === "ー" || data.tag === "ー") return false;

    // タグ一致
    return entry.tag === data.tag;
  });
}

// 単語の詳細表示についてだよ！
    function showDetails(word) {
      const data = getEntry(word);
      if (!data) {
        alert("単語「" + word + "」の詳細が見つかりません。");
        return;
      }

      let tableHTML = "";
      let conjugations = {};

// 体象の場合
       if (data.parts === "体象") {
// 活用情報を取得するよ
    const { word: w, stem, stem2 = stem, long_stem = stem, type, ruletype } = data;
    raw = getConjN(w, stem, long_stem, stem2, type, ruletype) || {};
    conjugations = raw;
// 活用が無い場合はメッセージを出すよ
    if (Object.keys(conjugations).length === 0) {
      tableHTML = `<tr><td colspan="9">この単語は活用型がありません。</td></tr>`;
    } else {
// 格だよ！
      const rows = [
        { label: "基格", prefix: "" },
        { label: "獣形", prefix: "f_" },
        { label: "能格", prefix: "e_" },
        { label: "与格", prefix: "d_" },
        { label: "奪格", prefix: "g_" },
        { label: "具格", prefix: "i_" },
        { label: "処格", prefix: "l_" },
        { label: "呼称形", prefix: "v_" },
        { label: "包括形", prefix: "in_" }
      ];
// 数や形などの列だよ！
      const columns = ["ansC", "anpC", "adsC", "adpC"];

// HTMLテーブルを生成するよ！
    tableHTML = rows.map((row, i) => {
      const cells = columns.map(col => {
        const key = row.prefix + col;
        const value = conjugations[key] ?? " — ";
        return `<td class="con">${value}</td>`;
      }).join("");

      return `<tr class="con${i + 1}"><td class="conname">${row.label}</td>${cells}</tr>`;
    }).join("\n");
  } 

// 動詞の場合
} else if (data.parts === "動詞") {
  let conjugations = {};
  if (data.stem) {
    conjugations = getConjV(
      data.word,
      data.stem,
      data.long_stem,
      data.stem2,
      data.type,
      data.ruletype
    ) || {};
  }

  if (Object.keys(conjugations).length === 0) {
    tableHTML = `<tr><td colspan="4">この語には活用データがありません。</td></tr>`;
  } else {

    const rows = [
      { label: "完結相", keys: ["p", "n", "f"] },
      { label: "完了相", keys: ["dp", "dn", "df"] },
      { label: "進行相", keys: ["sp", "sn", "sf"] },
      { label: "反復相", keys: ["mp", "mn", "mf"] }
    ];

    tableHTML = rows.map((row, i) => {
      const cells = row.keys
        .map(key => `<td class="con">${conjugations[key] || ""}</td>`)
        .join("");

      return `<tr class="con${i+1}">
                <td class="conname">${row.label}</td>
                ${cells}
              </tr>`;
    }).join("");
    tableHTML += `\n<tr class="con7"><td class="conname">具象形</td><td colspan="6" class="conname">${word || ""}</td></tr>`;
  }

// 名飾詞の場合
} else if (data.parts === "名飾") {
   const { word: w, stem, stem2 = stem, long_stem = stem, type, ruletype } = data;
    raw = getConjA(w, stem, long_stem, stem2, type, ruletype) || {};
    conjugations = raw;
// 活用が無い場合はメッセージを出すよ
  if (Object.keys(conjugations).length === 0) {
    tableHTML = `<tr><td colspan="7">この動詞は活用型がありません。</td></tr>`;
  } else {
    const rows = [
      { label: "基格一致", keys: ["s", "s2", "s3"] },
      { label: "獣格一致", keys: ["fs", "fs2","fs3"] },
      { label: "能格一致", keys: ["on", "on2", "on3"] },
      { label: "奪格一致", keys: ["es", "es2", "es3"] },
      { label: "与/呼格一致", keys: ["ds", "ds2", "ds3"] },
      { label: "処/具格一致", keys: ["ads", "ads2", "ads3"] }
    ];
// HTMLテーブルを生成するよ！
    tableHTML = rows.map((row, i) => {
      const cells = row.keys
        .map(key => `<td class="con">${conjugations[key] || ""}</td>`)
        .join("");
      return `<tr class="con${i+1}">
                <td class="conname">${row.label}</td>
                ${cells}
              </tr>`;
    }).join("");
    tableHTML += `\n<tr class="con7"><td class="conname">叙述</td><td colspan="6" class="conname">${word || ""}</td></tr>`;
  }
// 活用が無い場合
        if (Object.keys(conjugations).length === 0) {
          tableHTML = `<tr><td colspan="6">この動詞は活用型がありません。</td></tr>`;
        }
      }

// セーフサーチON/OFFの状態を取得
      const safeSearch = document.getElementById("safeSearchToggle").checked;
      let meaningsHTML = "";
      const MAX_VISIBLE = 10;

if (data.meaning) {
  // 配列ならそのまま、文字列ならカンマ分割
  const meanings = Array.isArray(data.meaning)
    ? data.meaning
    : data.meaning.split(",").map(s => s.trim());
// liタグで意味リストを生成
  meaningsHTML = meanings.map((m, i) => {
    const extraClass = i >= MAX_VISIBLE ? " extraMeaning" : "";
    return `<li class="detailList${extraClass}">${m}</li>`;
  }).join("");

  // 件数が多いときだけボタン追加
  if (meanings.length > MAX_VISIBLE) {
    const hiddenCount = meanings.length - MAX_VISIBLE;

    meaningsHTML += `
      <li class="detailList toggleWrapper">
        <a href="#" class="toggleMeaning"
           onclick="toggleMeaning(this); return false;">
           もっと見る（+${hiddenCount}）
        </a>
      </li>
    `;
  }
}

// vulgarMeaning が存在し、セーフサーチがOFFの場合
if (data.vulgarMeaning && !safeSearch) {
    let vulgarListHTML = "";
    if (Array.isArray(data.vulgarMeaning)) {
      vulgarListHTML = data.vulgarMeaning.map(item => `<li class="detailList">${item}</li>`).join("");
    } else {
      vulgarListHTML = `<li class="detailList">${data.vulgarMeaning}</li>`;
    }

// 「俗語意味を表示」トグルUIを追加
  meaningsHTML += `
    <li class="detailList">
      <a href="#" class="toggleVulgar" onclick="toggleVulgarMeaning(this); return false;">俗的な意味を表示</a>
      <ul class="vulgarList" style="display: none;">
        ${vulgarListHTML}
      </ul>
    </li>
  `;
}

      let leftRows = []; // 左側テーブル行
      let bottomRows = []; // 下部テーブル行

// 品詞
      leftRows.push(`<tr><th>属性</th><td>${data.parts || ""}</td></tr>`);

// タグ
      leftRows.push(`<tr><th>タグ</th><td class="t-td">${data.tag ? (Array.isArray(data.tag) ? data.tag.join(", ") : data.tag) : ""}</td></tr>`);

// 発音
      leftRows.push(`<tr><th>発音</th><td class="p-td">${data.pronunciation || ""}</td></tr>`);

// 語彙素形がある場合
      if (data.lexemic) {
        leftRows.push(`<tr><th>語彙素形</th><td class="maincolor">${data.lexemic}</td></tr>`);
      }

// 接辞形
      let fixHTML = "";
      if (data.fix) {
      // 配列 or カンマ区切りを処理
        const fix = Array.isArray(data.fix)
        ? data.fix
        : data.fix.split(",").map(s => s.trim());
      // liリスト化
        fixHTML = fix.map(f => `<li class="fixList">${f}</li>`).join("");
      }
// 接辞形がある場合テーブル追加
      if (fixHTML) {
        leftRows.push(`
        <tr>
        <th>接辞形</th>
        <td class="maincolor">
        <ul>${fixHTML}</ul>
      </td>
    </tr>
  `);
}

// 異形
      if (data.vari) {
        leftRows.push(`<tr><th>異形</th><td class="variList">${data.vari}</td></tr>`);
      }

// 屈折型
      if (data.type) {
        leftRows.push(`<tr><th>屈折型</th><td>${data.type || ""}</td></tr>`);;
      }

// 語義説明
      if (data.explanation) {
        leftRows.push(`<tr><th>語義</th><td>${data.explanation || ""}</td></tr>`);;
      }

// 意味列の rowspan の計算
      const rowspanCount = leftRows.length;
      // 最初の行に意味列を追加
      leftRows[0] = leftRows[0].replace(
        `<tr><th>属性</th><td>${data.parts || ""}</td>`,
        `<tr><th>属性</th><td>${data.parts || ""}</td><th rowspan="${rowspanCount}">意味</th><td rowspan="${rowspanCount}"><ul>${meaningsHTML}</ul></td>`
      );

// URLを自動リンク化する関数
      function processH5Links(text) {
        if (Array.isArray(text)) {
          text = text.join(' ');
        }
        return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1">$1</a>');
      }

// 語源表示処理
      if (data.etymology) {
        let introHTML = "";
        // 語源説明
        if (data.etymology.intro) {
          if (Array.isArray(data.etymology.intro)) {
            // リスト形式
            introHTML = `<ul class="e-list">` +
        data.etymology.intro.map(item => `<li>${processH5Links(item)}</li>`).join('') +
        `</ul>`;
      } else {
      // 単文の場合
      introHTML = `<p class="etymology-intro">${processH5Links(data.etymology.intro)}</p>`;
    }
  }

// 音変化表
      let changesTable = "";
      if (data.etymology.changes && data.etymology.changes.length > 0) {
    changesTable = `<table class="inner-table"><tbody>`;
    changesTable += data.etymology.changes.map(change => {
      const note = change.note ? " " + processH5Links(change.note) : "";
      return `<tr><td>${processH5Links(change.form)}<span>${note}</span></td></tr>`;
    }).join("");
    changesTable += `</tbody></table>`;
  }
  
// HTML内の余計な改行や<p>を除去する関数
const safeInline = s => String(s || '').trim().replace(/\s*\n+\s*/g, ' ').replace(/<\/?p[^>]*>/g, '');

// 語源表示の最終構築
if (data.etymology && (data.etymology.intro || (data.etymology.changes && data.etymology.changes.length > 0))) {
  let introHTML = "";
   // intro がある場合
  if (data.etymology.intro) {
    // 配列ならリストとして表示
    if (Array.isArray(data.etymology.intro)) {
  introHTML = '<ul class="e-list">' +
    data.etymology.intro.map(item => {
      const resolved = resolveEtymologyText(item);
      const processed = processH5Links ? processH5Links(resolved) : resolved;
      return `<li>${safeInline(processed)}</li>`;
    }).join('') +
    '</ul>';
} else {
      // 文字列なら段落として表示
      introHTML = `<p class="etymology-intro">${safeInline(processH5Links ? processH5Links(data.etymology.intro) : data.etymology.intro)}</p>`;
    }
  }

  let changesTable = "";
  // 語形変化の履歴がある場合
  if (data.etymology.changes && data.etymology.changes.length > 0) {
    changesTable = '<table class="inner-table"><tbody>' +
    // 各変化を1行ずつ作成
      data.etymology.changes.map(change => {
        // 語形
        const formHtml = `<span class="change-form">${safeInline(renderMarkdown ? renderMarkdown(change.form) : (processH5Links ? processH5Links(change.form) : change.form))}</span>`;
        // 注釈
        const noteRaw = change.note ? (renderMarkdown ? renderMarkdown(change.note) : (processH5Links ? processH5Links(change.note) : change.note)) : '';
        const noteHtml = noteRaw ? `<span class="change-note">${safeInline(noteRaw)}</span>` : '';
        return `<tr class="change-row"><td>${formHtml}${noteHtml}</td></tr>`;
      }).join('') +
      '</tbody></table>';
  }

// 語源を下部テーブルに追加
  bottomRows.push(`<tr><th>語源</th><td colspan="3">${introHTML}${changesTable}</td></tr>`);
}}

// 見出しクラス決定（品詞による色分け）
let headerClass = partsStyles[data.parts] || "default";

// 単語詳細テーブルの本体生成
let detailsHTML = `
  <table>
    <thead>
      <tr>
        <th class="heading-cell ${headerClass}" colspan="4">${word}</th>
      </tr>
    </thead>
    <tbody class="detailTable">
      ${leftRows.join("\n")}
      ${bottomRows.join("\n")}
    </tbody>
  </table>
`;
        
// 漢字（縫読/智読）の表示処理
let kanjiHTML = "";
if (data.kanji && data.kanji.title) {
  let nuiList = "";
  let chelList = "";

  // 縫読のリスト化
  if (data.kanji.nui) {
    const nuiArr = Array.isArray(data.kanji.nui) ? data.kanji.nui : [data.kanji.nui];
    nuiList = nuiArr.map(item => `<li>${item}</li>`).join("");
  }

  // 智読のリスト化
  if (data.kanji.chel) {
    const chelArr = Array.isArray(data.kanji.chel) ? data.kanji.chel : [data.kanji.chel];
    chelList = chelArr.map(item => `<li>${item}</li>`).join("");
  }

  // テーブルHTMLの構築
  kanjiHTML = `
    <table class="detailTable">
      <tbody>
        <tr>
          <th id="stripeth" rowspan="2">漢字: ${data.kanji.title}</th>
          <th>縫読</th>
          <td colspan="2">
            <ul class="kanji-list">${nuiList || "<li>ー</li>"}</ul>
          </td>
        </tr>
        <tr>
          <th>智読</th>
          <td colspan="2">
            <ul class="kanji-list">${chelList || "<li>ー</li>"}</ul>
          </td>
        </tr>
      </tbody>
    </table>`;
}

// 構築したHTMLをdetailsHTMLに連結
if (kanjiHTML) {
  detailsHTML += kanjiHTML;
}
        
// 一般言語学メモ（note1）
let note1HTML = "";
if (data.note1) {
  const notes = Array.isArray(data.note1)
    ? data.note1
    : data.note1.split(",").map(s => s.trim());
  note1HTML = notes.map(note => {
  const resolved = resolveEtymologyText(note);
  const processed = processH5Links(resolved);
  return `<li class="noteList">${processed}</li>`;
}).join("");
}
    if (note1HTML) {
      detailsHTML += `<table class="detailTable">
          <tbody>
          <tr>
            <th id="stripeth">一般言語学</th>
            <td colspan="3">
          <ul>
            ${note1HTML}
          </ul> 
          </td>
          </tr>
          </tbody>
          </table>`;
        }

      
// 智語解説タイトル
let note2TitleHTML = "";
if (data.note2 && data.note2.title) {
  const titles = Array.isArray(data.note2.title)
    ? data.note2.title
    : data.note2.title.split(",").map(s => s.trim());
  note2TitleHTML = titles.map(title => {
    return `<div class="note2-title">${title}</div>`;
  }).join("");
}

// 智語解説本文
let note2HTML = "";
if (data.note2) {
  let note2TextHTML = "";
  if (data.note2.txt) {

    const notes = Array.isArray(data.note2.txt)
      ? data.note2.txt
      : data.note2.txt.split(",").map(s => s.trim());
    note2TextHTML = notes.map(note => {
  note = resolveEtymologyText(note);
  const processedNote = note.replace(/<h5>(.*?)<\/h5>/g, (match, innerText) => {
        const key = innerText.replace(/^⇒\s*/, '').trim();
        const linkWord = linkMapping[key] || key;
        return `<h5><a href="#" onclick="loadWord('${linkWord}'); return false;">${innerText.trim()}</a></h5>`;
      });
      return `<li class="noteList">${processedNote}</li>`;
    }).join("");
  }

// note2 の画像
  let note2ImgHTML = "";
  if (data.note2.img) {
    const images = Array.isArray(data.note2.img)
      ? data.note2.img
      : [data.note2.img];
    note2ImgHTML = images.map(imgTag => imgTag).join("");
  }
// note2 を表示
  if (note2TitleHTML || note2TextHTML || note2ImgHTML) {
  detailsHTML += `<table class="detailTable">
    <tbody>
      <tr>
        <th id="stripeth">智語解説</th>
        <td colspan="3">
          ${ note2TitleHTML ? note2TitleHTML : "" }
          ${ note2TextHTML ? `<ul>${note2TextHTML}</ul>` : "" }
          ${ note2ImgHTML ? note2ImgHTML : "" }
        </td>
      </tr>
    </tbody>
  </table>`;
}
}

// 備考（note3）
      let note3HTML = "";
      if (data.note3) {
  const notes = Array.isArray(data.note3)
    ? data.note3
    : data.note3.split(",").map(s => s.trim());
  note3HTML = notes.map(note => {
// <h5>タグ内の単語を辞書リンク化
    note = resolveEtymologyText(note);
    const processedNote = note.replace(/<h5>(.*?)<\/h5>/g, (match, innerText) => {
      const key = innerText.replace(/^⇒\s*/, '').trim();
      const linkWord = linkMapping[key] || key;
      return `<h5><a href="#" onclick="loadWord('${linkWord}'); return false;">${innerText.trim()}</a></h5>`;
    });
    return `<li class="noteList">${processedNote}</li>`;
  }).join("");
}

// テーブル生成
    if (note3HTML) {
      detailsHTML += `<table class="detailTable">
        <tbody>
          <tr>
            <th id="stripeth">備考</th>
            <td colspan="3">
          <ul>
            ${note3HTML}
          </ul> 
          </td>
          </tr>
          </tbody>
          </table>`;
        }
        
// 注意点の表示
        if (data.alert) {
    const alertData = data.alert;
    const hasA1 = !!alertData.a1; // a1: 赤字の警告文
    const hasA2 = Array.isArray(alertData.a2) && alertData.a2.length > 0; // a2: 関連語リンク配列

    if (hasA1 || hasA2) {
      const a1Text = hasA1 // 赤字警告文
        ? `<span style="color: red;">${alertData.a1}</span>`
        : "";

      let a2Links = ""; // 関連語リンク生成
      if (hasA2) {
        a2Links = alertData.a2.map(obj => {
          const w = obj.word || "";
          return `<a href="#" onclick="loadWord('${w}'); return false;">${w}</a>`;
        }).join(" ");
      }

// テーブル追加
      detailsHTML += `
        <table class="detailTable">
          <tbody>
            <tr>
              <th id="stripeth">注意</th>
              <td colspan="3">
                ${a1Text} <br><br>
                ${a2Links ? " " + a2Links : ""}
              </td>
            </tr>
          </tbody>
        </table>
      `;
    }
  }

         // 例文表示    
      if (data.examples && data.examples.length) {
        detailsHTML += `<table class="detailTable">
          <tbody>
            <tr>
              <th>例文</th>
              <td colspan="3">${data.examples.join("<br>")}</td>
            </tr>
          </tbody>
        </table>`;
      }
        
// 類義語の生成
if (data.variants1 && data.variants1.length) {
  const links = data.variants1.map(id => {
    const word = idToWord[String(id)];
    if (!word || !dictionary[word]) return "";
    const entry = dictionary[word];
    const meaning = removeAnnotations(
      Array.isArray(entry.meaning)
        ? entry.meaning[0]
        : entry.meaning || ""
    );

    return `<a href="#" onclick="loadWord('${word}'); return false;">${word}</a>（${meaning}）`;

  }).filter(Boolean).join(", ");

// テーブル追加
  detailsHTML += `
    <table class="detailTable">
      <tbody>
        <tr>
          <th>類義語</th>
          <td class="linktext" colspan="3">${links}</td>
        </tr>
      </tbody>
    </table>`;
}


// 関連語の生成
const cognates = getCognates(data);
if (cognates.length) {
  const links = cognates
    // セーフサーチがONの時、safe:falseの語を除外するフィルタを追加
    .filter(([word, entry]) => !safeSearch || entry.safe !== false)
    .map(([word, entry]) => {
      const meaning = removeAnnotations(entry.meaning?.[0] ?? "");
      return `<a href="#" onclick="loadWord('${word}'); return false;">${word}</a>（ ${meaning} ）`;
    })
    .join(", ");

  // リンクがある場合のみテーブルを表示（フィルタですべて消える可能性があるため）
  if (links) {
    detailsHTML += `
      <table class="detailTable">
        <tbody>
          <tr>
            <th>関連語かも</th>
            <td class="linktext" colspan="3">${links}</td>
          </tr>
        </tbody>
      </table>`;
  }
}

// 同類語の生成
const similars = getSimilarWords(data);
if (similars.length) {
  const links = similars
    // セーフサーチがONの時、safe:falseの語を除外するフィルタを追加
    .filter(([word, entry]) => !safeSearch || entry.safe !== false)
    .map(([word, entry]) => {
      const meaning = removeAnnotations(entry.meaning?.[0] ?? "");
      return `<a href="#" onclick="loadWord('${word}'); return false;">${word}</a>（ ${meaning} ）`;
    })
    .join(", ");

  if (links) {
    detailsHTML += `
      <table class="detailTable">
        <tbody>
          <tr>
            <th>同類語</th>
            <td class="linktext" colspan="3">${links}</td>
          </tr>
        </tbody>
      </table>`;
  }
}

// 屈折表表示
// generateInflections() で生成された内容を表示するよ！
      if (tableHTML !== "") {
// 体象屈折表
        if (data.parts === "体象") {
          detailsHTML += `<table>
            <thead>
              <tr class="conH1" id="conH1">
                <th colspan="5">屈折型</th>
              </tr>
              <tr class="conH2">
                <th rowspan="2"></th>
                <th colspan="2">非限定形</th>
                <th colspan="2">限定形</th>
              </tr>
              <tr class="conH2">
                <th>単数</th>
                <th>複数</th>
                <th>単数</th>
                <th>複数</th>
              </tr>
            </thead>
            <tbody>
              ${tableHTML}
            </tbody>
          </table>`;

// 動詞屈折表
        } else if (data.parts === "動詞") {
          detailsHTML += `<table>
            <thead>
              <tr class="conH1" id="conH1">
                <th colspan="5">屈折型</th>
              </tr>
              <tr class="conH2">
                <th></th>
                <th>過去</th>
                <th>現在</th>
                <th>未来</th>
              </tr>
            </thead>
            <tbody>
              ${tableHTML}
            </tbody>
          </table>`;

// 形容詞（名飾）
        } else if (data.parts === "名飾") {
          detailsHTML += `<table>
             <thead>
              <tr class="conH1" id="conH1">
                <th colspan="7">屈折表</th>
              </tr>
              <tr class="conH2">
                <th rowspan="2"></th>
                <th colspan="1">原級</th>
                <th colspan="1">比較級</th>
                <th colspan="1">最上級</th>
              </tr>
            </thead>
            <tbody>
              ${tableHTML}
            </tbody>
          </table>`;

// その他品詞
        } else {
          detailsHTML += `<table>
            <tbody>
              ${tableHTML}
            </tbody>
          </table>`;
        }
      }
// HTMLを画面に描画
      details.innerHTML = detailsHTML;
    }

// 単語リンククリック時
window.loadWord = function(word) {
  showDetails(word);

  const data = getEntry(word);
  const id = data?.id ?? word;

  const newUrl = `${location.pathname}?id=${id}`;
  history.pushState(null, "", newUrl);
};

// 単語リスト項目生成
    function createWordListItem(word) {
    const data = getEntry(word);
    const li = document.createElement("li");

// 意味テキストを取得
      let meaningText = data.meaning
        ? (Array.isArray(data.meaning) ? data.meaning.join(', ') : data.meaning)
        : "";

// 翻訳を抽出
        const translations = extractTranslations(meaningText);
      let displayText = translations.join(', ');

// 表示文字数制限
      const maxLength = 20;
      if (displayText.length > maxLength) {
        displayText = displayText.substring(0, maxLength) + "……";
      }

// 品詞による色分け
      let headerClass = partsStyles[data.parts] || "default";
      li.innerHTML = `<strong class="${headerClass}">${word}</strong><br><span class="pagespan">${displayText}</span>`;

// クリックで詳細表示
      li.addEventListener("click", () => {
    showDetails(word);

// URL更新（履歴管理）
    const value = data.id != null ? String(data.id) : encodeURIComponent(word);
    const newUrl = `${location.pathname}?id=${value}`;
    history.pushState(null, "", newUrl);
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

// 品詞ごとに対応する屈折生成関数だよ！
    const inflectionRules = {
    体象: getConjN,
    動詞: getConjV,
    名飾: getConjA,
    副飾: getConjA,
    o: getConjot,
  };

  function generateInflections(word) {
 // 辞書データを取得するよ！
  const data = getEntry(word);
  if (!data) return [];

// 品詞に応じた屈折関数を取得するよ！
  const fn = inflectionRules[data.parts];
  if (typeof fn !== "function") return [];

// 体象の引数だよ！
  let raw;
  if (data.parts === "体象") {
    raw = fn(
      word,
      data.stem,
      data.stem2,
    data.long_stem,
      data.type,
      data.ruletype
    ) || {};

// 動詞・飾詞は以下の通り
  } else {
    raw = fn(
      word,
      data.stem,
      data.stem2,
    data.long_stem,
      data.type,
      data.ruletype
    ) || {};
  }

// 配列 or オブジェクトどちらでも扱えるよう統一
  const infls = Array.isArray(raw) ? raw : Object.values(raw);
  return infls;
}
window.generateInflections = generateInflections;

function buildInflectionCache() {
// 辞書未ロード時は処理しない
  if (!dictionary || Object.keys(dictionary).length === 0) return;
  for (const [w, d] of Object.entries(dictionary)) {
    try {
 // 屈折生成
      const inflRaw = (typeof generateInflections === "function") ? generateInflections(w) || [] : [];
      const inflArray = Array.isArray(inflRaw) ? inflRaw : Object.values(inflRaw || {});
// 注釈削除・空文字除去
      const inflCleanArray = inflArray
        .map(i => i == null ? "" : removeAnnotations(String(i)).trim())
        .filter(Boolean);
// 検索用キャッシュ
      d._inflArray = inflCleanArray;
// 正規化済み屈折形
      d._normInflArray = inflCleanArray.map(i => normalizeForSearch(i));
// 文字列化（全文検索用）
      d._normInflText = d._normInflArray.join(' ');

    } catch (err) {
// エラー時は空配列
      d._inflArray = [];
      d._normInflArray = [];
      d._normInflText = "";
      console.error("buildInflectionCache error for", w, err);
    }
  }
}
    function performSearch() {
// 検索語取得
      const rawSearch = searchBox.value || "";
const normalizedSearch = normalizeForSearch(rawSearch);
  const searchTerm = searchBox.value.toLowerCase();
  wordList.innerHTML = "";

// 検索語なし
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
  
// 辞書未ロード
  if (Object.keys(dictionary).length === 0) {
    wordList.innerHTML = "<li>データ読み込み中...</li>";
    return;
  }

// 検索モードを取得
  const searchMode = searchModeSelect.value;
  searchResults = []; // 検索結果格納配列を初期化

// タグ検索
  if (searchMode === "tag") {
// 入力されたタグを、カンマ区切りで分解するよ！
  const searchTags = searchTerm
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0);
    
// 辞書からタグ一致する単語を取得するよ！
  const tagResults = Object.keys(dictionary).filter(word => {
    const data = getEntry(word);

// タグが存在しない語は除外するよ！
    if (!data.tag) return false;

// タグを配列として扱うためのもの
    const tags = Array.isArray(data.tag)
      ? data.tag.map(t => removeAnnotations(t).toLowerCase())
      : [removeAnnotations(data.tag).toLowerCase()];

// すべての検索タグが含まれているか確認するよ！
    return searchTags.every(searchTag => tags.includes(searchTag));
  });

// アルファベット順で並べ替えるよ！
  tagResults.sort((a, b) => a.localeCompare(b));

// 結果がある場合は検索結果リストに追加！
  if (tagResults.length > 0) {

// 見出しを追加して……
    searchResults.push({ type: "heading", text: "【タグでの検索結果】" });

// そして各単語を結果として追加
    tagResults.forEach(word => {
      searchResults.push({ type: "word", value: word });
    });
  }

// 通常検索ならば、
} else {
  const primaryResults = Object.keys(dictionary).filter(word => {
  const data = getEntry(word);
  // 注釈削除した単語も検索に入れる
  const cleanedWord = removeAnnotations(word).toLowerCase();

// 単語綴りの一致判定
let matchKey = false;
if (searchMode === "exact") matchKey = (data._normKey === normalizedSearch);
else if (searchMode === "prefix") matchKey = data._normKey.startsWith(normalizedSearch);
else matchKey = data._normKey.includes(normalizedSearch);

// 意味検索
let matchMeaning = false;

if (data.meaning) {
  const meanings = Array.isArray(data.meaning)
    ? data.meaning
    : [data.meaning];

  matchMeaning = meanings.some(m => {
    const norm = normalizeForSearch(removeAnnotations(m));

    if (searchMode === "exact") return norm === normalizedSearch;
    else if (searchMode === "prefix") return norm.startsWith(normalizedSearch);
    else return norm.includes(normalizedSearch);
  });
}

// 俗語意味検索
  let matchVulgar = false;
  if (data.vulgarMeaning) {
    // 意味が複数ある場合
    if (Array.isArray(data.vulgarMeaning)) {
      matchVulgar = data.vulgarMeaning.some(v => {
        const cleaned = removeAnnotations(v).toLowerCase();
        if (searchMode === "exact") return cleaned === searchTerm;
        else if (searchMode === "prefix") return cleaned.startsWith(searchTerm);
        else return cleaned.includes(searchTerm);
      });
    } else {
      const cleaned = removeAnnotations(data.vulgarMeaning).toLowerCase();
      if (searchMode === "exact") matchVulgar = (cleaned === searchTerm);
      else if (searchMode === "prefix") matchVulgar = cleaned.startsWith(searchTerm);
      else matchVulgar = cleaned.includes(searchTerm);
    }
  }

// variants2 も検索に引っかかるようにするよ！
  let matchVariants2 = false;
  if (data.variants2) {
    matchVariants2 = data.variants2.some(v => {
      const cleaned = removeAnnotations(v).toLowerCase();
      if (searchMode === "exact") return cleaned === searchTerm;
      else if (searchMode === "prefix") return cleaned.startsWith(searchTerm);
      else return cleaned.includes(searchTerm);
    });
  }

// 活用形も検索に引っかかるようにするよ！
  let matchInflection = false;
// 事前キャッシュがあればそれを使うよ！
if (data._normInflArray && data._normInflArray.length) {
  matchInflection = data._normInflArray.some(norm => {
    if (searchMode === "exact") return norm === normalizedSearch;
    if (searchMode === "prefix") return norm.startsWith(normalizedSearch);
    return norm.includes(normalizedSearch);
  });

} else {
  // キャッシュが無い場合はその場で生成するよ！
  try {
    const inflections = generateInflections(word) || [];
    matchInflection = inflections.some(inf => {
      const norm = normalizeForSearch(removeAnnotations(String(inf)));
      if (searchMode === "exact") return norm === normalizedSearch;
      if (searchMode === "prefix") return norm.startsWith(normalizedSearch);
      return norm.includes(normalizedSearch);
    });
  } catch (e) {
    // 活用生成失敗時は false！
    matchInflection = false;
  }
}

// 以下のいずれかに一致した場合は true！
  return matchKey || matchMeaning || matchVariants2 || matchVulgar || matchInflection;
});

// variants1 検索
        const variantResults = Object.keys(dictionary).filter(word => {
          const data = getEntry(word);
          let matchVariants1 = false;
          if (data.variants1) {
            matchVariants1 = data.variants1.some(v => {
              const cleaned = removeAnnotations(v).toLowerCase();
              if (searchMode === "exact") return cleaned === searchTerm;
              else if (searchMode === "prefix") return cleaned.startsWith(searchTerm);
              else return cleaned.includes(searchTerm);
            });
          }
          return matchVariants1;
        });

// タグ検索（通常検索時の補助だよ）
        const tagResults = Object.keys(dictionary).filter(word => {
          const data = getEntry(word);
          let matchTag = false;
          if (data.tag) {
            if (Array.isArray(data.tag)) {
              matchTag = data.tag.some(t => removeAnnotations(t).toLowerCase() === searchTerm);
            } else {
              matchTag = removeAnnotations(data.tag).toLowerCase() === searchTerm;
            }
          }
          return matchTag;
        });

// 重複したのを除去するよ！
        const primarySet = new Set(primaryResults);
        
// variants1のみヒットした語
        const variantOnlyResults = variantResults.filter(word => !primarySet.has(word));
        const variantSet = new Set(variantOnlyResults);
        let tagOnlyResults = [];
        if (searchMode === "tag") {
          tagOnlyResults = tagResults.filter(word => !primarySet.has(word) && !variantSet.has(word));
          tagOnlyResults.sort((a, b) => a.localeCompare(b));
        }
// 結果ソート
        primaryResults.sort((a, b) => a.localeCompare(b));
        variantOnlyResults.sort((a, b) => a.localeCompare(b));
        tagOnlyResults.sort((a, b) => a.localeCompare(b));

// セーフサーチ判定
        const safeSearch = document.getElementById("safeSearchToggle").checked;

// safe=false の語を除外
const usePrimary = safeSearch
  ? primaryResults.filter(w => !(dictionary[w] && dictionary[w].safe === false))
  : primaryResults;

const useVariantOnly = safeSearch
  ? variantOnlyResults.filter(w => !(dictionary[w] && dictionary[w].safe === false))
  : variantOnlyResults;

const useTagOnly = (typeof tagOnlyResults !== 'undefined' && Array.isArray(tagOnlyResults))
  ? (safeSearch ? tagOnlyResults.filter(w => !(dictionary[w] && dictionary[w].safe === false)) : tagOnlyResults)
  : [];

// 検索結果を構築！
searchResults = [];

// 綴り・意味での検索結果
if (usePrimary.length > 0) {
  searchResults.push({ type: "heading", text: "【綴り・意味での検索結果】" });
  usePrimary.forEach(word => searchResults.push({ type: "word", value: word }));
}

// 関連語での検索結果
if (useVariantOnly.length > 0) {
  searchResults.push({ type: "heading", text: "【関連語での検索結果】" });
  useVariantOnly.forEach(word => searchResults.push({ type: "word", value: word }));
}
// タグでの検索結果
if (useTagOnly.length > 0) {
  searchResults.push({ type: "heading", text: "【タグでの検索結果】" });
  useTagOnly.forEach(word => searchResults.push({ type: "word", value: word }));
}}
// 検索結果がないなら「ない」とメッセージ
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

// ページ表示を初期化するよ！
      currentPage = 1;
      renderPage();
    }

// Enterキーで検索するようにするよ！
    searchBox.addEventListener("keydown", function(e) {
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
    });

// 辞書ファイル一覧だよ！
  const files = ['Cdic.json'];

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

// ページ読み込み後に語数を表示するようにするよ！
document.addEventListener('DOMContentLoaded', countWords);
