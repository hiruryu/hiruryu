// 名象
function getConjNRaw(word, stem, long_stem, stem2, stem3, type, ruletype, baseOverrides) {

  // 屈折接辞
  // 基本形
  // a 型
  f_fx = "af";
  e_fx = "ak";
  d_fx = "es";
  l_fx = "am";
  i_fx = "ash";
  g_fx = "y";
  v_fx = "árh";
  in_fx = g_fx + "ta";
  anpC = stem + "ra";
  anpC2 = stem2 + "ra";
  anpCn = stem + "hra";
  anpCn2 = stem2 + "hra";
  anpCnn = stem + "da";
  anpCnn2 = stem2 + "da";
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
  anpCnno = stem + "da";
  anpCnno2 = stem2 + "da";
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


  // baseOverrides: 複数形の基底を差し替えるよ
  // Cdic.json に "baseOverrides": {"anpC": "..."} と書くと、
  // anpC から作られる格形（f/e/d/l/i/g/in_anpC）も
  // 差し替えた基底から作り直されるよ。
  // "anpC" はどの ruletype でも複数形の基底全体に効くよ。
  // 細かく分けたいときは anpC2 / anpCl / anpCn / anpCnn / anpCq / anpCo / anpCw
  // （とそれぞれの 2 系）を指定すると、そちらが優先されるよ。
  // "ansC" は単数形の表示だけを変えるよ。
  // 旧システムの adsC / adpC は今の nRules にはないよ。
  if (baseOverrides) {
    if (baseOverrides.anpC != null) {
      anpC = baseOverrides.anpC;
      anpC2 = baseOverrides.anpC;
      anpCl = baseOverrides.anpC;
      anpCl2 = baseOverrides.anpC;
      anpCn = baseOverrides.anpC;
      anpCn2 = baseOverrides.anpC;
      anpCnn = baseOverrides.anpC;
      anpCnn2 = baseOverrides.anpC;
      anpCq = baseOverrides.anpC;
      anpCq2 = baseOverrides.anpC;
      anpCo = baseOverrides.anpC;
      anpCo2 = baseOverrides.anpC;
      anpCw = baseOverrides.anpC;
      anpCw2 = baseOverrides.anpC;
    }
    if (baseOverrides.anpC2 != null) {
      anpC2 = baseOverrides.anpC2;
      anpCl2 = baseOverrides.anpC2;
      anpCn2 = baseOverrides.anpC2;
      anpCnn2 = baseOverrides.anpC2;
      anpCq2 = baseOverrides.anpC2;
      anpCo2 = baseOverrides.anpC2;
      anpCw2 = baseOverrides.anpC2;
    }
    if (baseOverrides.anpCl != null) anpCl = baseOverrides.anpCl;
    if (baseOverrides.anpCl2 != null) anpCl2 = baseOverrides.anpCl2;
    if (baseOverrides.anpCn != null) anpCn = baseOverrides.anpCn;
    if (baseOverrides.anpCn2 != null) anpCn2 = baseOverrides.anpCn2;
    if (baseOverrides.anpCnn != null) anpCnn = baseOverrides.anpCnn;
    if (baseOverrides.anpCnn2 != null) anpCnn2 = baseOverrides.anpCnn2;
    if (baseOverrides.anpCq != null) anpCq = baseOverrides.anpCq;
    if (baseOverrides.anpCq2 != null) anpCq2 = baseOverrides.anpCq2;
    if (baseOverrides.anpCo != null) anpCo = baseOverrides.anpCo;
    if (baseOverrides.anpCo2 != null) anpCo2 = baseOverrides.anpCo2;
    if (baseOverrides.anpCw != null) anpCw = baseOverrides.anpCw;
    if (baseOverrides.anpCw2 != null) anpCw2 = baseOverrides.anpCw2;
  }
  const ansCBase = (baseOverrides && baseOverrides.ansC != null) ? baseOverrides.ansC : word;
  // baseOverrides.anpC があるとき、呼格複数形も差し替えた基底から作るよ。
  // m/n/q系・lo・á/ó型の v_anpC は stem2 から直接作られるため、ここで上書きするよ。
  // v_ansC は単数形なので対象外だよ。w型の v_anpC は "órh" を使うため、ここでは触らないよ。
  // anpC2 が指定されていればそちらを優先するよ。
  const vAnpCFromBase = (baseOverrides && (baseOverrides.anpC != null || baseOverrides.anpC2 != null))
    ? (baseOverrides.anpC2 != null ? baseOverrides.anpC2 : baseOverrides.anpC).slice(0, -1) + v_fx
    : null;

  // 母音の置き換え
  stemVi = (stem ?? "").replace(/[áéóúö́ë́]/g, '$&i');
  stem2Vi = (stem2 ?? "").replace(/[aeouöë]/g, '$&i');

  // stem1
  stemui = (stem ?? "").replace(/[óú]/g, 'í');
  stemoö = (stem ?? "").replace('ó', 'ö́');
  stemeë = (stem ?? "").replace('é', 'ë́');

  // stem2
  stem2ua = (stem2 ?? "").replace(/[ou]/g, 'a');
  stem2ui = (stem2 ?? "").replace(/[ou]/g, 'i');
  stem2oö = (stem2 ?? "").replace('o', 'ö');
  stem2eë = (stem2 ?? "").replace('e', 'ë');
  stem2jui = (stem2 ?? "").replace(/^[j][uo]/, 'i');
  stem2q = (stem2 ?? "").replace(/^[mnq][iu]/, 'ũ');

  function uniqueForms(...forms) {
    const filtered = [...new Set(forms.filter(form => !/jí|ji|ii|íi|iúi|iui/.test(form)))];
    return filtered.length ? filtered : [forms[0]];
  }

  if (ruletype === "not") {
    return { ansC: ansCBase };
  }
  // k / g / f / v/ s / z / c / sh / zh / c / xh 基本形
  if (["p", "b", "t", "d", "k", "g", "f", "v", "s", "z", "c", "x", "sh", "zh", "ch", "xh", "h", "pq", "r"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
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
      in_anpC: anpC.slice(0, -1) + in_fx,
    }
    // k / g / f / v/ s / z / c / sh / zh / cn / xh 明音形
  } else if (["pj", "bj", "tj", "dj", "kj", "gj", "fj", "vj", "sj", "zj", "cj", "xj", "shj", "zhj", "chj", "xhj", "hj", "rj", "rhj", "j"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
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
      in_anpC: anpC.slice(0, -1) + in_fx,
    }

    // l 基本形
  } else if (["l", "rh"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
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
      in_anpC: anpCl.slice(0, -1) + in_fx,
    }

    // l 明音形
  } else if (["lj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
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
      in_anpC: anpCl.slice(0, -1) + in_fx,
    }

    // m 基本形
  } else if (["m"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,

      v_ansC: uniqueForms(
        stem2ua + v_fx,
      ).join("<br>"),

      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,

      v_anpC: vAnpCFromBase ?? uniqueForms(
        stem2ua + "hr" + v_fx,
      ).join("<br>"),

      in_anpC: anpCn.slice(0, -1) + in_fx,
    }
    // m 明音形
  } else if (["mj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,

      v_ansC: uniqueForms(
        stem2Vi + v_fx,
        stem2ui + v_fx,
        stem2oö + v_fx,
        stem2jui + v_fx,
      ).join("<br>"),

      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,

      v_anpC: vAnpCFromBase ?? uniqueForms(
        stem2Vi + "hr" + v_fx,
        stem2ui + "hr" + v_fx,
        stem2oö + "hr" + v_fx,
        stem2jui + "hr" + v_fx,
      ).join("<br>"),

      in_anpC: anpCn.slice(0, -1) + in_fx,
    }
    // n 基本形
  } else if (["n"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: uniqueForms(
        stem2ua + v_fx,
      ).join("<br>"),
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCnn,
      f_anpC: anpCnn.slice(0, -1) + f_fx,
      e_anpC: anpCnn.slice(0, -1) + e_fx,
      d_anpC: anpCnn.slice(0, -1) + d_fx,
      l_anpC: anpCnn.slice(0, -1) + l_fx,
      i_anpC: anpCnn.slice(0, -1) + i_fx,
      g_anpC: anpCnn.slice(0, -1) + g_fx,
      v_anpC: anpCnn2.slice(0, -1) + v_fx,
      v_anpC: vAnpCFromBase ?? uniqueForms(
        stem2ua + "d" + v_fx,
      ).join("<br>"),
      in_anpC: anpCnn.slice(0, -1) + in_fx,
    }
    // n 明音形
  } else if (["nj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: uniqueForms(
        stem2Vi + v_fx,
        stem2ui + v_fx,
        stem2oö + v_fx,
        stem2jui + v_fx,
      ).join("<br>"),
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCn,
      f_anpC: anpCn.slice(0, -1) + f_fx,
      e_anpC: anpCn.slice(0, -1) + e_fx,
      d_anpC: anpCn.slice(0, -1) + d_fx,
      l_anpC: anpCn.slice(0, -1) + l_fx,
      i_anpC: anpCn.slice(0, -1) + i_fx,
      g_anpC: anpCn.slice(0, -1) + g_fx,
      v_anpC: vAnpCFromBase ?? uniqueForms(
        stem2Vi + "d" + v_fx,
        stem2ui + "d" + v_fx,
        stem2oö + "d" + v_fx,
        stem2jui + "d" + v_fx,
      ).join("<br>"),
      in_anpC: anpCn.slice(0, -1) + in_fx,
    }

    // q 基本形
  } else if (["q"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: uniqueForms(
        stem2ua + v_fx,
      ).join("<br>"),
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
      in_anpC: anpCq.slice(0, -1) + in_fx,
    }
    // q 明音形
  } else if (["qj"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: uniqueForms(
        stem2Vi + v_fx,
        stem2ui + v_fx,
        stem2oö + v_fx,
        stem2jui + v_fx,
      ).join("<br>"),
      in_ansC: stem + in_fx,
      // 複数形
      anpC: anpCq,
      f_anpC: anpCq.slice(0, -1) + f_fx,
      e_anpC: anpCq.slice(0, -1) + e_fx,
      d_anpC: anpCq.slice(0, -1) + d_fx,
      l_anpC: anpCq.slice(0, -1) + l_fx,
      i_anpC: anpCq.slice(0, -1) + i_fx,
      g_anpC: anpCq.slice(0, -1) + g_fx,
      v_anpC: vAnpCFromBase ?? uniqueForms(
        stem2Vi + "hr" + v_fx,
        stem2ui + "hr" + v_fx,
        stem2oö + "hr" + v_fx,
        stem2jui + "hr" + v_fx,
      ).join("<br>"),
      in_anpC: anpCq.slice(0, -1) + in_fx,
    }

    // a 尾高形
  } else if (["á"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + "á" + f_fx.slice(1, 2),
      e_ansC: stem + "á" + e_fx.slice(1, 2),
      d_ansC: stem + "á" + d_fx.slice(1, 2),
      l_ansC: stem + "á" + l_fx.slice(1, 2),
      i_ansC: stem + "á" + i_fx.slice(1, 2),
      g_ansC: stem + "áj" + g_fx,
      v_ansC: stem + "á" + v_fx.slice(1, 3),
      in_ansC: stem + "á" + in_fx.slice(1, 6),
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + f_fx,
      e_anpC: anpC2.slice(0, -1) + e_fx,
      d_anpC: anpC2.slice(0, -1) + d_fx,
      l_anpC: anpC2.slice(0, -1) + l_fx,
      i_anpC: anpC2.slice(0, -1) + i_fx,
      g_anpC: anpC2.slice(0, -1) + g_fx,
      v_anpC: vAnpCFromBase ?? stem2.slice(0, -1) + "ar" + v_fx,
      in_anpC: anpC2.slice(0, -1) + in_fx,
    }

    // o 尾高形
  } else if (["ó"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + "ó" + f_fx.slice(1, 2),
      e_ansC: stem + "ó" + e_fx.slice(1, 2),
      d_ansC: stem + "ó" + d_fx.slice(1, 2),
      l_ansC: stem + "ó" + l_fx.slice(1, 2),
      i_ansC: stem + "ó" + i_fx.slice(1, 2),
      g_ansC: stem + "ój" + g_fx,
      v_ansC: stem + "ó" + v_fx.slice(1, 3),
      in_ansC: stem + "ó" + in_fx.slice(1, 6),
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + f_fx,
      e_anpC: anpC2.slice(0, -1) + e_fx,
      d_anpC: anpC2.slice(0, -1) + d_fx,
      l_anpC: anpC2.slice(0, -1) + l_fx,
      i_anpC: anpC2.slice(0, -1) + i_fx,
      g_anpC: anpC2.slice(0, -1) + g_fx,
      v_anpC: vAnpCFromBase ?? stem2.slice(0, -1) + "ar" + v_fx,
      in_anpC: anpC2.slice(0, -1) + in_fx,
    }

    // u 尾高形
  } else if (["ú"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + "ú" + f_fx.slice(1, 2),
      e_ansC: stem + "ú" + e_fx.slice(1, 2),
      d_ansC: stem + "ú" + d_fx.slice(1, 2),
      l_ansC: stem + "ú" + l_fx.slice(1, 2),
      i_ansC: stem + "ú" + i_fx.slice(1, 2),
      g_ansC: stem + "új" + g_fx,
      v_ansC: stem + "ú" + v_fx.slice(1, 3),
      in_ansC: stem + "ú" + in_fx.slice(1, 6),
      // 複数形
      anpC: anpC2,
      f_anpC: anpC2.slice(0, -1) + f_fx,
      e_anpC: anpC2.slice(0, -1) + e_fx,
      d_anpC: anpC2.slice(0, -1) + d_fx,
      l_anpC: anpC2.slice(0, -1) + l_fx,
      i_anpC: anpC2.slice(0, -1) + i_fx,
      g_anpC: anpC2.slice(0, -1) + g_fx,
      v_anpC: vAnpCFromBase ?? stem2.slice(0, -1) + "ar" + v_fx,
      in_anpC: anpC2.slice(0, -1) + in_fx,
    }

    // o 基本形
  } else if (["o", "po", "bo", "to", "do", "ko", "go", "fo", "vo", "so", "zo", "sho", "zho", "co", "xo", "ho", "ro"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fxo,
      e_ansC: stem + e_fxo,
      d_ansC: stem + d_fxo,
      l_ansC: stem + l_fxo,
      i_ansC: stem + i_fxo,
      g_ansC: stem + g_fxo,
      v_ansC: stem2ua + v_fxo,
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
      in_anpC: anpCo.slice(0, -1) + in_fx,
    }

    // lo 基本形
  } else if (["lo"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fxo,
      e_ansC: stem + e_fxo,
      d_ansC: stem + d_fxo,
      l_ansC: stem + l_fxo,
      i_ansC: stem + i_fxo,
      g_ansC: stem + g_fxo,
      v_ansC: stem2ua + v_fxo,
      in_ansC: stem + in_fxo,
      // 複数形
      anpC: anpCl,
      f_anpC: anpCl.slice(0, -1) + f_fx,
      e_anpC: anpCl.slice(0, -1) + e_fx,
      d_anpC: anpCl.slice(0, -1) + d_fx,
      l_anpC: anpCl.slice(0, -1) + l_fx,
      i_anpC: anpCl.slice(0, -1) + i_fx,
      g_anpC: anpCl.slice(0, -1) + g_fx,
      v_anpC: vAnpCFromBase ?? uniqueForms(
        stem2ua + "l" + v_fx,
      ).join("<br>"),
      in_anpC: anpCl.slice(0, -1) + in_fx,
    }

    // ũ 基本形
  } else if (["ũ"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fxũ,
      e_ansC: stem + e_fxũ,
      d_ansC: stem + d_fxũ,
      l_ansC: stem + l_fxũ,
      i_ansC: stem + i_fxũ,
      g_ansC: stem + g_fxũ,
      v_ansC: stem2ua + v_fxũ,
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
      in_anpC: anpCl.slice(0, -1) + in_fx,
    }

  } else if (["w"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
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

    // 代名詞 a 終わり（prona）：単数形は a 型と同じ。呼称形は基格。
  } else if (["prona"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + f_fx,
      e_ansC: stem + e_fx,
      d_ansC: stem + d_fx,
      l_ansC: stem + l_fx,
      i_ansC: stem + i_fx,
      g_ansC: stem + g_fx,
      v_ansC: ansCBase,
      in_ansC: stem + in_fx,
      // 複数形（a 型と同じ）
      anpC: anpC,
      f_anpC: anpC.slice(0, -1) + f_fx,
      e_anpC: anpC.slice(0, -1) + e_fx,
      d_anpC: anpC.slice(0, -1) + d_fx,
      l_anpC: anpC.slice(0, -1) + l_fx,
      i_anpC: anpC.slice(0, -1) + i_fx,
      g_anpC: anpC.slice(0, -1) + g_fx,
      v_anpC: anpC2.slice(0, -1) + v_fx,
      in_anpC: anpC.slice(0, -1) + in_fx,
    }

    // 代名詞 o 終わり（prono）：単数形は a 型に l を挟む。呼称形は基格。
  } else if (["prono"].includes(ruletype)) {
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: stem + "l" + f_fx,
      e_ansC: stem + "l" + e_fx,
      d_ansC: stem + "l" + d_fx,
      l_ansC: stem + "l" + l_fx,
      i_ansC: stem + "l" + i_fx,
      g_ansC: stem + "l" + g_fx,
      v_ansC: ansCBase,
      in_ansC: stem + "l" + in_fx,
      // 複数形（o 型と同じ）
      anpC: anpCo,
      f_anpC: anpCo.slice(0, -1) + f_fx,
      e_anpC: anpCo.slice(0, -1) + e_fx,
      d_anpC: anpCo.slice(0, -1) + d_fx,
      l_anpC: anpCo.slice(0, -1) + l_fx,
      i_anpC: anpCo.slice(0, -1) + i_fx,
      g_anpC: anpCo.slice(0, -1) + g_fx,
      v_anpC: anpCo2.slice(0, -1) + v_fx,
      in_anpC: anpCo.slice(0, -1) + in_fx,
    }

    // 数詞 6 の変則型（ija）：mía。単数形は stem から j を落とした mí＋a 型接辞。複数形は stem2 から j を落とした mi＋ára。
  } else if (["ija"].includes(ruletype)) {
    const sg = (stem ?? "").slice(0, -1);
    const pl = (stem2 ?? "").slice(0, -1) + "ára";
    const gPl = pl.slice(0, -1) + "y";
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: sg + "af",
      e_ansC: sg + "ak",
      d_ansC: sg + "es",
      l_ansC: sg + "am",
      i_ansC: sg + "ash",
      g_ansC: sg + "a",
      v_ansC: sg + "arh",
      in_ansC: sg + "ata",
      // 複数形
      anpC: pl,
      f_anpC: pl + "f",
      e_anpC: pl + "k",
      d_anpC: pl.slice(0, -1) + "íes",
      l_anpC: pl + "m",
      i_anpC: pl + "sh",
      g_anpC: gPl,
      v_anpC: pl + "rh",
      in_anpC: gPl + "ta",
    }

    // 数詞 2 の変則型（ijo）：sío。単数形は stem から j を落とした sí＋o 型接辞。複数形は stem2 から j を落とした si＋óra。
  } else if (["ijo"].includes(ruletype)) {
    const sg = (stem ?? "").slice(0, -1);
    const pl = (stem2 ?? "").slice(0, -1) + "óra";
    const gPl = pl.slice(0, -1) + "y";
    return {
      // 単数形
      ansC: ansCBase,
      f_ansC: sg + "of",
      e_ansC: sg + "ok",
      d_ansC: sg + "ös",
      l_ansC: sg + "om",
      i_ansC: sg + "osh",
      g_ansC: sg + "u",
      v_ansC: sg + "orh",
      in_ansC: sg + "uta",
      // 複数形
      anpC: pl,
      f_anpC: pl + "f",
      e_anpC: pl + "k",
      d_anpC: pl.slice(0, -1) + "íes",
      l_anpC: pl + "m",
      i_anpC: pl + "sh",
      g_anpC: gPl,
      v_anpC: pl + "rh",
      in_anpC: gPl + "ta",
    }

  }
}

// tl·dl → ll の同化（2026-11-13、みゅら確認済）。
// 例：sýto の能格 sýt＋lak → syllak、káto の能格 kát＋lak → kállak。
// 生成形の語幹＋接辞の境界で tl·dl が生じたものを ll にする。
// 辞書の語・stem に tl·dl を含むものはないため、生成形への置換で十分。
// ansC は辞書形そのものなので対象外。
function getConjN(word, stem, long_stem, stem2, stem3, type, ruletype, baseOverrides) {
  const r = getConjNRaw(word, stem, long_stem, stem2, stem3, type, ruletype, baseOverrides);
  if (r == null) return r;
  const out = {};
  for (const [k, v] of Object.entries(r)) {
    out[k] = (k !== "ansC" && typeof v === "string") ? v.replace(/tl/g, "ll").replace(/dl/g, "ll") : v;
  }
  return out;
}
