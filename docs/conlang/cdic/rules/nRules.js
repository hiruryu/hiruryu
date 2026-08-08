// 名象
function getConjN(word, stem, long_stem, stem2, stem3, type, ruletype, baseOverrides) {
  if (ruletype === "not") {
    return { ansC: word };
    // k / g / f / v/ s / z / c / sh / zh / ch / xh / r / rh / l 基本形
  } else if (["k", "g", "f", "v", "s", "z", "c", "x", "sh", "zh", "ch", "xh", "rh", "pq"].includes(ruletype)) {
    const anpC = stem + "ra";
    const anpC2 = stem2 + "ra";
    const g_ansC = stem + "i";
    const l_ansC = stem + "am";
    const g_anpC = anpC.slice(0, -1) + "i";
    const l_anpC = anpC.slice(0, -1) + "am";

    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "raf",
      e_ansC: stem + "ak",
      d_ansC: stem + "es",
      l_ansC,
      i_ansC: stem + "hais",
      g_ansC,
      p_ansC: [g_ansC, l_ansC],
      v_ansC: stem2 + "árh",
      in_ansC: stem + "ita",
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + "af",
      e_anpC: anpC.slice(0, -1) + "ak",
      d_anpC: anpC.slice(0, -1) + "es",
      l_anpC,
      i_anpC: anpC.slice(0, -1) + "ais",
      g_anpC,
      p_anpC: [g_anpC, l_anpC],
      v_anpC: anpC2.slice(0, -1) + "árh",
      in_anpC: anpC2.slice(0, -1) + "áta",
      // 重畳形
      l: long_stem,
    }
  
  }
}
