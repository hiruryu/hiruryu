// 名象（トシュカ語）
// 屈折は数（単数 sg / 複数 pl）と可視性（可視 vis / 不可視 invis）のみ。
// 旧コード（格・限定形の ansC / anpC / adsC / adpC 体系）は廃止した。
//
// ruletype:
//   IA  - I-A型：α で終わる語
//   IB  - I-B型：ο で終わる語
//   IC  - I-C型：ε で終わる語
//   ID  - I-D型：母音連続で終わる語（末尾から2番目の母音が分音符付きの ι / υ）。
//         例：ντΐα（-ΐα）、将来の -ϊο / -ϋο / -ϊε / -ϋε の語も同じ。
//         末尾母音を落とさず、ρ を挟んで接辞を付ける。
//   IIA - II-A型：π, τ, κ で終わる語
//   IIB - II-B型：φ, β, σ, σ̌, ζ, ζ̌, θ, δ, χ, γ で終わる語
//   IIC - II-C型：μ, ν で終わる語
//   IID - II-D型：ρ, λ で終わる語
// 返り値: { sgVis, plVis, sgInvis, plInvis }
//
// 語幹の扱い:
//   full は stem（アクセント・長音記号なしの綴り）。
//   母音終わりの語（I-A / I-B / I-C）は full から末尾母音を落としたものを base とし、
//   子音終わりの語（II-A〜D）は full をそのまま base とする。
//   I-D型は末尾母音を落とさず full に ρ + 接辞を付ける。
//   sg.vis は full そのもの（I-B は full + ν）。他の形は base + 接辞。
//
// アクセント（鋭アクセント）と長音（サーカムフレックス）:
//   見出し語に鋭アクセントがあれば、その母音を全ての形で維持する
//   （合成語 μαχιόλ のように、音節数規則から外れる語も見出し語の通りになる）。
//   なければ音節数で決める（1音節→その母音、2音節→第1音節、3音節以上→後ろから2番目）。
//   長音も見出し語の母音ごとに維持する。接辞の母音にアクセントは付かない。
//   なお stem2（例：μαχιόλ の μαχιοτ）は現行の屈折では使わない（旧コードと同じ）。

const TDIC_VOWELS = new Set(["α", "ε", "η", "ι", "ο", "υ", "ω"]);
const TDIC_DIPHTHONGS = new Set(["αι", "ει", "οι", "αυ", "ευ", "ου", "υι", "ηυ"]);
const TDIC_ACUTE = "\u0301"; // 鋭アクセント
const TDIC_CIRCUMFLEX = "\u0302"; // 長音
const TDIC_DIAERESIS = "\u0308"; // 分音符（母音を分けて読む印）

function tdicStripMarks(s) {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// 見出し語の母音を stem の母音と対応付ける。
// 返すのは { stressed: 母音番号（なければ -1）, long: 長音の母音番号の集合,
//           diaeresis: 分音符の母音番号の集合 }。対応が取れなければ null。
function tdicWordFeatures(word, stem) {
  const groups = [];
  for (const ch of String(word).normalize("NFD")) {
    if (/[\u0300-\u036f]/.test(ch)) {
      if (groups.length) groups[groups.length - 1].marks.add(ch);
    } else {
      groups.push({ base: ch, marks: new Set() });
    }
  }
  const feats = groups.filter(g => TDIC_VOWELS.has(g.base));
  const stemVowels = [...String(stem)].filter(c => TDIC_VOWELS.has(c));
  if (feats.length !== stemVowels.length) return null;
  const stressed = feats.findIndex(f => f.marks.has(TDIC_ACUTE));
  const long = new Set();
  const diaeresis = new Set();
  feats.forEach((f, i) => {
    if (f.marks.has(TDIC_CIRCUMFLEX)) long.add(i);
    if (f.marks.has(TDIC_DIAERESIS)) diaeresis.add(i);
  });
  return { stressed, long, diaeresis };
}

// stem を音節（母音核）に分ける。各核は母音番号の配列。
// ι + 母音（分音符なし・直前が子音・直後が母音）は口蓋化として核に数えない。
// 二重母音（αι, ει, οι, αυ, ευ, ου, υι, ηυ）は1つの核。
function tdicSyllabify(stem, diaeresis) {
  const chars = [...String(stem)];
  const vowelIdx = chars.map((c, i) => (TDIC_VOWELS.has(c) ? i : -1)).filter(i => i >= 0);
  const nuclei = [];
  let i = 0;
  while (i < vowelIdx.length) {
    const pos = vowelIdx[i];
    // ι の口蓋化：直後が母音で、直前が子音で、分音符がない場合
    if (chars[pos] === "ι" && !diaeresis.has(i) && i + 1 < vowelIdx.length
        && vowelIdx[i + 1] === pos + 1 && pos > 0 && !TDIC_VOWELS.has(chars[pos - 1])) {
      i += 1;
      continue;
    }
    const nuc = [i];
    // 二重母音：直後の母音と隣接し、対をなす場合
    if (i + 1 < vowelIdx.length && vowelIdx[i + 1] === pos + 1
        && TDIC_DIPHTHONGS.has(chars[pos] + chars[vowelIdx[i + 1]])
        && !diaeresis.has(i + 1)) {
      nuc.push(i + 1);
      i += 1;
    }
    nuclei.push(nuc);
    i += 1;
  }
  return nuclei;
}

// アクセントを置く母音の番号（stem の母音の中での順番）を決める。
function tdicStressedVowel(word, stem) {
  const feats = tdicWordFeatures(word, stem);
  if (feats && feats.stressed >= 0) return { stressed: feats.stressed, long: feats.long };
  const diaeresis = feats ? feats.diaeresis : new Set();
  const nuclei = tdicSyllabify(stem, diaeresis);
  const target = nuclei.length <= 2 ? 0 : nuclei.length - 2;
  const stressed = nuclei.length ? nuclei[target][0] : 0;
  return { stressed, long: feats ? feats.long : new Set() };
}

// 記号なしの綴りにアクセント（鋭）と長音（サーカムフレックス）を付ける。
// stressed / long は stem の母音番号。接辞の母音には付かない。
function tdicApplyMarks(form, stemVowelCount, stressed, long) {
  const chars = [...String(form)];
  let v = 0;
  let out = "";
  for (const ch of chars) {
    out += ch;
    if (TDIC_VOWELS.has(ch)) {
      if (v < stemVowelCount) {
        if (long.has(v)) out += TDIC_CIRCUMFLEX;
        if (v === stressed) out += TDIC_ACUTE;
      }
      v += 1;
    }
  }
  return out;
}

// 名象
function getConjN(word, stem, _long_stem, stem2, type, ruletype) {
  if (ruletype === "no") return {};
  if (!stem) return {};
  let full = tdicStripMarks(stem);
  if (!full) return {};
  // 語末の ς は語中では σ になる（stem に ς が残っていた場合の保険）。
  if (full.endsWith("ς")) full = full.slice(0, -1) + "σ";

  const { stressed, long } = tdicStressedVowel(word || full, full);
  const stemVowels = [...full].filter(c => TDIC_VOWELS.has(c));
  const lastIsVowel = TDIC_VOWELS.has(full[full.length - 1]);
  // 母音終わりの語は末尾母音を落とす。ただしアクセントのある末尾母音は落とさない。
  const base = (lastIsVowel && stemVowels.length >= 2 && stressed !== stemVowels.length - 1)
    ? full.slice(0, -1)
    : full;
  const baseVowelCount = [...base].filter(c => TDIC_VOWELS.has(c)).length;

  const mark = (s) => tdicApplyMarks(s, baseVowelCount, stressed, long);
  const markFull = (s) => tdicApplyMarks(s, stemVowels.length, stressed, long);

  switch (ruletype) {
    case "IA": // α で終わる語：sg.vis -∅ / pl.vis -ις / sg.invis -ανα / pl.invis -αναις
      return {
        sgVis: markFull(full),
        plVis: mark(base + "ις"),
        sgInvis: mark(base + "ανα"),
        plInvis: mark(base + "αναις"),
      };
    case "IB": // ο で終わる語：sg.vis -ον / pl.vis -οις / sg.invis -οαν / pl.invis -οαναις
      return {
        sgVis: markFull(full + "ν"),
        plVis: mark(base + "οις"),
        sgInvis: mark(base + "οαν"),
        plInvis: mark(base + "οαναις"),
      };
    case "IC": // ε で終わる語：sg.vis -∅ / pl.vis -ις / sg.invis -ενα / pl.invis -εναις
      return {
        sgVis: markFull(full),
        plVis: mark(base + "ις"),
        sgInvis: mark(base + "ενα"),
        plInvis: mark(base + "εναις"),
      };
    case "ID": { // 母音連続で終わる語：末尾母音を落とさず ρ + 接辞
      // α終わり（ντΐα）はユーザーの指定通り -ρις / -ρανα / -ραναις。
      // ο・ε終わりは現行データに例がなく、ρ + 各型の通常接辞（I-B / I-C）に
      // ならった推測。該当語が出たときに見直すこと。
      const last = full[full.length - 1];
      const suf = last === "ο"
        ? { plVis: "ροις", sgInvis: "ροαν", plInvis: "ροαναις" }
        : last === "ε"
        ? { plVis: "ρις", sgInvis: "ρενα", plInvis: "ρεναις" }
        : { plVis: "ρις", sgInvis: "ρανα", plInvis: "ραναις" }; // α（既定）
      return {
        sgVis: markFull(full),
        plVis: markFull(full + suf.plVis),
        sgInvis: markFull(full + suf.sgInvis),
        plInvis: markFull(full + suf.plInvis),
      };
    }
    case "IIA": // π, τ, κ で終わる語：sg.vis -∅ / pl.vis -ελ / sg.invis -ιτ / pl.invis -ιτελ
      return {
        sgVis: markFull(full),
        plVis: mark(full + "ελ"),
        sgInvis: mark(full + "ιτ"),
        plInvis: mark(full + "ιτελ"),
      };
    case "IIB": // φ, β, σ, σ̌, ζ, ζ̌, θ, δ, χ, γ で終わる語：sg.vis -∅ / pl.vis -ο / sg.invis -ικ / pl.invis -ικο
      return {
        sgVis: markFull(full),
        plVis: mark(full + "ο"),
        sgInvis: mark(full + "ικ"),
        plInvis: mark(full + "ικο"),
      };
    case "IIC": // μ, ν で終わる語：sg.vis -∅ / pl.vis -εν / sg.invis -ιζ / pl.invis -ιζεν
      return {
        sgVis: markFull(full),
        plVis: mark(full + "εν"),
        sgInvis: mark(full + "ιζ"),
        plInvis: mark(full + "ιζεν"),
      };
    case "IID": // ρ, λ で終わる語：sg.vis -∅ / pl.vis -ας / sg.invis -ιρ / pl.invis -ιρας
      return {
        sgVis: markFull(full),
        plVis: mark(full + "ας"),
        sgInvis: mark(full + "ιρ"),
        plInvis: mark(full + "ιρας"),
      };
    default:
      return {};
  }
}
