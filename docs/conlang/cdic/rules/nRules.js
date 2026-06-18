// 名象
function getConjN(word, stem, _long_stem, stem2, type, ruletype, baseOverrides) {
  const vRules = [
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

  if (ruletype === "not") {
    return { ansC: word };
    // a 尾高形
  } else if (ruletype === "á") {
    const anpC = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "f",
      e_ansC: stem.slice(0, -1) + "ók",
      d_ansC: stem.slice(0, -1) + "ás",
      l_ansC: stem.slice(0, -1) + "óm",
      i_ansC: stem + "sh",
      g_ansC: stem.slice(0, -1) + "ói",
      v_ansC: stem + "rh",
      in_ansC: stem.slice(0, -1) + "óita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC.slice(0, -1) + "uirh",
      in_anpC: anpC.slice(0, -1) + "uita",
    }
    // o 尾高形
  } else if (ruletype === "ó") {
    const anpC = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "f",
      e_ansC: stem.slice(0, -1) + "ók",
      d_ansC: stem.slice(0, -1) + "ás",
      l_ansC: stem.slice(0, -1) + "óm",
      i_ansC: stem + "sh",
      g_ansC: stem.slice(0, -1) + "ói",
      v_ansC: stem + "rh",
      in_ansC: stem.slice(0, -1) + "óita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC.slice(0, -1) + "uirh",
      in_anpC: anpC.slice(0, -1) + "uita",
    }
    // ũ 基本型
  } else if (ruletype === "ũ") {
    const anpC = stem + "da";
    const anpC2 = stem2 + "da";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "f",
      e_ansC: stem2.slice(0, -1) + "ók",
      d_ansC: stem2.slice(0, -1) + "ás",
      l_ansC: stem2.slice(0, -1) + "óm",
      i_ansC: stem + "sh",
      g_ansC: stem2.slice(0, -1) + "ói",
      v_ansC: stem + "rh",
      in_ansC: stem2.slice(0, -1) + "óita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // u 基本形
  } else if (ruletype === "w") {
    const anpC = stem2 + "úra";
    const anpC2 = stem2 + "uira";
    
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "uif",
      e_ansC: stem + "uik",
      d_ansC: stem + "ues",
      l_ansC: stem + "uim",
      i_ansC: stem + "uish",
      g_ansC: stem2 + "úvi",
      v_ansC: stem2 + "úrh",
      in_ansC: stem2 + "úvita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -2) + "tta",
    }
    
    // ma / na / qa 基本形
  } else if (["ma", "na", "qa"].includes(ruletype)) {
    const anpC = stem2 + "ára";
    const anpC2 = stem2 + "ara";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // k / g / f / v/ s / z / c / sh / zh / ch / xh / r / rh / l 基本形
  } else if (["k", "g", "f", "v", "s", "z", "c", "x", "sh", "zh", "ch", "xh", "rh", "pq"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // h 基本形
  } else if (["k", "g", "f", "v", "s", "z", "c", "x", "sh", "zh", "ch", "xh", "h", "rh", "pq"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem.slice(0, -1) + "fhes",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem.slice(0, -1) + "fhui",
      v_ansC: stem2 + "árh",
      in_ansC: stem.slice(0, -1) + "fhta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // p 基本形
  } else if (["p"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "faf",
      e_ansC: stem.slice(0, -1) + "fak",
      d_ansC: stem.slice(0, -1) + "fes",
      l_ansC: stem.slice(0, -1) + "fam",
      i_ansC: stem.slice(0, -1) + "fash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // b 基本形
  } else if (["b"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "vaf",
      e_ansC: stem.slice(0, -1) + "vak",
      d_ansC: stem.slice(0, -1) + "ves",
      l_ansC: stem.slice(0, -1) + "vam",
      i_ansC: stem.slice(0, -1) + "vash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // t 基本形
  } else if (["t"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "caf",
      e_ansC: stem.slice(0, -1) + "cak",
      d_ansC: stem.slice(0, -1) + "ces",
      l_ansC: stem.slice(0, -1) + "cam",
      i_ansC: stem.slice(0, -1) + "cash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // d 基本形
  } else if (["d"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "xaf",
      e_ansC: stem.slice(0, -1) + "xak",
      d_ansC: stem.slice(0, -1) + "xes",
      l_ansC: stem.slice(0, -1) + "xam",
      i_ansC: stem.slice(0, -1) + "xash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // m 基本形
  } else if (["m"].includes(ruletype)) {
    const anpC = stem + "bra";
    const anpC2 = stem2 + "bra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // n 基本形
  } else if (["n"].includes(ruletype)) {
    const anpC = stem + "dra";
    const anpC2 = stem2 + "dra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // q 基本形
  } else if (["q"].includes(ruletype)) {
    const anpC = stem + "gra";
    const anpC2 = stem2 + "gra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // y 基本形
  } else if (["y"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem.slice(0, -1) + "ira";
    const anpC3 = stem2.slice(0, -1) + "ira";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + "af",
      e_anpC: anpC2.slice(0, -1) + "ak",
      d_anpC: anpC2.slice(0, -1) + "es",
      l_anpC: anpC2.slice(0, -1) + "am",
      i_anpC: anpC2.slice(0, -1) + "ash",
      g_anpC: anpC2.slice(0, -1) + "ui",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "uita"
    }


    // o型名詞
    // p / b / t / d / k / g / f / v/ s / z / c / sh / zh / ch / xh / h / r / rh / l / y 基本形
  } else if (["po", "bo", "to", "do", "ko", "go", "fo", "vo", "so", "zo", "co", "xo", "sho", "zho", "cho", "xho", "ho", "mo","no","qo","ro", "rho", "lo", "yo"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2.slice(0, -1) + "óra";
    const anpC3 = stem2.slice(0, -1) + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "f",
      e_ansC: stem + "k",
      d_ansC: stem2.slice(0, -1) + "ö́s",
      l_ansC: stem2.slice(0, -1) + "ö́m",
      i_ansC: stem2.slice(0, -1) + "ö́sh",
      g_ansC: stem + "ì",
      v_ansC: stem2.slice(0, -1) + "ö́rh",
      in_ansC: stem + "ita",
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + "af",
      e_anpC: anpC2.slice(0, -1) + "ak",
      d_anpC: anpC2.slice(0, -1) + "es",
      l_anpC: anpC2.slice(0, -1) + "am",
      i_anpC: anpC2.slice(0, -1) + "ash",
      g_anpC: anpC2.slice(0, -1) + "ui",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "uita"
    }


    // 明音型（〇y）
    // ky / gy / fy / vy / sy / zy / cy / shy / zhy / chy / xhy / ry 基本形
  } else if (["ky", "gy", "fy", "vy", "sy", "zy", "cy", "xy", "shy", "zhy", "chy", "xhy", "hy", "ry", "rhy", "ly"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // py 基本形
  } else if (["py"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "fyaf",
      e_ansC: stem.slice(0, -1) + "fyak",
      d_ansC: stem.slice(0, -1) + "fyes",
      l_ansC: stem.slice(0, -1) + "fyam",
      i_ansC: stem.slice(0, -1) + "fyash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // by 基本形
  } else if (["by"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "vyaf",
      e_ansC: stem.slice(0, -1) + "vyak",
      d_ansC: stem.slice(0, -1) + "vyes",
      l_ansC: stem.slice(0, -1) + "vyam",
      i_ansC: stem.slice(0, -1) + "vyash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // ty 基本形
  } else if (["ty"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "caf",
      e_ansC: stem.slice(0, -1) + "cak",
      d_ansC: stem.slice(0, -1) + "ces",
      l_ansC: stem.slice(0, -1) + "cam",
      i_ansC: stem.slice(0, -1) + "cash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // dy 基本形
  } else if (["dy"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "xaf",
      e_ansC: stem.slice(0, -1) + "xak",
      d_ansC: stem.slice(0, -1) + "xes",
      l_ansC: stem.slice(0, -1) + "xam",
      i_ansC: stem.slice(0, -1) + "xash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // my 基本形
  } else if (["my"].includes(ruletype)) {
    const anpC = stem.slice(0, -1) + "bia";
    const anpC2 = stem2.slice(0, -1) + "bia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // ny 基本形
  } else if (["ny"].includes(ruletype)) {
    const anpC = stem.slice(0, -1) + "dia";
    const anpC2 = stem2.slice(0, -1) + "dia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    // qy 基本形
  } else if (["qy"].includes(ruletype)) {
    const anpC = stem.slice(0, -1) + "gia";
    const anpC2 = stem2.slice(0, -1) + "gia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }

    // 変則型（〇q）
    // lo 変則形
  } else if (["lq"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem.slice(0, -2) + "ndis";
    const anpC3 = stem2.slice(0, -1) + "ndia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "f",
      e_ansC: stem + "k",
      d_ansC: stem2.slice(0, -1) + "ö́s",
      l_ansC: stem.slice(0, -1) + "ö́m",
      i_ansC: stem.slice(0, -1) + "ö́sh",
      g_ansC: stem + "ì",
      v_ansC: stem2.slice(0, -1) + "ö́rh",
      in_ansC: stem + "ita",
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + "af",
      e_anpC: anpC2.slice(0, -1) + "ak",
      d_anpC: anpC2.slice(0, -1) + "es",
      l_anpC: anpC2.slice(0, -1) + "am",
      i_anpC: anpC2.slice(0, -1) + "ash",
      g_anpC: anpC2.slice(0, -1) + "ui",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "uita"
    }
    // hy / ny / qy / ly / rhy 変則形
  } else if (["hyq", "nyq", "lyq", "rhyq"].includes(ruletype)) {
    const anpC = stem.slice(0, -2) + "idra";
    const anpC2 = stem2.slice(0, -2) + "dra";
    const anpC3 = applyVowelRules(stem2) + "dra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "uita"
    }
    
    // 代名詞型
    // myigo, vliego,mpyigo
      } else if (["myigo","vliego", "kyigo","pyigo"].includes(ruletype)) {
    const anpC = stem.slice(0,-2) + "ig";
    const anpC2 = stem2.slice(0,-3) + "or";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "raf",
      e_ansC: stem + "rak",
      d_ansC: stem + "res",
      l_ansC: stem + "ram",
      i_ansC: stem + "rash",
      g_ansC: stem + "lui",
      v_ansC: anpC + "rárh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "ui",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "uita"
    }
    //
  } else if (["lyiko","fyiko","tyiko"].includes(ruletype)) {
    const anpC = stem.slice(0,-2) + "ic";
    const anpC2 = stem2.slice(0,-3) + "or";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "lui",
      v_ansC: anpC + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "ui",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "uita"
    }
    // syiga
      } else if (["syiga"].includes(ruletype)) {
    const anpC = stem.slice(0,-2) + "ig";
    const anpC2 = stem2.slice(0,-3) + "ar";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "raf",
      e_ansC: stem + "rak",
      d_ansC: stem + "res",
      l_ansC: stem + "ram",
      i_ansC: stem + "rash",
      g_ansC: stem + "lui",
      v_ansC: anpC + "rárh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "ui",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "uita"
    }
    // pyika
    } else if (["pyika"].includes(ruletype)) {
    const anpC = stem.slice(0,-2) + "ic";
    const anpC2 = stem2.slice(0,-3) + "ar";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "lui",
      v_ansC: anpC + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "ui",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "uita"
      }



      // ia 基本形
  } else if (["l","cia", "xia","fia", "via","sia", "zia","shia", "zhia","chia", "xhia","nia", "qia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í"
  }[m];
}) + "ia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "å": "ay",
    "ål": "aly"
  }[m];
}) + "ia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }
    // ia 基本形
  } else if (["r"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í"
  }[m];
}).slice(0,-1) + "dia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "å": "ay",
    "ål": "aly"
  }[m];
}).slice(0,-1) + "dia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }

     // ia 交替形
  } else if (["pia","bia","tia","mia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í"
  }[m];
}) + "hia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "å": "ay",
    "ål": "aly"
  }[m];
}) + "hia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }

    // yia 基本形
  } else if (["yia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í"
  }[m];
}).slice(0,-1) + "zhia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "áy",
    "ǻl": "ály"
  }[m];
}).slice(0,-1) + "zhia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }


    // k-ch 交替形
  } else if (["kia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í",
  }[m];
}).slice(0,-1) + "chia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "å": "ay",
    "ål": "aly"
  }[m];
}).slice(0,-1) + "chia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }
    // g-xh 交替形
  } else if (["gia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í"
  }[m];
}).slice(0,-1) + "xhia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "áy",
    "ǻl": "ály"
  }[m];
}).slice(0,-1) + "xhia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }
    // d-x 交替形
  } else if (["dia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály",
    "úi": "í"
  }[m];
}).slice(0,-1) + "xia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "áy",
    "ǻl": "ály"
  }[m];
}).slice(0,-1) + "xia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }
    // h-sh 交替形
  } else if (["hia"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0,-1) + "shia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0,-1) + "shia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "ta"
    }

    // gda 変則型
  } else if (["gda"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "áy",
    "ǻl": "ály"
  }[m];
}).slice(0,-2) + "gra";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å|ö/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "áy",
    "ǻl": "ály",
    "ö": "a",
  }[m];
}).slice(0,-1) + "da";
const anpC3 = stem2.replace(/yui|yo|ui|o|ål|å|ö/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "áy",
    "ǻl": "ály",
    "ö": "a",
  }[m];
}).slice(0,-1) + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: anpC2.slice(0,-1) + "árh",
      in_ansC: stem + "uita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1) + "ui",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC3.slice(0, -1) + "áta"
    }

    // 明化形
  } else if (["ia", "i"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "y";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "y";
const anpC3 = stem.replace(/yú|yó|úi|ú|ó/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá"
  }[m];
}).slice(0,-1) + "i";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "ie",
      l_ansC: stem + "ũ",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC3 + "fy",
      e_anpC: anpC3 + "ky",
      d_anpC: anpC3 + "sy",
      l_anpC: anpC3 + "my",
      i_anpC: anpC3 + "shy",
      g_anpC: anpC3,
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC3 + "ta"
    }

    // p 明化形
  } else if (["pi","bi","ti","mi"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "hy";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "h";
const anpC3 = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "h";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "h",
      e_ansC: stem + "h",
      d_ansC: stem + "hie",
      l_ansC: stem + "ũ",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "hta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC3 + "fa",
      e_anpC: anpC3 + "ka",
      d_anpC: anpC3 + "sa",
      l_anpC: anpC3 + "ma",
      i_anpC: anpC3 + "sha",
      g_anpC: anpC3 + "ui",
      v_anpC: anpC2 + "árh",
      in_anpC: anpC3 + "ta"
    }
    
    // k 明化形
  } else if (["ki"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "y";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ia",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}) + "y";
const anpC3 = stem.replace(/yú|yó|úi|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "iá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0,-1) + "i";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "h",
      e_ansC: stem + "h",
      d_ansC: stem.slice(0,-1) + "chie",
      l_ansC: stem + "ũ",
      i_ansC: stem + "sh",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC3 + "fy",
      e_anpC: anpC3 + "ky",
      d_anpC: anpC3 + "sy",
      l_anpC: anpC3 + "my",
      i_anpC: anpC3 + "shy",
      g_anpC: anpC3,
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC3 + "ta"
    }


    // ttsa 明化形
  } else if (["tts"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "yí",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0, -3) + "scia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "yi",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0, -3) + "scia";
const anpC3 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "yi",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0, -3) + "sciá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC3 + "ta"
    }
    
    // sta / ska / sca 明化形
  } else if (["sta", "ska", "sca"].includes(ruletype)) {
    const anpC = stem.replace(/yú|yó|ú|ó|ǻl|ǻ/g, (m) => {
  return {
    "ú": "í",
    "ó": "ié",
    "yú": "yí",
    "yó": "yá",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0, -1) + "cia";
    const anpC2 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ya",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0, -1) + "cia";
const anpC3 = stem2.replace(/yui|yo|ui|o|ål|å/g, (m) => {
  return {
    "ui": "i",
    "o": "ie",
    "yui": "yi",
    "yo": "ya",
    "ǻ": "ay",
    "ǻl": "aly"
  }[m];
}).slice(0, -1) + "ciá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "ui",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1),
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC3 + "ta"
    }
  }
}
