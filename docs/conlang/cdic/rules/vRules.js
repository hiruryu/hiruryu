function getConjV(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {
  if (ruletype === "not") {
    return {};
    // t / d / k / g / s / z / c / h 基本形
  } else if (["t", "d", "k", "g", "f", "v", "s", "z", "c", "x", "h"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ál",
      f: stem3 + "íp",
      // 完了相
      dn: stem2 + "ris",
      dp: stem2 + "rol",
      df: stem2 + "rip",
      // 進行相
      sn: stem2 + "is",
     sp: stem2 + "ílle",
      sf: stem2 + "ísfe",
      // 反復相,
      mn: stem2 + "uium",
      mp: stem2 + "uiumal",
      mf: stem2 + "uiumik",
      // 重畳形,
      l: long_stem
    }
  }
}
