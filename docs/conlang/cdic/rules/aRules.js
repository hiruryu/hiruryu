function getConjA(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {

  s = stem + ""; s_2 = stem2 + "";
  s2 = stem2 + "ála";
  s3 = stem2 + "óna";
  p = stem + "r"; p_2 = stem2 + "r";
  p2 = stem2 + "árva";
  p3 = stem2 + "árma";



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

  if (ruletype === "no") {
    return {};

    // 基本形
  } else if (["p", "b", "t", "d", "k", "g", "f", "v", "s", "z", "c", "x", "sh", "zh", "ch", "xh", "h", "m", "n", "q", "r", "rh", "l", "j"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s + "i",
      f_s: s + "ihë",
      d_s: s_2 + "éze",
      e_s: s_2 + "áisi",
      ad_s: s_2 + "éni",
      h_s: s + "las",
      // 単数一致-比較級
      s2: s2,
      f_s2: s_2 + "álih",
      d_s2: s_2 + "ález",
      e_s2: s_2 + "ális",
      ad_s2: s_2 + "álen",
      h_s2: s_2 + "ë́sen",
      // 単数一致-最上級
      s3: s3,
      f_s3: s_2 + "ónih",
      d_s3: s_2  + "ónza",
      e_s3: s_2 + "ónas",
      ad_s3: s_2 + "ónön",
      h_s3: s_2 + "ë́na",
      // 複数一致-原級
      p: p + "a",
      f_p: p + "ihë",
      d_p: p_2 + "éze",
      e_p: p_2 + "áisi",
      ad_p: p_2 + "éni",
      h_p: p + "las",
      // 単数一致-比較級
      p2: p2,
      f_p2: p_2 + "álih",
      d_p2: p_2 + "ález",
      e_p2: p_2 + "ális",
      ad_p2: p_2 + "álen",
      h_p2: p_2 + "ë́sen",
      // 単数一致-最上級
      p3: p3,
      f_p3: p_2 + "ónih",
      d_p3: p_2  + "ónza",
      e_p3: p_2 + "ónas",
      ad_p3: p_2 + "ónön",
      h_p3: p_2 + "ë́na",
    }
    


    // 明音形
  } else if (["pj", "bj", "tj", "dj", "kj", "gj", "fj", "vj", "sj", "zj", "cj", "xj", "shj", "zhj", "chj", "xhj", "hj", "mj", "nj", "qj", "rj", "rhj", "lj", "j"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s + "i",
      f_s: s + "ihë",
      d_s: s_2 + "éze",
      e_s: s_2 + "áisi",
      ad_s: s_2 + "éni",
      h_s: s + "las",
      // 単数一致-比較級
      s2: s2,
      f_s2: s_2 + "álih",
      d_s2: s_2 + "ález",
      e_s2: s_2 + "ális",
      ad_s2: s_2 + "álen",
      h_s2: s_2 + "ë́sen",
      // 単数一致-最上級
      s3: s3,
      f_s3: s_2 + "ónih",
      d_s3: s_2  + "ónza",
      e_s3: s_2 + "ónas",
      ad_s3: s_2 + "ónön",
      h_s3: s_2 + "ë́na",
      // 複数一致-原級
      p: p + "a",
      f_p: p + "ihë",
      d_p: p_2 + "éze",
      e_p: p_2 + "áisi",
      ad_p: p_2 + "éni",
      h_p: p + "las",
      // 単数一致-比較級
      p2: p2,
      f_p2: p_2 + "álih",
      d_p2: p_2 + "ález",
      e_p2: p_2 + "ális",
      ad_p2: p_2 + "álen",
      h_p2: p_2 + "ë́sen",
      // 単数一致-最上級
      p3: p3,
      f_p3: p_2 + "ónih",
      d_p3: p_2  + "ónza",
      e_p3: p_2 + "ónas",
      ad_p3: p_2 + "ónön",
      h_p3: p_2 + "ë́na",
    }
  }
}
