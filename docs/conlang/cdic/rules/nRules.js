// 名象
function getConjN(word, stem, long_stem, stem2, stem3, type, ruletype, baseOverrides) {

  // 屈折接辞
  // 基本形
  // a 型
  f_fx = "af";
  e_fx = "ak";
  d_fx = "es";
  l_fx = "am";
  i_fx = "ash";
  g_fx = "i";
  v_fx = "árh";
  in_fx = g_fx + "ta";
  anpC = stem + "ra";
  anpC2 = stem2 + "ra";
  anpCn = stem + "hra";
  anpCn2 = stem2 + "hra";
  anpCn = stem + "da";
  anpCn2 = stem2 + "da";
  anpCq = stem + "ga";
  anpCq2 = stem2 + "ga";
  anpCl = stem + "la";
  anpCl2 = stem2 + "la";
  anpCw = stem + "uru";
  anpCw2 = stem2 + "uru";
  
  // o 型
  f_fxo = "of";
  e_fxo = "ok";
  d_fxo = "ös";
  l_fxo = "om";
  i_fxo = "osh";
  g_fxo = "u";
  v_fxo = "órh";
  in_fxo = g_fxo + "ta";
  anpCo = stem + "ra";
  anpCo2 = stem2 + "ra";
  anpCno = stem + "hra";
  anpCno2 = stem2 + "hra";
  anpCno = stem + "da";
  anpCno2 = stem2 + "da";
  anpCqo = stem + "ga";
  anpCq2o = stem2 + "ga";

  // ũ 型
  f_fxũ = "ũf";
  e_fxũ = "ũk";
  d_fxũ = "ũs";
  l_fxũ = "ũm";
  i_fxũ = "ũsh";
  g_fxũ = "ũ";
  v_fxũ = "ũrh";
  in_fxũ = g_fxũ + "ta";

  
  // 母音の置き換え
  stemVi = stem.replace(/[áéóúö́ë́]/g, '$&i');
  stem2Vi = stem2.replace(/[aeouöë]/g, '$&i');

  // stem1
  stemui = stem.replace(/[óú]/g, 'í');
  stemoö = stem.replace('ó', 'ö́');
  stemeë = stem.replace('é', 'ë́');

  // stem2
  stem2ua = stem2.replace('u', 'a');
  stem2ui = stem2.replace(/[ou]/g, 'i');
  stem2oö = stem2.replace('o', 'ö');
  stem2eë = stem2.replace('e', 'ë');
  stem2jui = stem2.replace('ju', 'i');
  stem2joi = stem2.replace('jo', 'i');
  stem2q = stem2.replace(/^[mnq][iu]/, 'ũ');

  function uniqueForms(...forms) {
    return [...new Set(forms)];
  }

  if (ruletype === "not") {
    return { ansC: word };
    // k / g / f / v/ s / z / c / sh / zh / c / xh 基本形
  } else if (["p", "b", "t", "d", "k", "g", "f", "v", "s", "z", "c", "x", "sh", "zh", "ch", "xh", "h", "pq", "r"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + f_fx,
      e_anpC: anpC.slice(0, -1) + e_fx,
      d_anpC: anpC.slice(0, -1) + d_fx,
      l_anpC: anpC.slice(0, -1) + l_fx,
      i_anpC: anpC.slice(0, -1) + i_fx,
      g_anpC: anpC.slice(0, -1) + g_fx,
      v_anpC: anpC2.slice(0, -1) + v_fx,
      in_anpC: anpC2.slice(0, -1) + in_fx,
    }
     // k / g / f / v/ s / z / c / sh / zh / cn / xh 明音形
  } else if (["pj", "bj", "tj", "dj", "kj", "gj", "fj", "vj", "sj", "zj", "cj", "xj", "shj", "zhj", "chj", "xhj", "hj", "rj","rhj", "j"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + f_fx,
      e_anpC: anpC.slice(0, -1) + e_fx,
      d_anpC: anpC.slice(0, -1) + d_fx,
      l_anpC: anpC.slice(0, -1) + l_fx,
      i_anpC: anpC.slice(0, -1) + i_fx,
      g_anpC: anpC.slice(0, -1) + g_fx,
      v_anpC: anpC2.slice(0, -1) + v_fx,
      in_anpC: anpC2.slice(0, -1) + in_fx,
    }

    // l 基本形
  } else if (["l","rh"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCl,
      f_anpC: anpCl.slice(0, -1) + f_fx,
      e_anpC: anpCl.slice(0, -1) + e_fx,
      d_anpC: anpCl.slice(0, -1) + d_fx,
      l_anpC: anpCl.slice(0, -1) + l_fx,
      i_anpC: anpCl.slice(0, -1) + i_fx,
      g_anpC: anpCl.slice(0, -1) + g_fx,
      v_anpC: anpCl2.slice(0, -1) + v_fx,
      in_anpC: anpCl2.slice(0, -1) + in_fx,
    }

    // l 明音形
  } else if (["lj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCl,
      f_anpC: anpCl.slice(0, -1) + f_fx,
      e_anpC: anpCl.slice(0, -1) + e_fx,
      d_anpC: anpCl.slice(0, -1) + d_fx,
      l_anpC: anpCl.slice(0, -1) + l_fx,
      i_anpC: anpCl.slice(0, -1) + i_fx,
      g_anpC: anpCl.slice(0, -1) + g_fx,
      v_anpC: anpCl2.slice(0, -1) + v_fx,
      in_anpC: anpCl2.slice(0, -1) + in_fx,
    }

    // m 基本形
  } else if (["m"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,
      v_anpC: anpCn2.slice(0, -1) + v_fx,
      in_anpC: anpCn2.slice(0, -1) + in_fx,
    }
     // m 明音形
  } else if (["mj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,
      v_anpC: anpCn2.slice(0, -1) + v_fx,
      in_anpC: anpCn2.slice(0, -1) + in_fx,
    }
     // n 基本形
  } else if (["n"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,
      v_anpC: anpCn2.slice(0, -1) + v_fx,
      in_anpC: anpCn2.slice(0, -1) + in_fx,
    }
     // n 明音形
  } else if (["nj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,
      v_anpC: anpCn2.slice(0, -1) + v_fx,
      in_anpC: anpCn2.slice(0, -1) + in_fx,
    }

    // q 基本形
  } else if (["q"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCq,
      f_anpC: anpCq.slice(0, -1) + f_fx,
      e_anpC: anpCq.slice(0, -1) + e_fx,
      d_anpC: anpCq.slice(0, -1) + d_fx,
      l_anpC: anpCq.slice(0, -1) + l_fx,
      i_anpC: anpCq.slice(0, -1) + i_fx,
      g_anpC: anpCq.slice(0, -1) + g_fx,
      v_anpC: anpCq2.slice(0, -1) + v_fx,
      in_anpC: anpCq2.slice(0, -1) + in_fx,
    }
     // q 明音形
  } else if (["qj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: stem2 + v_fx,
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCq,
      f_anpC: anpCq.slice(0, -1) + f_fx,
      e_anpC: anpCq.slice(0, -1) + e_fx,
      d_anpC: anpCq.slice(0, -1) + d_fx,
      l_anpC: anpCq.slice(0, -1) + l_fx,
      i_anpC: anpCq.slice(0, -1) + i_fx,
      g_anpC: anpCq.slice(0, -1) + g_fx,
      v_anpC: anpCq2.slice(0, -1) + v_fx,
      in_anpC: anpCq2.slice(0, -1) + in_fx,
    }

    // a 尾高形
  } else if (["á"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "á"+ f_fx.slice(1, 2),
      e_ansC: stem + "á"+ e_fx.slice(1, 2),
      d_ansC: stem + "á"+ d_fx.slice(1, 2),
      l_ansC: stem + "á"+ l_fx.slice(1, 2),
      i_ansC: stem + "á"+  i_fx.slice(1, 2),
      g_ansC: stem + "áj"+ g_fx,
      v_ansC: stem + "á"+ v_fx.slice(1, 3),
      in_ansC: stem + "á"+ in_fx.slice(1, 6),
      // 複数形
      anpC: stem2 + "ra",
      f_anpC: stem2 + "r" + f_fx,
      e_anpC: stem2 + "r" + e_fx,
      d_anpC: stem2 + "r" + d_fx,
      l_anpC: stem2 + "r" + l_fx,
      i_anpC: stem2 + "r" + i_fx,
      g_anpC: stem2 + "r" + g_fx,
      v_anpC: stem2.slice(0, -1) + "ar" + v_fx,
      in_anpC: stem2 + "r" + in_fx,
    }

    // o 尾高形
  } else if (["ó"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "ó"+ f_fx.slice(1, 2),
      e_ansC: stem + "ó"+ e_fx.slice(1, 2),
      d_ansC: stem + "ó"+ d_fx.slice(1, 2),
      l_ansC: stem + "ó"+ l_fx.slice(1, 2),
      i_ansC: stem + "ó"+  i_fx.slice(1, 2),
      g_ansC: stem + "ój"+ g_fx,
      v_ansC: stem + "ó"+ v_fx.slice(1, 3),
      in_ansC: stem + "ó"+ in_fx.slice(1, 6),
      // 複数形
      anpC: stem2 + "ra",
      f_anpC: stem2 + "r" + f_fx,
      e_anpC: stem2 + "r" + e_fx,
      d_anpC: stem2 + "r" + d_fx,
      l_anpC: stem2 + "r" + l_fx,
      i_anpC: stem2 + "r" + i_fx,
      g_anpC: stem2 + "r" + g_fx,
      v_anpC: stem2.slice(0, -1) + "ar" + v_fx,
      in_anpC: stem2 + "r" + in_fx,
    }

// o 基本形
  } else if (["o","po","bo","to","do","ko","go","fo","vo","so","zo","sho","zho","co","xo","ho","ro"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fxo,
      e_ansC: stem + e_fxo,
      d_ansC: stem + d_fxo,
      l_ansC: stem + l_fxo,
      i_ansC: stem + i_fxo,
      g_ansC: stem + g_fxo,
      v_ansC: stem2 + v_fxo,
      in_ansC: stem + in_fxo,
      // 複数形
      anpC: anpCo,
      f_anpC: anpCo.slice(0, -1) + f_fx,
      e_anpC: anpCo.slice(0, -1) + e_fx,
      d_anpC: anpCo.slice(0, -1) + d_fx,
      l_anpC: anpCo.slice(0, -1) + l_fx,
      i_anpC: anpCo.slice(0, -1) + i_fx,
      g_anpC: anpCo.slice(0, -1) + g_fx,
      v_anpC: anpCo2.slice(0, -1) + v_fx,
      in_anpC: anpCo2.slice(0, -1) + in_fx,
    }

  // lo 基本形
  } else if (["lo"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fxo,
      e_ansC: stem + e_fxo,
      d_ansC: stem + d_fxo,
      l_ansC: stem + l_fxo,
      i_ansC: stem + i_fxo,
      g_ansC: stem + g_fxo,
      v_ansC: stem2 + v_fxo,
      in_ansC: stem + in_fxo,
      // 複数形
      anpC: anpCl,
      f_anpC: anpCl.slice(0, -1) + f_fx,
      e_anpC: anpCl.slice(0, -1) + e_fx,
      d_anpC: anpCl.slice(0, -1) + d_fx,
      l_anpC: anpCl.slice(0, -1) + l_fx,
      i_anpC: anpCl.slice(0, -1) + i_fx,
      g_anpC: anpCl.slice(0, -1) + g_fx,
      v_anpC: anpCl2.slice(0, -1) + v_fx,
      in_anpC: anpCl2.slice(0, -1) + in_fx,
    }

  // ũ 基本形
  } else if (["ũ"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + f_fxũ,
      e_ansC: stem + e_fxũ,
      d_ansC: stem + d_fxũ,
      l_ansC: stem + l_fxũ,
      i_ansC: stem + i_fxũ,
      g_ansC: stem + g_fxũ,
      v_ansC: stem2 + v_fxũ,
      in_ansC: stem + in_fxũ,
      // 複数形
      anpC: anpCl,
      f_anpC: anpCl.slice(0, -1) + f_fx,
      e_anpC: anpCl.slice(0, -1) + e_fx,
      d_anpC: anpCl.slice(0, -1) + d_fx,
      l_anpC: anpCl.slice(0, -1) + l_fx,
      i_anpC: anpCl.slice(0, -1) + i_fx,
      g_anpC: anpCl.slice(0, -1) + g_fx,
      v_anpC: anpCl2.slice(0, -1) + v_fx,
      in_anpC: anpCl2.slice(0, -1) + in_fx,
    }
    
  } else if (["w"].includes(ruletype)) {
    return {
      // 単数形
      ansC: word,
      f_ansC: stem + "uf",
      e_ansC: stem + "uk",
      d_ansC: word,
      l_ansC: stem + "um",
      i_ansC: stem + "ush",
      g_ansC: stem + "ují",
      v_ansC: stem + "urh",
      in_ansC: stem + "uta",
      // 複数形
      anpC: anpCw,
      f_anpC: anpCw.slice(0, -1) + "uf",
      e_anpC: anpCw.slice(0, -1) + "uk",
      d_anpC: anpCw.slice(0, -1) + "is",
      l_anpC: anpCw.slice(0, -1) + "um",
      i_anpC: anpCw.slice(0, -1) + "ush",
      g_anpC: anpCw,
      v_anpC: anpCw2.slice(0, -1) + "órh",
      in_anpC: anpCw + "ta",
    }

  }
}
