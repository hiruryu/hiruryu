function getConjV(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {
  // 屈折接辞
  // 基本形
  // 完結相
  nefx = "en";
  pfx = "ól"; pfxj = "ö́l";
  ffx = "íp"; ffxj = "ép"; fefx = "íhen"; fefxj = "éhen";

  pfx2 = "al";
  ffx2 = "ip";

  // 進行相
  snfx = "ish"; snfxj = "ash"; snefx = "ishen"; snefxj = "shen";
  spfx = "ishal"; spfxj = "shal";
  sffx = "iship"; sffxj = "ship"; sfefx = "ishphen"; sfefxj = "shphen";

  // 完了相
  dnfx = "na"; dnfxr = "ma"; dnefx = "áin";
  dpfx = "nól"; dpfxr = "mól"; dpxj = "nö́l";
  dffx = "náip"; dffxr = "máip"; dfefx = "áinip";

  dpfx2 = "nal"; dpfxr2 = "mal";
  dffx2 = "naip"; dffxr2 = "maip";

  // qa 型（q 複子音型）：完了相の n → an
  dnfxq = "ana";
  dpfxq = "anól";
  dffxq = "anáip";
  dpfxq2 = "anal";
  dffxq2 = "anaip";

  // 反復相
  mnfx = "ym"; mnfxj = "eum"; mnefx = "men";
  mpfx = "mal";
  mffx = "imip"; mffxj = "emip"; mfefx = "mihen";

  // 軟音形
  // 完結相
  pfxh = "hól"; pfxjh = "hö́l";
  ffxh = "híp";

  pfxh2 = "hal";
  ffxh2 = "hip";

  // 進行相
  snfxh = "hish";
  spfxh = "hishal";
  sffxh = "hiship";

  // 完了相
  dnfxh = "hna";
  dpfxh = "hnól"; dpxjh = "hnö́l";
  dffxh = "hnáip";

  dpfxh2 = "hnal";
  dffxh2 = "hnaip";

  // 反復相
  mnfxh = "hym";
  mpfxh = "hmal";
  mffxh = "hmip";

  // 唇音形
  ffxp = "íh";
  ffxp2 = "ih";

  // 動名詞
  alva = "álva";
  halva = "hálva";

  // 母音の置き換え
  stemVi = (stem ?? "").replace(/[áéóúö́ë́]/g, '$&i');
  stem2Vi = (stem2 ?? "").replace(/[aeouöë]/g, '$&i');

  // stem1
  stemui = (stem ?? "").replace(/[óú]/g, 'í');
  stemjui = (stem ?? "").replace('jú', 'í');
  stemoö = (stem ?? "").replace('ó', 'ö́');
  stemeë = (stem ?? "").replace('é', 'ë́');

  // stem1 (acute removed, diaeresis/ring kept)
  stemD = (stem ?? "").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u").replace(/ý/g, "y").replace(/ǻ/g, "å").replace(/\u0301/g, "");

  // stem2
  stem2ua = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])[ou](?![aeouöëáéóúö́ë́])/g, 'a');
  stem2ui = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])[ou](?![aeouöëáéóúö́ë́])/g, 'i');
  stem2oö = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])o/g, 'ö');
  stem2eë = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])e/g, 'ë');
  stem2öue = (stem2 ?? "").replace(/(?<=[pbtdkgmnqfvszcxhrlj])[ö](?![aeouöëáéóúö́ë́])/g, 'ue');
  stem2jui = (stem2 ?? "").replace(/j[ou]/, 'y');
  stem2juiu = (stem2 ?? "").replace('ju', 'y');
  stem2q = (stem2 ?? "").replace(/^[mnq][iu]/, 'ũ');

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

  if (ruletype === "not") {
    return {};
    // p / b 基本形
  } else if (["p", "b"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxp, nz(stem2ui, ffxp), nz(stem2oö, ffxp), nz(stem2jui, ffxp)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfxh, nz(stem2öue, dpfxh), nz(stem2juiu, dpfxh)).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(stem2ua + dffxh, nz(stem2öue, dffxh), nz(stem2juiu, dffxh)).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(stemVi + mnfxh, stemui + mnfxh, stemjui + mnfxh).join("<br>"),

      mf: uniqueForms(stemVi + mffxh, stemui + mffxh).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + "h" + mnefx, stemui + "h" + mnefx, stemjui + "h" + mnefx).join("<br>"),

      mfe: uniqueForms(stem + "h" + mfefx, stemui + "h" + mfefx, stemjui + "h" + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + halva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxh2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh + alva,
    }

    // p / b 明音形
  } else if (["pj", "bj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxp, nz(stem2ui, ffxp), nz(stem2oö, ffxp), nz(stem2jui, ffxp)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxjh, nz(stem2öue, dpxjh), nz(stem2juiu, dpxjh)).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(stem2ua + dffxh, nz(stem2öue, dffxh), nz(stem2juiu, dffxh)).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(stemVi + mnfxh, stemui + mnfxh, stemjui + mnfxh).join("<br>"),

      mf: uniqueForms(stemVi + mffxh, stemui + mffxh).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + "h" + mnefx, stemui + "h" + mnefx, stemjui + "h" + mnefx).join("<br>"),

      mfe: uniqueForms(stem + "h" + mfefx, stemui + "h" + mfefx, stemjui + "h" + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + halva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxh2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh + alva,
    }


    // t / d 基本形
  } else if (["t", "d", "k", "g"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfxh, nz(stem2öue, dpfxh), nz(stem2juiu, dpfxh)).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(stem2ua + dffxh, nz(stem2öue, dffxh), nz(stem2juiu, dffxh)).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(stemVi + mnfxh, stemui + mnfxh, stemjui + mnfxh).join("<br>"),

      mf: uniqueForms(stemVi + mffxh, stemui + mffxh).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + "h" + mnefx, stemui + "h" + mnefx, stemjui + "h" + mnefx).join("<br>"),

      mfe: uniqueForms(stem + "h" + mfefx, stemui + "h" + mfefx, stemjui + "h" + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + halva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxh2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh + alva,
    }

    // t / d 明音形
  } else if (["tj", "dj", "kj", "gj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxjh, nz(stem2öue, dpxjh), nz(stem2juiu, dpxjh)).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(stem2ua + dffxh, nz(stem2öue, dffxh), nz(stem2juiu, dffxh)).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(stemVi + mnfxh, stemui + mnfxh, stemjui + mnfxh).join("<br>"),

      mf: uniqueForms(stemVi + mffxh, stemui + mffxh).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + "h" + mnefx, stemui + "h" + mnefx, stemjui + "h" + mnefx).join("<br>"),

      mfe: uniqueForms(stem + "h" + mfefx, stemui + "h" + mfefx, stemjui + "h" + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + halva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxh2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh + alva,
    }


    // f / v 基本形
  } else if (["f", "v"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxp, nz(stem2ui, ffxp), nz(stem2oö, ffxp), nz(stem2jui, ffxp)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfx, nz(stem2öue, dpfx), nz(stem2juiu, dpfx)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // f / v 明音形
  } else if (["fj", "vj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxp, nz(stem2ui, ffxp), nz(stem2oö, ffxp), nz(stem2jui, ffxp)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxj, nz(stem2öue, dpxj), nz(stem2juiu, dpxj)).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }


    // s / z 基本形
  } else if (["s", "z", "sh", "zh", "c", "x", "ch", "xh", "h"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfx, nz(stem2öue, dpfx), nz(stem2juiu, dpfx)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // s / z 明音形
  } else if (["sj", "zj", "shj", "zhj", "cj", "xj", "chj", "xhj", "hj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxj, nz(stem2öue, dpxj), nz(stem2juiu, dpxj)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }


    // m 基本形
  } else if (["m"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxp, nz(stem2ui, ffxp), nz(stem2oö, ffxp), nz(stem2jui, ffxp)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfx, nz(stem2öue, dpfx), nz(stem2juiu, dpfx)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // m 明音形
  } else if (["mj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxp, nz(stem2ui, ffxp), nz(stem2oö, ffxp), nz(stem2jui, ffxp)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxj, nz(stem2öue, dpxj), nz(stem2juiu, dpxj)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }


    // n / q 基本形
  } else if (["n", "q", "rh"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfx, nz(stem2öue, dpfx), nz(stem2juiu, dpfx)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // n / q 明音形
  } else if (["nj", "qj", "rhj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxj, nz(stem2öue, dpxj), nz(stem2juiu, dpxj)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // r / l 基本形
  } else if (["r", "l"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfxr, nz(stem2öue, dpfxr), nz(stem2juiu, dpfxr)).join("<br>"),

      dn: stem + dnfxr,

      df: uniqueForms(stem2ua + dffxr, nz(stem2öue, dffxr), nz(stem2juiu, dpfxr)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxr2 + alva,
      dn_gerund: stem2ua + dnfxr.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxr2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // r / l 明音形
  } else if (["rj", "lj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfxj), stem2ua + pfxj, nz(stem2juiu, pfxj)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxj, nz(stem2öue, dpxj), nz(stem2juiu, dpxj)).join("<br>"),

      dn: stem + "m" + dnfx.slice(-1, 0),

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }


    // j 形
  } else if (["j"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffxj, nz(stem2ui, ffxj), nz(stem2oö, ffxj), nz(stem2jui, ffxj)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfxj, stemui + spfxj, stemoö + spfxj).join("<br>"),

      sn: uniqueForms(stemui + snfxj, stemoö + snfxj).join("<br>"),

      sf: uniqueForms(stemjui + sffxj, stemui + sffxj, stemoö + sffxj).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpxj, nz(stem2öue, dpxj), nz(stem2juiu, dpxj)).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(stem2ua + dffx, nz(stem2öue, dffx), nz(stem2juiu, dffx)).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(stemui + mnfxj, stemjui + mnfxj).join("<br>"),

      mf: uniqueForms(stemui + mffxj).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefxj, nz(stem2ui, fefxj), nz(stem2oö, fefxj), nz(stem2jui, fefxj)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemui + snefxj, stemjui + snefxj).join("<br>"),

      sfe: uniqueForms(stemui + sfefxj, stemoö + sfefxj, stemjui + sfefxj).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(stem + mnefx, stemui + mnefx, stemjui + mnefx).join("<br>"),

      mfe: uniqueForms(stem + mfefx, stemui + mfefx, stemjui + mfefx).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfxj + alva,
      sn_gerund: stem2ui + snfxj + alva,
      sf_gerund: stem2ui + sffxj + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfxj + alva,
      mf_gerund: stem2ui + mffxj + alva,
    }


    // n 複子音形
  } else if (["a"].includes(ruletype)) {
   return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua.slice(0, -1) + dpfx,
        stem2.slice(0, -1) + dpfx,
        stem2juiu.slice(0, -1) + dpfx,
      ).join("<br>"),

      dn: stem.slice(0, -1) + dnfx,

      df: uniqueForms(
        stem2ua.slice(0, -1) + dffx,
        stem2.slice(0, -1) + dffx,
        stem2juiu.slice(0, -1) + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx.slice(1, 4),

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem.slice(0, -1) + mnefx,
        stemui.slice(0, -1) + mnefx,
        stemjui.slice(0, -1) + mnefx,
      ).join("<br>"),

      mfe: uniqueForms(
        stem.slice(0, -1) + mfefx,
        stemui.slice(0, -1) + mfefx,
        stemjui.slice(0, -1) + mfefx,
      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua.slice(0, -1) + dpfx2 + alva,
      dn_gerund: stem2ua.slice(0, -1) + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua.slice(0, -1) + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx.slice(1, 4) + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // n 複子音形
  } else if (["na"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua.slice(0, -1) + dpfx,
        stem2.slice(0, -1) + dpfx,
        stem2juiu.slice(0, -1) + dpfx,
      ).join("<br>"),

      dn: stem.slice(0, -1) + dnfx,

      df: uniqueForms(
        stem2ua.slice(0, -1) + dffx,
        stem2.slice(0, -1) + dffx,
        stem2juiu.slice(0, -1) + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx.slice(1, 4),

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem.slice(0, -1) + mnefx,
        stemui.slice(0, -1) + mnefx,
        stemjui.slice(0, -1) + mnefx,
      ).join("<br>"),

      mfe: uniqueForms(
        stem.slice(0, -1) + mfefx,
        stemui.slice(0, -1) + mfefx,
        stemjui.slice(0, -1) + mfefx,
      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua.slice(0, -1) + dpfx2 + alva,
      dn_gerund: stem2ua.slice(0, -1) + dnfx.slice(0, -1) + alva,
      df_gerund: stem2ua.slice(0, -1) + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx.slice(1, 4) + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }
      // m 複子音型
  } else if (["ma"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua.slice(0, -1) + dpfxr,
        stem2.slice(0, -1) + dpfxr,
        stem2juiu.slice(0, -1) + dpfxr,
      ).join("<br>"),

      dn: stem.slice(0, -1) + dnfxr,

      df: uniqueForms(
        stem2ua.slice(0, -1) + dffxr,
        stem2.slice(0, -1) + dffxr,
        stem2juiu.slice(0, -1) + dffxr,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx.slice(1, 4),

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem.slice(0, -1) + mnefx,
        stemui.slice(0, -1) + mnefx,
        stemjui.slice(0, -1) + mnefx,
      ).join("<br>"),

      mfe: uniqueForms(
        stem.slice(0, -1) + mfefx,
        stemui.slice(0, -1) + mfefx,
        stemjui.slice(0, -1) + mfefx,
      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua.slice(0, -1) + dpfxr2 + alva,
      dn_gerund: stem2ua.slice(0, -1) + dnfxr.slice(0, -1) + alva,
      df_gerund: stem2ua.slice(0, -1) + dffxr2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx.slice(1, 4) + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

      // q 複子音型
  } else if (["qa"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(nz(stem2öue, pfx), stem2ua + pfx, nz(stem2juiu, pfx)).join("<br>"),

      n: "ー",
      f: uniqueForms(stem2ua + ffx, nz(stem2ui, ffx), nz(stem2oö, ffx), nz(stem2jui, ffx)).join("<br>"),

      // 進行相
      sp: uniqueForms(stemjui + spfx, stemVi + spfx, stemui + spfx, stemoö + spfx).join("<br>"),

      sn: uniqueForms(stemVi + snfx, stemui + snfx, stemoö + snfx).join("<br>"),

      sf: uniqueForms(stemjui + sffx, stemVi + sffx, stemui + sffx, stemoö + sffx).join("<br>"),

      // 完了相
      dp: uniqueForms(stem2ua + dpfxq, nz(stem2öue, dpfxq), nz(stem2juiu, dpfxq)).join("<br>"),

      dn: stem + dnfxq,

      df: uniqueForms(stem2ua + dffxq, nz(stem2öue, dffxq), nz(stem2juiu, dffxq)).join("<br>"),

      // 反復相,
      mp: stem + mpfx.slice(1, 4),

      mn: uniqueForms(stemVi + mnfx, stemui + mnfx, stemjui + mnfx).join("<br>"),

      mf: uniqueForms(stemVi + mffx, stemui + mffx).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(stemVi + nefx, stemui + nefx, stemjui + nefx).join("<br>"),

      fe: uniqueForms(stem2ua + fefx, nz(stem2ui, fefx), nz(stem2oö, fefx), nz(stem2jui, fefx)).join("<br>"),

      // 進行相
      sne: uniqueForms(stemVi + snefx, stemui + snefx, stemjui + snefx).join("<br>"),

      sfe: uniqueForms(stemui + sfefx, stemoö + sfefx, stemjui + sfefx).join("<br>"),

      // 完了相
      dne: uniqueForms(stem2ua + dnefx, nz(stem2öue, dnefx), nz(stem2juiu, dnefx)).join("<br>"),

      dfe: uniqueForms(stem2ua + dfefx, nz(stem2öue, dfefx), nz(stem2juiu, dfefx)).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem.slice(0, -1) + mnefx,
        stemui.slice(0, -1) + mnefx,
        stemjui.slice(0, -1) + mnefx,
      ).join("<br>"),

      mfe: uniqueForms(
        stem.slice(0, -1) + mfefx,
        stemui.slice(0, -1) + mfefx,
        stemjui.slice(0, -1) + mfefx,
      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(stem2ua + pfx2 + alva, stem2q + pfx2 + alva).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxq2 + alva,
      dn_gerund: stem2ua + dnfxq.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxq2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx.slice(1, 4) + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }

    // o 型
  } else if (["o"].includes(ruletype)) {
    return {
      // 完結相
      p: stem2ua + "ól",
      n: "ー",
      f: stem2ua + "óip",
      // 進行相
      sp: stem + "öishal",
      sn: stem + "öish",
      sf: stem + "öiship",
      // 完了相
      dp: stem2ua + "anö́l",
      dn: stem + "ona",
      df: stem2ua + "onáip",
      // 反復相,
      mp: stem + "amal",
      mn: stem + "om",
      mf: stem2ua + "ómip",
      // 飾形
      // 完結相
      ne: stem + "ön",
      fe: stem2ua + "óihen",
      // 進行相
      sne: stem + "öishen",
      sfe: stem2ua + "óishphen",
      // 完了相
      dne: stem2ua + "óin",
      dfe: stem2ua + "óinip",
      // 反復相,
      mne: stem + "ömen",
      mfe: stem2ua + "ómihen",
      // 具象形
      // 完結相
      p_gerund: stem2ua + pfx2 + alva,
      n_gerund: _word,
      f_gerund: stem2ua + ffxp2 + alva,
      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,
      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxh2 + alva,
      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh + alva,
    }

    // po 型 (bo, fo, vo も同じ)
  } else if (["po", "bo", "fo", "vo"].includes(ruletype)) {
    return {
      // 完結相
      p: stemD + "ól",
      n: "ー",
      f: stemD + "óih",
      // 進行相
      sp: stem + "öishal",
      sn: stem + "öish",
      sf: stem + "öiship",
      // 完了相
      dp: stem2ua + "anö́l",
      dn: stem2ua + "óna",
      df: stem2ua + "anáip",
      // 反復相,
      mp: stem + "amal",
      mn: stem + "om",
      mf: stem2ua + "ómip",
      // 飾形
      // 完結相
      ne: stem + "ön",
      fe: stem2ua + "óihen",
      // 進行相
      sne: stem + "öishen",
      sfe: stem2ua + "óishphen",
      // 完了相
      dne: stemD + "óin",
      dfe: stem2ua + "óinip",
      // 反復相,
      mne: stem + "ömen",
      mfe: stem2ua + "ómihen",
      // 具象形
      // 完結相
      p_gerund: stem2ua + pfx2 + alva,
      n_gerund: _word,
      f_gerund: stem2ua + ffxp2 + alva,
      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,
      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh.slice(0, -1) + alva,
      df_gerund: stem2ua + dffxh2 + alva,
      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh + alva,
    }
  }
}
