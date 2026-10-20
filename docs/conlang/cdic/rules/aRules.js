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
    return [...new Set(forms.filter(form => !/ji|ii|íi/.test(form)))];
  }

  if (ruletype === "no") {
    return {};

    // p / b 基本形
  } else if (["p", "b", "k", "g", "m", "q"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "hlas",
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }


    // p / b 明音形
  } else if (["pj", "bj", "kj", "gj", "mj", "qj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "hlas",
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // f 基本形
  } else if (["f", "v", "sh", "zh", "ch", "xh", "h", "rh"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "las",
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }


    // f / v 明音形
  } else if (["fj", "vj", "shj", "zhj", "chj", "xhj", "hj", "rhj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "hlas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // t / d 基本形
  } else if (["t", "d"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "hlas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }


    // t / d 明音形
  } else if (["tj", "dj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "hlas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // s 基本形
  } else if (["s", "sj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "sas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }


    // z
  } else if (["z", "zj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "zas", // -zzas
        s + "jas", // -zjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // c 基本形
  } else if (["c", "cj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "cas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }


    // x
  } else if (["x", "xj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "xas", // -zzas
        s + "jas", // -zjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // n 基本形
  } else if (["n", "nj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "nas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // L
  } else if (["r", "l", "rj", "lj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "las", // fádhlas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "ë́sen",
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "ë́na",
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),

    }

    // j
  } else if (["j"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(
        s_2 + "íhë",
        stem2Vi + "íhë",
        stem2ui + "íhë",
        stem2oö + "íhë",
        stem2jui + "íhë",
        stem2joi + "íhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "éze",
        stem2Vi + "éze",
        stem2ui + "éze",
        stem2oö + "éze",
        stem2jui + "éze",
        stem2joi + "éze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "áisi",
        stem2ua + "áisi",
        stem2eë + "áisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "éni",
        stem2Vi + "éni",
        stem2ui + "éni",
        stem2oö + "éni",
        stem2jui + "éni",
        stem2joi + "éni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "áli",
        stem2ua + "áli",
        stem2eë + "áli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "ález",
        stem2ua + "ález",
        stem2eë + "ález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "ális",
        stem2ua + "ális",
        stem2eë + "ális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "álen",
        stem2ua + "álen",
        stem2eë + "álen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2ui + "ë́sen",
        stem2oö + "ë́sen",
        stem2jui + "ë́sen",
        stem2joi + "ë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "óni",
        stem2ua + "óni",
        stem2eë + "óni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "ónza",
        stem2ua + "ónza",
        stem2eë + "ónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "ónas",
        stem2ua + "ónas",
        stem2eë + "ónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "ónön",
        stem2ua + "ónön",
        stem2eë + "ónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2ui + "ë́na",
        stem2oö + "ë́na",
        stem2jui + "ë́na",
        stem2joi + "ë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

    // 母音終了
  } else if (["a", "e", "i", "o", "u", "ui"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "jí",

      f_s: uniqueForms(
        s_2 + "jíhë",
        stem2ui + "jíhë",
        stem2oö + "jíhë",
        stem2jui + "jíhë",
        stem2joi + "jíhë",
      ).join("<br>"),

      d_s: uniqueForms(
        s_2 + "jéze",
        stem2ui + "jéze",
        stem2oö + "jéze",
        stem2jui + "jéze",
        stem2joi + "jéze",
      ).join("<br>"),

      e_s: uniqueForms(
        s_2 + "jáisi",
        stem2ua + "jáisi",
        stem2eë + "jáisi",
      ).join("<br>"),

      ad_s: uniqueForms(
        s_2 + "jéni",
        stem2Vi + "jéni",
        stem2ui + "jéni",
        stem2oö + "jéni",
        stem2jui + "jéni",
        stem2joi + "jéni",
      ).join("<br>"),

      h_s: uniqueForms(
        s + "las", // dólas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(
        s_2 + "jáli",
        stem2ua + "jáli",
        stem2eë + "jáli",
      ).join("<br>"),

      d_s2: uniqueForms(
        s_2 + "jález",
        stem2ua + "jález",
        stem2eë + "jález",
      ).join("<br>"),

      e_s2: uniqueForms(
        s_2 + "jális",
        stem2ua + "jális",
        stem2eë + "jális",
      ).join("<br>"),

      ad_s2: uniqueForms(
        s_2 + "jálen",
        stem2ua + "jálen",
        stem2eë + "jálen",
      ).join("<br>"),

      h_s2: uniqueForms(
        stem2Vi + "jë́sen",
        stem2ui + "jë́sen",
        stem2oö + "jë́sen",
        stem2jui + "jë́sen",
        stem2joi + "jë́sen",
      ).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(
        s_2 + "jóni",
        stem2ua + "jóni",
        stem2eë + "jóni",
      ).join("<br>"),

      d_s3: uniqueForms(
        s_2 + "jónza",
        stem2ua + "jónza",
        stem2eë + "jónza",
      ).join("<br>"),

      e_s3: uniqueForms(
        s_2 + "jónas",
        stem2ua + "jónas",
        stem2eë + "jónas",
      ).join("<br>"),

      ad_s3: uniqueForms(
        s_2 + "jónön",
        stem2ua + "jónön",
        stem2eë + "jónön",
      ).join("<br>"),

      h_s3: uniqueForms(
        stem2Vi + "jë́na",
        stem2ui + "jë́na",
        stem2oö + "jë́na",
        stem2jui + "jë́na",
        stem2joi + "jë́na",
      ).join("<br>"),


      // 複数一致-原級
      p: p_2 + "á",

      f_p: uniqueForms(
        p_2 + "íhë",
        stem2Vi + "ríhë",
        stem2ui + "ríhë",
        stem2oö + "ríhë",
        stem2jui + "ríhë",
        stem2joi + "ríhë",
      ).join("<br>"),

      d_p: uniqueForms(
        p_2 + "éze",
        stem2Vi + "réze",
        stem2ui + "réze",
        stem2oö + "réze",
        stem2jui + "réze",
        stem2joi + "réze",
      ).join("<br>"),

      e_p: uniqueForms(
        p_2 + "áisi",
        stem2ua + "ráisi",
        stem2eë + "ráisi",
      ).join("<br>"),

      ad_p: uniqueForms(
        p_2 + "éni",
        stem2Vi + "réni",
        stem2ui + "réni",
        stem2oö + "réni",
        stem2jui + "réni",
        stem2joi + "réni",
      ).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(
        p_2 + "áli",
        stem2ua + "ráli",
        stem2eë + "ráli",
      ).join("<br>"),

      d_p2: uniqueForms(
        p_2 + "ález",
        stem2ua + "rález",
        stem2eë + "rález",
      ).join("<br>"),

      e_p2: uniqueForms(
        p_2 + "ális",
        stem2ua + "rális",
        stem2eë + "rális",
      ).join("<br>"),

      ad_p2: uniqueForms(
        p_2 + "álen",
        stem2ua + "rálen",
        stem2eë + "rálen",
      ).join("<br>"),

      h_p2: uniqueForms(
        stem2Vi + "rë́sen",
        stem2ui + "rë́sen",
        stem2oö + "rë́sen",
        stem2jui + "rë́sen",
        stem2joi + "rë́sen",
      ).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(
        p_2 + "óni",
        stem2ua + "róni",
        stem2eë + "róni",
      ).join("<br>"),

      d_p3: uniqueForms(
        p_2 + "ónza",
        stem2ua + "rónza",
        stem2eë + "rónza",
      ).join("<br>"),

      e_p3: uniqueForms(
        p_2 + "ónas",
        stem2ua + "rónas",
        stem2eë + "rónas",
      ).join("<br>"),

      ad_p3: uniqueForms(
        p_2 + "ónön",
        stem2ua + "rónön",
        stem2eë + "rónön",
      ).join("<br>"),

      h_p3: uniqueForms(
        stem2Vi + "rë́na",
        stem2ui + "rë́na",
        stem2oö + "rë́na",
        stem2jui + "rë́na",
        stem2joi + "rë́na",
      ).join("<br>"),
    }

  }
}
