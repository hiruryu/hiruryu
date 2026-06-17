function getConjV(_word, stem, _long_stem, stem2, _type, ruletype, baseOverrides) {
  if (ruletype === "no") {
    return {};
    // t / d / k / g / s / z / c / h 基本形
  } else if (["t", "d", "k", "g", "s", "z", "c", "x", "h"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2 + "ris",
      dp: stem2 + "rol",
      df: stem2 + "rip",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // p / b / f / v 基本形（唇音）
  } else if (["p", "b", "f", "v"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "ík",
      // 完了相
      dn: stem2 + "ris",
      dp: stem2 + "rol",
      df: stem2 + "rip",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // sh / zh / ch / xh 基本形（反舌音）
  } else if (["sh", "zh", "ch", "xh", "rh"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2 + "ris",
      dp: stem2 + "rol",
      df: stem2 + "rip",
      // 進行相
      sn: stem2 + "es",
      sp: stem + "élle",
      sf: stem + "ésfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // m 基本形
  } else if (["m"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "ík",
      // 完了相
      dn: stem2 + "bis",
      dp: stem2 + "bol",
      df: stem2 + "bik",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // n 基本形
  } else if (["n"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2 + "dis",
      dp: stem2 + "dol",
      df: stem2 + "dip",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // q 基本形
  } else if (["q"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2 + "gis",
      dp: stem2 + "gol",
      df: stem2 + "gip",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // r / rh / l 基本形（流音）
  } else if (["r", "rh", "l"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2.slice(0,-1) + "ddis",
      dp: stem2.slice(0,-1) + "ddol",
      df: stem2.slice(0,-1) + "ddip",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // y 基本形
  } else if (["y", "rhy"].includes(ruletype)) {
    const d = stem2.slice(0,-1) + "i";

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: d + "dis",
      dp: d + "dol",
      df: d + "dip",
      // 進行相
      sn: d + "s",
     sp: d + "lle",
      sf: d + "sfe",
      // 反復相,
      mn: d + "m",
      mp: d + "mol",
      mf: d + "mik",
    }


    
    // 明音型
    // ty / dy / ky / gy / sy / zy / cy / xy / shy / zhy / chy / xhy / hy 基本形
  } else if (["ty", "dy", "ky", "gy", "sy", "zy", "cy", "xy", "shy", "zhy", "chy", "xhy", "hy"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2 + "ris",
      dp: stem2 + "rol",
      df: stem2 + "rip",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // py / by / fy / vy 基本形（唇音）
  } else if (["py", "by", "fy", "vy"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "ík",
      // 完了相
      dn: stem2.slice(0,-1) + "ries",
      dp: stem2.slice(0,-1) + "riol",
      df: stem2.slice(0,-1) + "riep",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // my 基本形
  } else if (["my"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "ík",
      // 完了相
      dn: stem2.slice(0,-1) + "bies",
      dp: stem2.slice(0,-1) + "biol",
      df: stem2.slice(0,-1) + "biek",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // ny 基本形
  } else if (["ny"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2.slice(0,-1) + "dies",
      dp: stem2.slice(0,-1) + "diol",
      df: stem2.slice(0,-1) + "diep",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // qy 基本形
  } else if (["qy"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2.slice(0,-1) + "gies",
      dp: stem2.slice(0,-1) + "giol",
      df: stem2.slice(0,-1)+ "giep",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
    // ry / rhy / ly 基本形（流音）
  } else if (["ry", "ly"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem2.slice(0,-2) + "ddies",
      dp: stem2.slice(0,-2) + "ddiol",
      df: stem2.slice(0,-2) + "ddiep",
      // 進行相
      sn: stem2 + "is",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }


    // 母音終了型
    // o 基本形（ po, bo, fo, vo, mo ）
  } else if (["po"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem.slice(0,-1) + "ól",
      f: stem.slice(0,-1) + "ík",
      // 完了相
      dn: stem2 + "dis",
      dp: stem2 + "dol",
      df: stem2 + "dip",
      // 進行相
      sn: stem2 + "is",
     sp: stem.slice(0,-1) + "ílle",
      sf: stem.slice(0,-1) + "ísfe",
      // 反復相,
      mn: stem2 + "m",
      mp: stem2 + "mol",
      mf: stem2 + "mik",
    }
    // o 基本形（ それ以外 ）
  } else if (["o"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem.slice(0,-1) + "ól",
      f: stem.slice(0,-1) + "íp",
     // 完了相
      dn: stem2 + "dis",
      dp: stem2 + "dol",
      df: stem2 + "dip",
      // 進行相
      sn: stem2 + "is",
     sp: stem.slice(0,-1) + "ílle",
      sf: stem.slice(0,-1) + "ísfe",
      // 反復相,
      mn: stem2 + "m",
      mp: stem2 + "mol",
      mf: stem2 + "mik",
    }

    // t / d / k / g / s / z / c / h 基本形
  } else if (["na"].includes(ruletype)) {
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: stem + "íp",
      // 完了相
      dn: stem + "áris",
      dp: stem + "árol",
      df: stem + "árip",
      // 進行相
      sn: stem + "áis",
     sp: stem + "ílle",
      sf: stem + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: stem2 + "uimik",
    }
  }
}
