function getConjA(_word, stem, _long_stem, stem2, _type, ruletype, baseOverrides) {
  const vRules = [
    { from: "al", to: "o" },
    { from: "el", to: "o" },
    { from: "ol", to: "u" },
    { from: "ul", to: "u" },
    { from: "uil", to: "yui" },
    { from: "il", to: "yu" },
    { from: "any", to: "ei" },
    { from: "aly", to: "ei" },
    { from: "ahy", to: "ei" },
    { from: "aqy", to: "ei" },
    { from: "arhy", to: "ei" },
    { from: "eny", to: "ei" },
    { from: "ely", to: "ei" },
    { from: "ehy", to: "ei" },
    { from: "eqy", to: "ei" },
    { from: "erhy", to: "ei" },
    { from: "ony", to: "ei" },
    { from: "oly", to: "ei" },
    { from: "ohy", to: "ei" },
    { from: "oqy", to: "ei" },
    { from: "orhy", to: "ei" },
    { from: "yiny", to: "yi" },
    { from: "yily", to: "yi" },
    { from: "yihy", to: "yi" },
    { from: "yiqy", to: "yi" },
    { from: "yirhy", to: "yi" },
    { from: "uiny", to: "yi" },
    { from: "uily", to: "yi" },
    { from: "uihy", to: "yi" },
    { from: "uiqy", to: "yi" },
    { from: "uirhy", to: "yi" },
    { from: "uny", to: "ui" },
    { from: "uly", to: "ui" },
    { from: "uhy", to: "ui" },
    { from: "uqy", to: "ui" },
    { from: "urhy", to: "ui" }
  ];
  function applyVowelRules(text) {
    let result = text;
    for (const rule of vRules) {
      result = result.replaceAll(rule.from, rule.to);
    }
    return result;
  }

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
      f_s: s + "afy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amy",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
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
      f_s: s + "afy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amy",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
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
      f_s: s + "afy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amy",
      h_s: s + "luis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
      h_p3: p3.slice(0, -1) + "os",
    }


    // y 基本形
  } else if (["y"].includes(ruletype)) {
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
      f_s: s + "afy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amy",
      h_s: s.slice(0,-1) + "iruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
      h_p3: p3.slice(0, -1) + "os",
    }



    // 明音型
    // py... 基本形
  } else if (["py", "by", "ty", "dy", "ky", "gy", "fy", "vy", "sy", "zy", "cy", "xy", "shy", "zhy", "chy", "xhy", "ry", "rhy"].includes(ruletype)) {
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
      f_s: s + "afy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: s + "amy",
      h_s: s + "us",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
      h_p3: p3.slice(0, -1) + "os",
    }
    // ry / ly 基本形
  } else if (["hy", "ny", "qy", "ly", "ry", "rhy"].includes(ruletype)) {
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
      f_s: stem2 + "fy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: stem2 + "my",
      h_s: stem2 + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
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
      s: s + "ye",
      f_s: s + "fyi",
      d_s: s + "ris",
      e_s: s + "růi",
      ad_s: s + "myi",
      h_s: s + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
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
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
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
      f_s: stem2 + "fy",
      d_s: s + "is",
      e_s: s + "ůi",
      ad_s: stem2 + "my",
      h_s: stem2 + "ruis",
      // 単数一致-比較級
      s2: s2,
      f_s2: s2 + "fy",
      d_s2: s2.slice(0, -1) + "es",
      e_s2: s2.slice(0, -1) + "ůi",
      ad_s2: s2 + "my",
      h_s2: s2.slice(0, -1) + "os",
      // 単数一致-最上級
      s3: s3,
      f_s3: s3 + "fy",
      d_s3: s3.slice(0, -1) + "es",
      e_s3: s3.slice(0, -1) + "ůi",
      ad_s3: s3 + "my",
      h_s3: s3.slice(0, -1) + "os",
      // 単数一致-原級
      p: p,
      f_p: p + "fy",
      d_p: p.slice(0, -1) + "es",
      e_p: p.slice(0, -1) + "ůi",
      ad_p: p + "my",
      h_p: p.slice(0, -1) + "os",
      // 単数一致-比較級
      p2: p2,
      f_p2: p2 + "fy",
      d_p2: p2.slice(0, -1) + "es",
      e_p2: p2.slice(0, -1) + "ůi",
      ad_p2: p2 + "my",
      h_p2: p2.slice(0, -1) + "os",
      // 単数一致-最上級
      p3: p3,
      f_p3: p3 + "fy",
      d_p3: p3.slice(0, -1) + "es",
      e_p3: p3.slice(0, -1) + "ůi",
      ad_p3: p3 + "my",
      h_p3: p3.slice(0, -1) + "os",
    }
  }
}
