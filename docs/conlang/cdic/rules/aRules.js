function getConjA(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {

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
      // 重畳形
      l: long_stem,
    }
  }
}
