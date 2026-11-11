// 灯語の名飾詞（形容詞）屈折（新体系：原級・比較級・最上級・副飾形）。
// 旧体系（原級／比較級／最上級 × 格一致＋叙述、ラテン語接辞）は廃止。
// 仕様：2026-11-11 のみゅらの指示。詳細は notes.md「名飾詞屈折」参照。
// 形容詞の屈折は他のものより単純。stem の切り落としはしないのが基本。
//   （Ⅰ型名飾詞では語末の母音を残す。接辞は見出し語にそのまま付ける。）
// 型は語末の音で決まる：
//   I-A：母音で終わる / I-B：ϊ・ϋ で終わる
//   II-A：π・τ・κ / II-B：φ・β・σ・σ̌・ζ・ζ̌・θ・δ・χ・γ・ξ / II-C：μ・ν / II-D：ρ・λ
// ξ は II-B（2026-11-10 決定。名詞・動詞・名飾詞で同じ）。
// 4形：原級 pos（-∅）、比較級 comp、最上級 sup、副飾形 adv。
// アクセント規則は名詞・動詞と同じ（見出し語の鋭アクセントを維持、なければ音節数規則）。
// 格・数・可視性での一致はない。叙述形は残さない（副飾形に置き換え）。
// 副詞 σνο（id 189）は名飾詞とは別（独立した副飾語）で、ここでは扱わない。

// ---------- 共通ヘルパー ----------
// 単語を (基底文字, 結合文字) のペアで扱う。カロン・分音符・長音を維持するため。
// （JSON の stem はカロンを落とすので、基底は見出し語から作る。動詞と同じ。）
const TDIC_A_VOWELS = new Set(["α", "ε", "η", "ι", "ο", "υ", "ω"]);
const TDIC_A_DIPHTHONGS = new Set(["αι", "ει", "οι", "αυ", "ευ", "ου", "υι", "ηυ"]);

function tdicAdjParseWord(word) {
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
// 二重母音は1音節、母音の直前の ι（子音の後）はグライドとして扱う（名詞・動詞と同じ）。
function tdicAdjSyllableGroups(pairs) {
  const starts = [];
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];
    if (!TDIC_A_VOWELS.has(p.ch)) continue;
    const prev = pairs[i - 1];
    if (prev && TDIC_A_VOWELS.has(prev.ch)) {
      if (TDIC_A_DIPHTHONGS.has(prev.ch + p.ch)) continue;
      if (p.ch === "ι") continue;
    }
    starts.push(i);
  }
  return starts;
}

// 強勢母音の位置（ペア配列中のインデックス）。
// 見出し語に鋭アクセントがあればその母音、なければ音節数規則
// （1音節→その母音、2音節→第1音節、3音節以上→後ろから2番目）。名詞・動詞と同じ。
function tdicAdjStressedIndex(pairs) {
  for (let i = 0; i < pairs.length; i++) {
    if (pairs[i].marks.includes("\u0301")) return i;
  }
  const groups = tdicAdjSyllableGroups(pairs);
  const t = groups.length === 1 ? 0 : groups.length === 2 ? 0 : groups.length - 2;
  return groups[t] ?? groups[0] ?? -1;
}

// ペア配列を文字列に戻す。分音符・長音・カロンは見出し語のものを維持し、
// 鋭アクセントは強勢母音に付ける（見出し語にない場合は規則で決めた位置に）。
function tdicAdjRenderPairs(pairs, stressIdx) {
  let out = "";
  for (let i = 0; i < pairs.length; i++) {
    const p = pairs[i];
    out += p.ch;
    if (p.marks.includes("\u0308")) out += "\u0308"; // 分音符
    if (p.marks.includes("\u0302")) out += "\u0302"; // 長音（サーカムフレックス）
    if (p.marks.includes("\u030c")) out += "\u030c"; // カロン
    if (i === stressIdx && TDIC_A_VOWELS.has(p.ch)) out += "\u0301"; // 鋭アクセント
  }
  return out;
}

// 名飾詞の型分類（見出し語から判定。JSON の type/ruletype を決めるときに使う）。
// 戻り値："IA" / "IB" / "IIA" / "IIB" / "IIC" / "IID"、または "UNKNOWN:x"。
function tdicAdjClassify(word) {
  const pairs = tdicAdjParseWord(word);
  const last = pairs[pairs.length - 1];
  if (!last) return "UNKNOWN:";
  const lb = last.ch;
  if ((lb === "ι" || lb === "υ") && last.marks.includes("\u0308")) return "IB";
  if (TDIC_A_VOWELS.has(lb)) return "IA";
  if (["π", "τ", "κ"].includes(lb)) return "IIA";
  // ξ は II-B（2026-11-10 決定。名詞・動詞・名飾詞で同じ）。
  if (["φ", "β", "σ", "ς", "ζ", "θ", "δ", "χ", "γ", "ξ"].includes(lb)
      || last.marks.includes("\u030c")) return "IIB";
  if (["μ", "ν"].includes(lb)) return "IIC";
  if (["ρ", "λ"].includes(lb)) return "IID";
  return "UNKNOWN:" + lb;
}

// 接辞（文字列）をペア配列に変換する。
function tdicAdjSuffixPairs(suffix) {
  return tdicAdjParseWord(suffix);
}

// ---------- 屈折 ----------
// 4形を返す：pos（原級）、comp（比較級）、sup（最上級）、adv（副飾形）。
// 基底は見出し語そのもの（切り落としなし）。接辞をそのまま付ける。
// 語末が ς の語に接辞が付くときは、語中になるので σ にする（名詞と同じ理屈）。
function getConjA(word, stem, _long_stem, stem2, type, ruletype) {
  const paradigms = {
    IA:  { comp: "τι",  sup: "γκα",  adv: "ιμ" },
    IB:  { comp: "α\u0302τι", sup: "α\u0302γκα", adv: "α\u0302μ" },
    IIA: { comp: "ιτι", sup: "αγκα", adv: "ιμ" },
    IIB: { comp: "τι",  sup: "αγκα", adv: "ιμ" },
    IIC: { comp: "ιτι", sup: "αγκα", adv: "ιμ" },
    IID: { comp: "τι",  sup: "αγκα", adv: "ιμ" }
  };
  const paradigm = paradigms[ruletype];
  if (!paradigm) return {};

  const basePairs = tdicAdjParseWord(word);
  const stressIdx = tdicAdjStressedIndex(basePairs);

  // 原級：見出し語に規則のアクセントを付けたもの。
  const pos = tdicAdjRenderPairs(basePairs, stressIdx);

  // 接辞を付ける形：語末の ς は語中になるので σ にする。
  const joinPairs = basePairs.map(p => ({ ch: p.ch, marks: [...p.marks] }));
  if (joinPairs.length && joinPairs[joinPairs.length - 1].ch === "ς") {
    joinPairs[joinPairs.length - 1].ch = "σ";
  }
  const build = (suffix) => {
    const combined = [...joinPairs, ...tdicAdjSuffixPairs(suffix)];
    return tdicAdjRenderPairs(combined, stressIdx);
  };

  return {
    pos,
    comp: build(paradigm.comp),
    sup: build(paradigm.sup),
    adv: build(paradigm.adv)
  };
}
