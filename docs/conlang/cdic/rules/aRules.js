function getConjARaw(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {

  s = stem + ""; s_2 = stem2 + "";
  p = stem + "r"; p_2 = stem2 + "r";



  // 母音の置き換え
  stemVi = (stem ?? "").replace(/[áéóúö́ë́]/g, '$&i');
  stem2Vi = (stem2 ?? "").replace(/[aeouöë]/g, '$&i');

  // stem1
  stemui = (stem ?? "").replace(/[óú]/g, 'í');
  stemoö = (stem ?? "").replace('ó', 'ö́');
  stemeë = (stem ?? "").replace('é', 'ë́');

  // stem2
  stem2ua = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])[ou](?![aeouöëáéóúö́ë́])/g, 'a');
  stem2ui = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])[ou](?![aeouöëáéóúö́ë́])/g, 'i');
  stem2oö = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])o/g, 'ö');
  stem2eë = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])e/g, 'ë');
  stem2öue = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])[ö](?![aeouöëáéóúö́ë́])/g, 'ue');
  stem2jui = (stem2 ?? "").replace(/j[ou]/, 'y');
  stem2q = (stem2 ?? "").replace(/^[mnq][iu]/, 'ũ');
  s2 = stem2ua + "ála";
  s3 = stem2ua + "óna";
  p2 = stem2ua + "árva";
  p3 = stem2ua + "árma";

  function uniqueForms(...forms) {
    const plain = [];
    const normal = [];
    for (const f of forms) {
      if (f == null) continue;
      if (typeof f === "string" && f.charCodeAt(0) === 0) plain.push(f.slice(1));
      else normal.push(f);
    }
    const rx = /jí|ji|ii|íi|iúi|iui/;
    const filtered = [...new Set(normal.filter(form => !rx.test(form)))];
    if (filtered.length) return filtered;
    if (normal.length) return [normal[0]];
    const pf = [...new Set(plain.filter(form => !rx.test(form)))];
    if (pf.length) return pf;
    if (plain.length) return [plain[0]];
    return [forms[0]];
  }
  // 変換が素の stem2 と変わらない場合は先頭に \0 を付けた plain 形を返す。
  // uniqueForms は変化形がある時は plain 形を除き、変化形が一つもない時だけ plain 形を表示する。
  function nz(t, sfx) { return t === stem2 ? "\0" + (t + sfx) : t + sfx; }

  if (ruletype === "no") {
    return {};

    // p / b 基本形
  } else if (["p", "b", "k", "g", "m", "q"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(s + "las").join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }


    // p / b 明音形
  } else if (["pj", "bj", "kj", "gj", "mj", "qj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(s + "hlas").join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // f 基本形
  } else if (["f", "v", "sh", "zh", "ch", "xh", "h", "rh"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(s + "las").join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }


    // f / v 明音形
  } else if (["fj", "vj", "shj", "zhj", "chj", "xhj", "hj", "rhj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "hlas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // t / d 基本形
  } else if (["t", "d"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "hlas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }


    // t / d 明音形
  } else if (["tj", "dj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "hlas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // s 基本形
  } else if (["s", "sj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "sas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }


    // z
  } else if (["z", "zj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "zas", // -zzas
        s + "jas", // -zjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // c 基本形
  } else if (["c", "cj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "cas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }


    // x
  } else if (["x", "xj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "xas", // -zzas
        s + "jas", // -zjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // n 基本形
  } else if (["n", "nj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "nas", // fádhlas
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // L
  } else if (["r", "l", "rj", "lj"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "las", // fádhlas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "ë́sen", nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "ë́na", nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),

    }

    // j
  } else if (["j"].includes(ruletype)) {
    return {
      // 単数一致-原級
      s: s_2 + "í",

      f_s: uniqueForms(stem2Vi + "íhë", nz(stem2ui, "íhë"), nz(stem2oö, "íhë"), nz(stem2jui, "íhë"), nz(stem2öue, "íhë")).join("<br>"),

      d_s: uniqueForms(stem2Vi + "éze", nz(stem2ui, "éze"), nz(stem2oö, "éze"), nz(stem2jui, "éze"), nz(stem2öue, "éze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "áisi", nz(stem2eë, "áisi"), nz(stem2öue, "áisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "éni", nz(stem2ui, "éni"), nz(stem2oö, "éni"), nz(stem2jui, "éni"), nz(stem2öue, "éni")).join("<br>"),

      h_s: uniqueForms(
        s + "jas", // fádjas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2,

      f_s2: uniqueForms(stem2ua + "áli", nz(stem2eë, "áli"), nz(stem2öue, "áli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "ález", nz(stem2eë, "ález"), nz(stem2öue, "ález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "ális", nz(stem2eë, "ális"), nz(stem2öue, "ális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "álen", nz(stem2eë, "álen"), nz(stem2öue, "álen")).join("<br>"),

      h_s2: uniqueForms(nz(stem2ui, "ë́sen"), nz(stem2oö, "ë́sen"), nz(stem2jui, "ë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3,

      f_s3: uniqueForms(stem2ua + "óni", nz(stem2eë, "óni"), nz(stem2öue, "óni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "ónza", nz(stem2eë, "ónza"), nz(stem2öue, "ónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "ónas", nz(stem2eë, "ónas"), nz(stem2öue, "ónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "ónön", nz(stem2eë, "ónön"), nz(stem2öue, "ónön")).join("<br>"),

      h_s3: uniqueForms(nz(stem2ui, "ë́na"), nz(stem2oö, "ë́na"), nz(stem2jui, "ë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }

    // 母音終了
  } else if (["a", "e", "i", "o", "u", "ui"].includes(ruletype)) {
    // 母音終了型の s2/s3/p2/p3：語幹末母音と接辞の母音連続を避ける。
    // s2/s3 は j を挿入（qja + ála → qjajála）、p2/p3 は語幹末母音を落とす（qja + árva → qjárva）。
    const s2v = /[aeiouöëáéóú]$/.test(stem2ua) ? stem2ua + "j" + "ála" : s2;
    const s3v = /[aeiouöëáéóú]$/.test(stem2ua) ? stem2ua + "j" + "óna" : s3;
    const p2v = /[aeiouöëáéóú]$/.test(stem2ua) ? stem2ua.slice(0, -1) + "árva" : p2;
    const p3v = /[aeiouöëáéóú]$/.test(stem2ua) ? stem2ua.slice(0, -1) + "árma" : p3;
    return {
      // 単数一致-原級
      s: s_2 + "jí",

      f_s: uniqueForms(nz(stem2ui, "jíhë"), nz(stem2oö, "jíhë"), nz(stem2jui, "jíhë"), nz(stem2öue, "jíhë")).join("<br>"),

      d_s: uniqueForms(nz(stem2ui, "jéze"), nz(stem2oö, "jéze"), nz(stem2jui, "jéze"), nz(stem2öue, "jéze")).join("<br>"),

      e_s: uniqueForms(stem2ua + "jáisi", nz(stem2eë, "jáisi"), nz(stem2öue, "jáisi")).join("<br>"),

      ad_s: uniqueForms(stem2Vi + "jéni", nz(stem2ui, "jéni"), nz(stem2oö, "jéni"), nz(stem2jui, "jéni"), nz(stem2öue, "jéni")).join("<br>"),

      h_s: uniqueForms(
        s + "las", // dólas
      ).join("<br>"),

      // 単数一致-比較級
      s2: s2v,

      f_s2: uniqueForms(stem2ua + "jáli", nz(stem2eë, "jáli"), nz(stem2öue, "jáli")).join("<br>"),

      d_s2: uniqueForms(stem2ua + "jález", nz(stem2eë, "jález"), nz(stem2öue, "jález")).join("<br>"),

      e_s2: uniqueForms(stem2ua + "jális", nz(stem2eë, "jális"), nz(stem2öue, "jális")).join("<br>"),

      ad_s2: uniqueForms(stem2ua + "jálen", nz(stem2eë, "jálen"), nz(stem2öue, "jálen")).join("<br>"),

      h_s2: uniqueForms(stem2Vi + "jë́sen", nz(stem2ui, "jë́sen"), nz(stem2oö, "jë́sen"), nz(stem2jui, "jë́sen")).join("<br>"),

      // 単数一致-最上級
      s3: s3v,

      f_s3: uniqueForms(stem2ua + "jóni", nz(stem2eë, "jóni"), nz(stem2öue, "jóni")).join("<br>"),

      d_s3: uniqueForms(stem2ua + "jónza", nz(stem2eë, "jónza"), nz(stem2öue, "jónza")).join("<br>"),

      e_s3: uniqueForms(stem2ua + "jónas", nz(stem2eë, "jónas"), nz(stem2öue, "jónas")).join("<br>"),

      ad_s3: uniqueForms(stem2ua + "jónön", nz(stem2eë, "jónön"), nz(stem2öue, "jónön")).join("<br>"),

      h_s3: uniqueForms(stem2Vi + "jë́na", nz(stem2ui, "jë́na"), nz(stem2oö, "jë́na"), nz(stem2jui, "jë́na")).join("<br>"),


      // 複数一致-原級
      p: uniqueForms(stem2ua + "rá", nz(stem2öue, "rá")).join("<br>"),

      f_p: uniqueForms(stem2Vi + "ríhë", nz(stem2ui, "ríhë"), nz(stem2oö, "ríhë"), nz(stem2jui, "ríhë"), nz(stem2öue, "ríhë")).join("<br>"),

      d_p: uniqueForms(stem2Vi + "réze", nz(stem2ui, "réze"), nz(stem2oö, "réze"), nz(stem2jui, "réze"), nz(stem2öue, "réze")).join("<br>"),

      e_p: uniqueForms(stem2ua + "ráisi", nz(stem2eë, "ráisi"), nz(stem2öue, "ráisi")).join("<br>"),

      ad_p: uniqueForms(stem2Vi + "réni", nz(stem2ui, "réni"), nz(stem2oö, "réni"), nz(stem2jui, "réni"), nz(stem2öue, "réni")).join("<br>"),

      h_p: uniqueForms(
        p + "alas", // fádralas
      ).join("<br>"),

      // 複数一致-比較級
      p2: p2v,

      f_p2: uniqueForms(stem2ua + "ráli", nz(stem2eë, "ráli"), nz(stem2öue, "ráli")).join("<br>"),

      d_p2: uniqueForms(stem2ua + "rález", nz(stem2eë, "rález"), nz(stem2öue, "rález")).join("<br>"),

      e_p2: uniqueForms(stem2ua + "rális", nz(stem2eë, "rális"), nz(stem2öue, "rális")).join("<br>"),

      ad_p2: uniqueForms(stem2ua + "rálen", nz(stem2eë, "rálen"), nz(stem2öue, "rálen")).join("<br>"),

      h_p2: uniqueForms(stem2Vi + "rë́sen", nz(stem2ui, "rë́sen"), nz(stem2oö, "rë́sen"), nz(stem2jui, "rë́sen")).join("<br>"),

      // 複数一致-最上級
      p3: p3v,

      f_p3: uniqueForms(stem2ua + "róni", nz(stem2eë, "róni"), nz(stem2öue, "róni")).join("<br>"),

      d_p3: uniqueForms(stem2ua + "rónza", nz(stem2eë, "rónza"), nz(stem2öue, "rónza")).join("<br>"),

      e_p3: uniqueForms(stem2ua + "rónas", nz(stem2eë, "rónas"), nz(stem2öue, "rónas")).join("<br>"),

      ad_p3: uniqueForms(stem2ua + "rónön", nz(stem2eë, "rónön"), nz(stem2öue, "rónön")).join("<br>"),

      h_p3: uniqueForms(stem2Vi + "rë́na", nz(stem2ui, "rë́na"), nz(stem2oö, "rë́na"), nz(stem2jui, "rë́na")).join("<br>"),
    }
  }
}

// tl·dl·lr → ll の同化（2026-11-13、みゅら確認済；lr は 2026-11-17 追加）。nRules.js と同じ規則。
// 例：pitálas の h_s形 pit＋las → pillas、mantálas の h_s mónt＋las → mónllas。
// 名飾詞の一致形（h_s など）で、語幹＋接辞 "las" の境界で tl·dl が生じることがある。
function getConjA(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {
  const r = getConjARaw(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides);
  if (r == null) return r;
  const out = {};
  for (const [k, v] of Object.entries(r)) {
    out[k] = typeof v === "string" ? v.replace(/tl/g, "ll").replace(/dl/g, "ll").replace(/lr/g, "ll") : v;
  }
  // 副飾形（2026-11-14、みゅら指定）。stem2＋接辞。
  // p/b/t/d/k/g/m/q 型（明音型含む）は -ú と -hú の2形。母音終了型（a/e/i/o/u/ui）は -vú。それ以外は -ú。
  if (Object.keys(out).length > 0 && stem2 != null && stem2 !== "") {
    const s2 = stem2;
    if (["p", "b", "t", "d", "k", "g", "m", "q", "pj", "bj", "tj", "dj", "kj", "gj", "mj", "qj"].includes(ruletype)) {
      out.adv = s2 + "ú<br>" + s2 + "hú";
    } else if (["a", "e", "i", "o", "u", "ui"].includes(ruletype)) {
      out.adv = s2 + "vú";
    } else {
      out.adv = s2 + "ú";
    }
  }
  return out;
}
