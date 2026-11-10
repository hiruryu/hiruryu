// 灯語の動詞屈折（新体系：時制・分詞・命令形）。
// 旧体系（相：無相／完了相／進行相／反復相）は廃止。
// 仕様：2026-11-10 のみゅらの指示。詳細は notes.md「動詞屈折」参照。
// 動詞は必ず ε で終わる。屈折型は ε を除いたときの語末の音で決まる。
//   I-A：α・ο / I-B：ϊ・ϋ / I-C：ε̂（ε̂ で終わる場合は必ず I-C）
//   II-A：π・τ・κ（τσ̌ などの二重音字も II-A）/ II-B：φ・β・σ・σ̌・ζ・ζ̌・θ・δ・χ・γ・ξ
//   II-C：μ・ν / II-D：ρ・λ
// ξ は II-B（2026-11-10 決定。名詞・名飾詞でも同じ）。
// 未来は前置詞 ρο（"ρο " + 形）。過去未来は ρο + 過去形。相は表に載せない。
// 命令形は基底 + -α̂ζε（II-C は基底 + [μ/ν]α̂ζε、I-C は見出し語 + -ζε）。
// -α̂ζε は名詞の呼格でもある。
//
// 未確認の点（該当語なし。決まり次第ここを直す）:
//   - I-B の過去分詞：過去が -εκε に訂正されたが、過去分詞は当初の -ατσ̌ε のまま。
//     -ετσ̌ε にするならここを直す。

// ---------- 共通ヘルパー ----------
// 単語を (基底文字, 結合文字) のペアで扱う。カロン・分音符・長音を維持するため。
// （JSON の stem はカロンを落とすので、基底は見出し語から作る。）
const TDIC_V_VOWELS = new Set(["α", "ε", "η", "ι", "ο", "υ", "ω"]);
const TDIC_V_DIPHTHONGS = new Set(["αι", "ει", "οι", "αυ", "ευ", "ου", "υι", "ηυ"]);

function tdicParseWord(word) {
  const pairs = [];
  for (const c of [...word.normalize("NFD")]) {
    if (/[\u0300-\u036f]/.test(c)) {
      if (pairs.length) pairs[pairs.length - 1].marks.push(c);
    } else {
      pairs.push({ ch: c, marks: [] });
    }
  }
  return pairs;
}

// 母音群の先頭インデックス（ペア配列中の位置）を返す。
// 二重母音は1音節、母音の直前の ι（子音の後）はグライドとして扱う（名詞と同じ）。
function tdicVerbSyllableGroups(pairs) {
  const starts = [];
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];
    if (!TDIC_V_VOWELS.has(p.ch)) continue;
    const prev = pairs[i - 1];
    if (prev && TDIC_V_VOWELS.has(prev.ch)) {
      if (TDIC_V_DIPHTHONGS.has(prev.ch + p.ch)) continue;
      if (p.ch === "ι") continue;
    }
    starts.push(i);
  }
  return starts;
}

// 強勢母音の位置（ペア配列中のインデックス）。
// 見出し語に鋭アクセントがあればその母音、なければ音節数規則
// （1音節→その母音、2音節→第1音節、3音節以上→後ろから2番目）。名詞と同じ。
function tdicVerbStressedIndex(pairs) {
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].marks.includes("\u0301")) return i;
  }
  const groups = tdicVerbSyllableGroups(pairs);
  const t = groups.length === 1 ? 0 : groups.length === 2 ? 0 : groups.length - 2;
  return groups[t] ?? groups[0] ?? -1;
}

// ペア配列を文字列に戻す。分音符・長音・カロンは見出し語のものを維持し、
// 鋭アクセントは強勢母音に付ける（見出し語にない場合は規則で決めた位置に）。
function tdicVerbRenderPairs(pairs, stressIdx) {
  let out = "";
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];
    out += p.ch;
    if (p.marks.includes("\u0308")) out += "\u0308"; // 分音符
    if (p.marks.includes("\u0302")) out += "\u0302"; // 長音（サーカムフレックス）
    if (p.marks.includes("\u030c")) out += "\u030c"; // カロン
    if (i === stressIdx && TDIC_V_VOWELS.has(p.ch)) out += "\u0301"; // 鋭アクセント
  }
  return out;
}

// 基底のペア配列：見出し語から語末の ε（＋結合文字）を除いたもの。
// ε̂ で終わる場合は ε̂ を除く。ε で終わらない場合は全体を返す（空ではない）。
function tdicVerbBasePairs(word) {
  const pairs = tdicParseWord(word);
  if (pairs.length && pairs[pairs.length - 1].ch === "ε") return pairs.slice(0, -1);
  return pairs;
}

// 動詞の型分類（見出し語から判定。JSON の type/ruletype を決めるときに使う）。
// 戻り値："IA" / "IB" / "IC" / "IIA" / "IIB" / "IIC" / "IID"、
// または null（ε で終わらない）、"UNKNOWN:x"（どの型にもない語末音 x）。
function tdicVerbClassify(word) {
  const pairs = tdicParseWord(word);
  const last = pairs[pairs.length - 1];
  if (last && last.ch === "ε" && last.marks.includes("\u0302")) return "IC";
  const base = tdicVerbBasePairs(word);
  if (base.length === pairs.length) return null;
  // 二重音字：子音＋σ/ζ＋カロン（τσ̌ など）は II-A。
  const n = base.length;
  if (n >= 2 && base[n - 1].marks.includes("\u030c")
      && ["σ", "ζ"].includes(base[n - 1].ch)
      && !TDIC_V_VOWELS.has(base[n - 2].ch)) return "IIA";
  const l = base[base.length - 1];
  const lb = l.ch;
  if (lb === "α" || lb === "ο") return "IA";
  if ((lb === "ι" || lb === "υ") && l.marks.includes("\u0308")) return "IB";
  if (["π", "τ", "κ"].includes(lb)) return "IIA";
  // ξ は II-B（2026-11-10 決定。名詞・名飾詞でも同じ）。
  if (["φ", "β", "σ", "ζ", "θ", "δ", "χ", "γ", "ξ"].includes(lb)
      || l.marks.includes("\u030c")) return "IIB";
  if (["μ", "ν"].includes(lb)) return "IIC";
  if (["ρ", "λ"].includes(lb)) return "IID";
  return "UNKNOWN:" + lb;
}

// 命令形：基底 + -α̂ζε。ただし基底が α で終わる場合は、名詞の呼格と同じ理屈で
// ρ を挟む（α + α̂ → αρα̂）。未確認の類推。決まり次第ここを直す。
function tdicVerbImperative(base, basePairs) {
  const last = basePairs[basePairs.length - 1];
  if (last && last.ch === "α") return base + "ρα\u0302ζε";
  return base + "α\u0302ζε";
}

function getConjV(word, stem, _long_stem, stem2, type, ruletype) {
  if (ruletype === "no") return {};
  const src = word || stem;
  if (!src) return {};
  // 基底は見出し語から作る（JSON の stem はカロンを落とすため）。
  const pairs = tdicParseWord(src);
  const sIdx = tdicVerbStressedIndex(pairs);
  const pres = tdicVerbRenderPairs(pairs, sIdx);
  const basePairs = tdicVerbBasePairs(src);
  if (basePairs.length === pairs.length) return {}; // ε で終わらない語は活用なし
  const baseStress = sIdx >= 0 && sIdx < basePairs.length ? sIdx : -1;
  const base = tdicVerbRenderPairs(basePairs, baseStress);

  let past, presPart, pastPart, imp;
  switch (ruletype) {
    case "IA": // α・ο で終わる語
      past = base + "ικε";
      // 現在分詞 -ρα/-ρο：基底の語末母音に合わせる（α→-ρα、ο→-ρο）。
      presPart = base + (basePairs[basePairs.length - 1].ch === "ο" ? "ρο" : "ρα");
      pastPart = base + "ιτσ̌ε";
      // 命令形：基底が α だと ρ を挟む（2026-11-10 確認済み）。
      imp = tdicVerbImperative(base, basePairs);
      break;
    case "IC": // ε̂ で終わる語（例：φα̂́ζε̂）。I-A とは接辞が違う。
      // 過去 -εκε、過去分詞 -ετσ̌ε は基底（語末の ε̂ を除いたもの）に付ける。
      // 現在分詞は -∅（見出し語そのもの）。命令形は見出し語 + -ζε（ε̂ を維持）。
      past = base + "εκε";
      presPart = pres;
      pastPart = base + "ετσ̌ε";
      imp = pres + "ζε";
      break;
    case "IB": // ϊ・ϋ で終わる語
      // 過去は -εκε（2026-11-10 訂正。当初の -ικε は誤り）。
      past = base + "εκε";
      presPart = base + "αρι";
      pastPart = base + "ατσ̌ε";
      imp = tdicVerbImperative(base, basePairs);
      break;
    case "IIA": // π・τ・κ（τσ̌ などの二重音字も）
      past = base + "ικε";
      presPart = pres;
      pastPart = base + "ιτσ̌ε";
      imp = tdicVerbImperative(base, basePairs);
      break;
    case "IIB": // φ・β・σ・σ̌・ζ・ζ̌・θ・δ・χ・γ
      past = base + "κε";
      presPart = pres;
      pastPart = base + "ιτσ̌ε";
      imp = tdicVerbImperative(base, basePairs);
      break;
    case "IIC": // μ・ν
      past = base + "κε";
      presPart = pres;
      pastPart = base + "ιτσ̌ε";
      // 命令形は直前の子音に合わせた [μ/ν]α̂ζε（φάμε → φάμμα̂ζε、κάβνε → κάβννα̂ζε）。
      imp = base + basePairs[basePairs.length - 1].ch + "α\u0302ζε";
      break;
    case "IID": // ρ・λ
      past = base + "κε";
      presPart = pres;
      pastPart = base + "ιτσ̌ε";
      imp = tdicVerbImperative(base, basePairs);
      break;
    default:
      return {};
  }

  return {
    pres,                 // 現在
    past,                 // 過去
    fut: "ρο " + pres,    // 未来（前置詞 ρο）
    pastFut: "ρο " + past,// 過去未来（ρο + 過去形）
    presPart,             // 現在分詞
    pastPart,             // 過去分詞
    futPart: "ρο " + presPart,     // 未来分詞（ρο + 現在分詞）
    pastFutPart: "ρο " + pastPart, // 過去未来分詞（ρο + 過去分詞）
    imp,                  // 命令形
  };
}
