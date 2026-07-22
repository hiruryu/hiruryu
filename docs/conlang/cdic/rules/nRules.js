// 名象
function getConjN(word, stem, _long_stem, stem2, type, ruletype, baseOverrides) {
  const vRules = [
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
    { from: "eunj", to: "ji" },
    { from: "eulj", to: "ji" },
    { from: "euhj", to: "ji" },
    { from: "euqj", to: "ji" },
    { from: "eurhj", to: "ji" },
    { from: "unj", to: "eu" },
    { from: "ulj", to: "eu" },
    { from: "uhj", to: "eu" },
    { from: "uqj", to: "eu" },
    { from: "urhj", to: "eu" }
  ];
  function applyVowelRules(text) {
    let result = text;
    for (const rule of vRules) {
      result = result.replaceAll(rule.from, rule.to);
    }
    return result;
  }

  const C = {
      p: "f", b: "v",
      t: "c", d: "x",
      k: "ch", g: "xh",
      h: "sh", q: "qn",
      y: "zh"
    };
    const V1 = {
      "ó": "ié",
      "ú": "í",
      "jó": "iá",
      "jú": "jí",
      "eú": "í",
      "jeú": "jí",
      "ǻ": "áj",
      "ǻl": "álj"
    };
    const V2 = {
      "jo": "ia",
      "ji": "ji",
      "jeu": "ji",
      "o": "ie",
      "i": "i",
      "eu": "i",
      "å": "aj",
      "ål": "alj"
    };

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
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC.slice(0, -1) + "eurh",
      in_anpC: anpC.slice(0, -1) + "euta",
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
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC.slice(0, -1) + "eurh",
      in_anpC: anpC.slice(0, -1) + "euta",
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
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // u 基本形
  } else if (ruletype === "w") {
    const anpC = stem2 + "úra";
    const anpC2 = stem2 + "eura";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "euf",
      e_ansC: stem + "euk",
      d_ansC: stem + "ues",
      l_ansC: stem + "eum",
      i_ansC: stem + "eush",
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
      g_anpC: anpC.slice(0, -1) + "eu",
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
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
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
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // h 基本形
  } else if (["h"].includes(ruletype)) {
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
      g_ansC: stem.slice(0, -1) + "fheu",
      v_ansC: stem2 + "árh",
      in_ansC: stem.slice(0, -1) + "fhta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // p 基本形
  } else if (["p", "b", "t"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "haf",
      e_ansC: stem + "hak",
      d_ansC: stem + "hes",
      l_ansC: stem + "ham",
      i_ansC: stem + "hash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "hárh",
      in_ansC: stem + "hta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
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
      d_ansC: stem.slice(0, -1) + "xies",
      l_ansC: stem.slice(0, -1) + "xam",
      i_ansC: stem.slice(0, -1) + "xash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem.slice(0, -1) + "xta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // m 基本形
  } else if (["m"].includes(ruletype)) {
    const anpC = stem + "bra";
    const anpC2 = stem2 + "bra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "haf",
      e_ansC: stem + "hak",
      d_ansC: stem + "hies",
      l_ansC: stem + "ham",
      i_ansC: stem + "hash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "hta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
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
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // q 基本形
  } else if (["q"].includes(ruletype)) {
    const anpC = stem + "gra";
    const anpC2 = stem2 + "gra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "naf",
      e_ansC: stem + "nak",
      d_ansC: stem + "nies",
      l_ansC: stem + "nam",
      i_ansC: stem + "nash",
      g_ansC: stem + "neu",
      v_ansC: stem2 + "nárh",
      in_ansC: stem2 + "náta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // y 基本形
  } else if (["j"].includes(ruletype)) {
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
      g_ansC: stem.slice(0, -1) + "zheu",
      v_ansC: stem2 + "árh",
      in_ansC: stem2 + "áta",
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + "af",
      e_anpC: anpC2.slice(0, -1) + "ak",
      d_anpC: anpC2.slice(0, -1) + "es",
      l_anpC: anpC2.slice(0, -1) + "am",
      i_anpC: anpC2.slice(0, -1) + "ash",
      g_anpC: anpC2.slice(0, -1) + "eu",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC3.slice(0, -1) + "áta"
    }


    // o型名詞
    // p / b / t / d / k / g / f / v/ s / z / c / sh / zh / ch / xh / h / r / rh / l / y 基本形
  } else if (["po", "bo", "to", "do", "ko", "go", "fo", "vo", "so", "zo", "co", "xo", "sho", "zho", "cho", "xho", "ho", "mo", "no", "qo", "ro", "rho", "lo", "jo"].includes(ruletype)) {
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
      g_anpC: anpC2.slice(0, -1) + "eu",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC3.slice(0, -1) + "áta"
    }


    // 明音型（〇y）
    // ky / gy / fy / vy / sy / zy / cy / shy / zhy / chy / xhy / ry 基本形
  } else if (["kj", "gj", "fj", "vj", "sj", "zj", "cj", "xj", "shj", "zhj", "chj", "xhj", "hj", "rj", "rhj", "lj"].includes(ruletype)) {
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
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // py 基本形
  } else if (["pj", "bj", "th"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "hyaf",
      e_ansC: stem.slice(0, -1) + "hyak",
      d_ansC: stem.slice(0, -1) + "hyes",
      l_ansC: stem.slice(0, -1) + "hyam",
      i_ansC: stem.slice(0, -1) + "hyash",
      g_ansC: stem.slice(0, -1) + "hyi",
      v_ansC: stem2.slice(0, -1) + "hyárh",
      in_ansC: stem.slice(0, -1) + "hyita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }

    // dy 基本形
  } else if (["dj"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -2) + "xyaf",
      e_ansC: stem.slice(0, -2) + "xyak",
      d_ansC: stem.slice(0, -2) + "xyes",
      l_ansC: stem.slice(0, -2) + "xyam",
      i_ansC: stem.slice(0, -2) + "xyash",
      g_ansC: stem.slice(0, -2) + "xyi",
      v_ansC: stem2.slice(0, -2) + "xyárh",
      in_ansC: stem2.slice(0, -2) + "xyita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // my 基本形
  } else if (["mj"].includes(ruletype)) {
    const anpC = stem.slice(0, -1) + "bia";
    const anpC2 = stem2.slice(0, -1) + "bia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "hyaf",
      e_ansC: stem.slice(0, -1) + "hyak",
      d_ansC: stem.slice(0, -1) + "hyes",
      l_ansC: stem.slice(0, -1) + "hyam",
      i_ansC: stem.slice(0, -1) + "hyash",
      g_ansC: stem.slice(0, -1) + "hyi",
      v_ansC: stem2.slice(0, -1) + "hyárh",
      in_ansC: stem.slice(0, -1) + "hyita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // ny 基本形
  } else if (["nj"].includes(ruletype)) {
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
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
    }
    // qy 基本形
  } else if (["qj"].includes(ruletype)) {
    const anpC = stem.slice(0, -1) + "gia";
    const anpC2 = stem2.slice(0, -1) + "gia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem.slice(0, -1) + "nyaf",
      e_ansC: stem.slice(0, -1) + "nyak",
      d_ansC: stem.slice(0, -1) + "nyes",
      l_ansC: stem.slice(0, -1) + "nyam",
      i_ansC: stem.slice(0, -1) + "nyash",
      g_ansC: stem.slice(0, -1) + "nyeu",
      v_ansC: stem2.slice(0, -1) + "nyárh",
      in_ansC: stem2.slice(0, -1) + "nyáta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta"
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
      g_anpC: anpC2.slice(0, -1) + "eu",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "euta"
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
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC: anpC.slice(0, -1) + "am",
      i_anpC: anpC.slice(0, -1) + "ash",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC.slice(0, -1) + "euta"
    }

    // 代名詞型
    // myigo, vliego,mpyigo
  } else if (["myigo", "vliego", "kyigo", "pyigo"].includes(ruletype)) {
    const anpC = stem.slice(0, -2) + "ig";
    const anpC2 = stem2.slice(0, -3) + "or";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "raf",
      e_ansC: stem + "rak",
      d_ansC: stem + "res",
      l_ansC: stem + "ram",
      i_ansC: stem + "rash",
      g_ansC: stem + "leu",
      v_ansC: anpC + "rárh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "eu",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "euta"
    }
    //
  } else if (["lyiko", "fyiko", "tyiko"].includes(ruletype)) {
    const anpC = stem.slice(0, -2) + "ic";
    const anpC2 = stem2.slice(0, -3) + "or";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "leu",
      v_ansC: anpC + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "eu",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "euta"
    }
    // syiga
  } else if (["syiga"].includes(ruletype)) {
    const anpC = stem.slice(0, -2) + "ig";
    const anpC2 = stem2.slice(0, -3) + "ar";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "raf",
      e_ansC: stem + "rak",
      d_ansC: stem + "res",
      l_ansC: stem + "ram",
      i_ansC: stem + "rash",
      g_ansC: stem + "leu",
      v_ansC: anpC + "rárh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "eu",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "euta"
    }
    // pyika
  } else if (["pyika"].includes(ruletype)) {
    const anpC = stem.slice(0, -2) + "ic";
    const anpC2 = stem2.slice(0, -3) + "ar";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "leu",
      v_ansC: anpC + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: stem2,
      f_anpC: stem2 + "f",
      e_anpC: stem2 + "k",
      d_anpC: stem2.slice(0, -1) + "es",
      l_anpC: stem2 + "m",
      i_anpC: stem2 + "sh",
      g_anpC: stem2.slice(0, -1) + "eu",
      v_anpC: anpC2 + "árh",
      in_anpC: stem2.slice(0, -1) + "euta"
    }



    // ia 基本形
  } else if (["l", "cia", "xia", "fia", "via", "sia", "zia", "shia", "zhia", "chia", "xhia", "nia"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "ia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) + "ia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "dia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "dia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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

    // p-ph 交替形
  } else if (["pia", "bia", "tia", "mia"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "hia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) + "hia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "haf",
      e_ansC: stem + "hak",
      d_ansC: stem + "hies",
      l_ansC: stem + "ham",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "hárh",
      in_ansC: stem + "hta",
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

    // q 交替形
  } else if (["qia"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "nia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) + "nia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "naf",
      e_ansC: stem + "nak",
      d_ansC: stem + "nies",
      l_ansC: stem + "nam",
      i_ansC: stem + "nash",
      g_ansC: stem + "neu",
      v_ansC: stem2 + "nárh",
      in_ansC: stem2 + "náta",
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
  } else if (["jia"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-1) + "zhia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-1) + "zhia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "chia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "chia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "xhia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "xhia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "xia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "xia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "shia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "shia";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "euta",
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
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -2) + "gra";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "da";
    const anpC3 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "ra";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: anpC2.slice(0, -1) + "árh",
      in_ansC: stem + "euta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC + "f",
      e_anpC: anpC + "k",
      d_anpC: anpC + "s",
      l_anpC: anpC + "m",
      i_anpC: anpC + "sh",
      g_anpC: anpC.slice(0, -1) + "eu",
      v_anpC: anpC3.slice(0, -1) + "árh",
      in_anpC: anpC3.slice(0, -1) + "áta"
    }

    // 明化形
  } else if (["ia", "i"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "j";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) + "j";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "i";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "ie",
      l_ansC: stem + "ũ",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC3 + "fj",
      e_anpC: anpC3 + "kj",
      d_anpC: anpC3 + "sj",
      l_anpC: anpC3 + "mj",
      i_anpC: anpC3 + "shj",
      g_anpC: anpC3,
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC3 + "ta"
    }

    // p 明化形
  } else if (["pi", "bi", "ti", "mi"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "hj";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) + "h";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "h";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "h",
      e_ansC: stem + "h",
      d_ansC: stem + "hie",
      l_ansC: stem + "ũ",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "hta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC3 + "fa",
      e_anpC: anpC3 + "ka",
      d_anpC: anpC3 + "sa",
      l_anpC: anpC3 + "ma",
      i_anpC: anpC3 + "sha",
      g_anpC: anpC3 + "eu",
      v_anpC: anpC2 + "árh",
      in_anpC: anpC3 + "ta"
    }

    // k 明化形
  } else if (["ki"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "j";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) + "j";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) + "i";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "h",
      e_ansC: stem + "h",
      d_ansC: stem.slice(0, -1) + "chie",
      l_ansC: stem + "ũ",
      i_ansC: stem + "sh",
      g_ansC: stem + "eu",
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ta",
      // 複数形
      anpC: anpC,
      f_anpC: anpC3 + "fj",
      e_anpC: anpC3 + "kj",
      d_anpC: anpC3 + "sj",
      l_anpC: anpC3 + "mj",
      i_anpC: anpC3 + "shj",
      g_anpC: anpC3,
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC3 + "ta"
    }


    // ttsa 明化形
  } else if (["tts"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -3) + "scia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) .slice(0, -3) + "scia";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) .slice(0, -3) + "sciá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
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

    // sta / sca 明化形
  } else if (["sta", "sca"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "cia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) .slice(0, -1) + "cia";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) .slice(0, -1) + "ciá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
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
    // ska 明化形
  } else if (["ska"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "chia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) .slice(0, -1) + "chia";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) .slice(0, -1) + "chiá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
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
    // zda zxa 明化形
  } else if (["zda", "zxa"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "xia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) .slice(0, -1) + "xia";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) .slice(0, -1) + "xiá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
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
    // zda zxa 明化形
  } else if (["zga"].includes(ruletype)) {
    const anpC = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "xhia";
    const anpC2 = stem2.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyeu|byeu|tyeu|dyeu|kyeu|gyeu|hyeu|peu|beu|teu|deu|keu|geu|heu|yeu|yo|eu|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ) .slice(0, -1) + "xhia";
    const anpC3 = stem.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yeú|eú|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ) .slice(0, -1) + "xhiá";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "af",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC: stem + "am",
      i_ansC: stem + "ash",
      g_ansC: stem + "eu",
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
