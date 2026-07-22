function getConjA(_word, stem, _long_stem, stem2, _type, ruletype, baseOverrides) {
  const vRules = [
    { from: "al", to: "o" },
    { from: "el", to: "o" },
    { from: "ol", to: "u" },
    { from: "ul", to: "u" },
    { from: "uil", to: "jui" },
    { from: "il", to: "ju" },
    { from: "anj", to: "ei" },
    { from: "alj", to: "ei" },
    { from: "ahj", to: "ei" },
    { from: "aqj", to: "ei" },
    { from: "arhj", to: "ei" },
    { from: "enj", to: "ei" },
    { from: "elj", to: "ei" },
    { from: "ehj", to: "ei" },
    { from: "eqj", to: "ei" },
    { from: "erhj", to: "ei" },
    { from: "onj", to: "ei" },
    { from: "olj", to: "ei" },
    { from: "ohj", to: "ei" },
    { from: "oqj", to: "ei" },
    { from: "orhj", to: "ei" },
    { from: "jinj", to: "ji" },
    { from: "jilj", to: "ji" },
    { from: "jihj", to: "ji" },
    { from: "jiqj", to: "ji" },
    { from: "jirhj", to: "ji" },
    { from: "uinj", to: "ji" },
    { from: "uilj", to: "ji" },
    { from: "uihj", to: "ji" },
    { from: "uiqj", to: "ji" },
    { from: "uirhj", to: "ji" },
    { from: "unj", to: "ui" },
    { from: "ulj", to: "ui" },
    { from: "uhj", to: "ui" },
    { from: "uqj", to: "ui" },
    { from: "urhj", to: "ui" }
  ];
  function applyVowelRules(text) {
    let result = text;
    for (const rule of vRules) {
      result = result.replaceAll(rule.from, rule.to);
    }
    return result;
  }

  const C = {
      p: "ph", b: "bh",
      t: "th", d: "x",
      k: "ch", g: "xh",
      h: "sh", q: "qn",
      y: "zh"
    };
    const V1 = {
      "ó": "ié",
      "ú": "í",
      "jó": "iá",
      "jú": "jí",
      "úi": "í",
      "júi": "jí",
      "ǻ": "áj",
      "ǻl": "álj"
    };
    const V2 = {
      "jo": "ia",
      "ji": "ji",
      "jui": "ji",
      "o": "ie",
      "i": "i",
      "ui": "i",
      "å": "aj",
      "ål": "alj"
    };

  if (ruletype === "no") {
    return {};

    // 基本形
  } else if (["p", "b", "k", "g", "f", "v", "sh", "zh", "ch", "xh", "h", "r", "rh"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem + "lå";
    let s3 = stem + "nå";
    let p = stem + "rå";
    let p2 = stem2 + "árvå";
    let p3 = stem2 + "ármå";

    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }

    return {
      // 単数一致-原級
      s: s + "i",
      f_s: s + "afj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amj",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }
    // 歯茎音
  } else if (["t", "d", "s", "z", "c", "x"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem + "iå";
    let s3 = stem + "nå";
    let p = stem + "rå";
    let p2 = stem2 + "árvå";
    let p3 = stem2 + "ármå";

    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }

    return {
      // 単数一致-原級
      s: s + "i",
      f_s: s + "afj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amj",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }
    // l 基本形
  } else if (["l"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem + "lå";
    let s3 = stem.slice(0, -1) + "nnå";
    let p = stem.slice(0, -1) + "rrå";
    let p2 = stem2 + "árvå";
    let p3 = stem2 + "ármå";

    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }

    return {
      // 単数一致-原級
      s: s + "i",
      f_s: s + "afj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amj",
      h_s: s + "luis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }


    // y 基本形
  } else if (["j"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem.slice(0, -1) + "ilå";
    let s3 = stem.slice(0, -1) + "inå";
    let p = stem.slice(0, -1) + "irå";
    let p2 = stem2 + "árvå";
    let p3 = stem2 + "ármå";

    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }

    return {
      // 単数一致-原級
      s: s + "e",
      f_s: s + "afj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amj",
      h_s: s.slice(0, -1) + "iruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }



    // 明音型
    // py... 基本形
  } else if (["pj", "bj", "tj", "dj", "kj", "gj", "fj", "vj", "sj", "zj", "cj", "xj", "shj", "zhj", "chj", "xhj", "rj", "rhj"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem + "lå";
    let s3 = stem + "nå";
    let p = stem + "rå";
    let p2 = stem2 + "árvå";
    let p3 = stem2 + "ármå";

    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }

    return {
      // 単数一致-原級
      s: s + "i",
      f_s: s + "afj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amj",
      h_s: s + "us",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }
    // ry / ly 基本形
  } else if (["hj", "nj", "qj", "lj", "rj", "rhj"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem2 + "lå";
    let s3 = stem2 + "nå";
    let p = stem2 + "rå";
    let p2 = stem2 + "rvå";
    let p3 = stem2 + "rmå";
    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }
    return {
      // 単数一致-原級
      s: s + "e",
      f_s: stem2 + "fj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: stem2 + "mj",
      h_s: stem2 + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }

    // 母音終了型
  } else if (["a", "i", "e", "ui"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem + "lå";
    let s3 = stem + "nå";
    let p = stem + "rå";
    let p2 = stem + "rvå";
    let p3 = stem + "rmå";
    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }
    return {
      // 単数一致-原級
      s: s + "je",
      f_s: s + "fyi",
      d_s: s + "ris",
      e_s: s + "růi",
      ad_s: s + "myi",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }
    // 母音終了型
  } else if (["u", "o"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem + "lå";
    let s3 = stem + "nå";
    let p = stem + "rå";
    let p2 = stem + "rvå";
    let p3 = stem + "rmå";
    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }
    return {
      // 単数一致-原級
      s: s + "vi",
      f_s: s + "fyi",
      d_s: s + "ris",
      e_s: s + "růi",
      ad_s: s + "myi",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }
    // 変則形
    // l 変則形
  } else if (["lq"].includes(ruletype)) {
    let s = stem + "";
    let s2 = stem2 + "lå";
    let s3 = stem2 + "nå";
    let p = stem2 + "rå";
    let p2 = stem2 + "rvå";
    let p3 = stem2 + "rmå";

    if (baseOverrides) {
      if (baseOverrides.s != null) s = baseOverrides.s;
      if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
      if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
      if (baseOverrides.p != null) p = baseOverrides.p;
      if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
      if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
    }

    return {
      // 単数一致-原級
      s: s + "i",
      f_s: stem2 + "fj",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: stem2 + "mj",
      h_s: stem2 + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fj",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "mj",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fj",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "mj",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fj",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "mj",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fj",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "mj",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fj",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "mj",
      h_p3: p3.slice(0, -1) + "os",
    }
  }
}
