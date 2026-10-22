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

  // 反復相
  mnfx = "ium"; mnfxj = "eum"; mnefx = "men";
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
  mnfxh = "hium";
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
  stemoö = (stem ?? "").replace('ó', 'ö́');
  stemeë = (stem ?? "").replace('é', 'ë́');

  // stem2
  stem2ua = (stem2 ?? "").replace('u', 'a');
  stem2ui = (stem2 ?? "").replace(/[ou]/g, 'i');
  stem2oö = (stem2 ?? "").replace('o', 'ö');
  stem2eë = (stem2 ?? "").replace('e', 'ë');
  stem2jui = (stem2 ?? "").replace(/^[j][ou]/, 'i');
  stem2juiu = (stem2 ?? "").replace('jui', 'i');
  stem2q = (stem2 ?? "").replace(/^[mnq][iu]/, 'ũ');

  function uniqueForms(...forms) {
    return [...new Set(forms.filter(form => !/jí|ji|ii|íi|iúi|iui/.test(form)))];
  }

  if (ruletype === "not") {
    return {};
    // p / b 基本形
  } else if (["p", "b"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
        stem2jui + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfxh,
        stem2 + dpfxh,
        stem2juiu + dpfxh,
      ).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(
        stem2ua + dffxh,
        stem2 + dffxh,
        stem2juiu + dffxh,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(
        stemVi + mnfxh,
        stemui + mnfxh,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffxh,
        stemui + mffxh,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + "h" + mnefx,
        stemui + "h" + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + "h" + mfefx,
        stemui + "h" + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
        stem2jui + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxjh,
        stem2 + dpxjh,
        stem2juiu + dpxjh,
      ).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(
        stem2ua + dffxh,
        stem2 + dffxh,
        stem2juiu + dffxh,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(
        stemVi + mnfxh,
        stemui + mnfxh,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffxh,
        stemui + mffxh,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + "h" + mnefx,
        stemui + "h" + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + "h" + mfefx,
        stemui + "h" + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfxh,
        stem2 + dpfxh,
        stem2juiu + dpfxh,
      ).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(
        stem2ua + dffxh,
        stem2 + dffxh,
        stem2juiu + dffxh,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(
        stemVi + mnfxh,
        stemui + mnfxh,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffxh,
        stemui + mffxh,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + "h" + mnefx,
        stemui + "h" + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + "h" + mfefx,
        stemui + "h" + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxjh,
        stem2 + dpxjh,
        stem2juiu + dpxjh,
      ).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(
        stem2ua + dffxh,
        stem2 + dffxh,
        stem2juiu + dffxh,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfxh,

      mn: uniqueForms(
        stemVi + mnfxh,
        stemui + mnfxh,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffxh,
        stemui + mffxh,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + "h" + mnefx,
        stemui + "h" + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + "h" + mfefx,
        stemui + "h" + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
        stem2jui + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfx,
        stem2 + dpfx,
        stem2juiu + dpfx,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
        stem2jui + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxj,
        stem2 + dpxj,
        stem2juiu + dpxj,
      ).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
  } else if (["s", "z", "sh", "zh", "c", "x", "ch", "xh"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfx,
        stem2 + dpfx,
        stem2juiu + dpfx,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
  } else if (["sj", "zj", "shj", "zhj", "cj", "xj", "chj", "xhj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxj,
        stem2 + dpxj,
        stem2juiu + dpxj,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
        stem2jui + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfx,
        stem2 + dpfx,
        stem2juiu + dpfx,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
        stem2jui + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxj,
        stem2 + dpxj,
        stem2juiu + dpxj,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfx,
        stem2 + dpfx,
        stem2juiu + dpfx,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxj,
        stem2 + dpxj,
        stem2juiu + dpxj,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfxr,
        stem2 + dpfxr,
        stem2juiu + dpfxr,
      ).join("<br>"),

      dn: stem + dnfxr,

      df: uniqueForms(
        stem2ua + dffxr,
        stem2 + dffxr,
        stem2juiu + dpfxr,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxj,
        stem2 + dpxj,
        stem2juiu + dpxj,
      ).join("<br>"),

      dn: stem + "m" + dnfx.slice(-1, 0),

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxj,
        stem2ui + ffxj,
        stem2oö + ffxj,
        stem2jui + ffxj,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemui + spfxj,
        stemoö + spfxj,
      ).join("<br>"),

      sn: uniqueForms(
        stemui + snfxj,
        stemoö + snfxj,
      ).join("<br>"),

      sf: uniqueForms(
        stemui + sffxj,
        stemoö + sffxj,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpxj,
        stem2 + dpxj,
        stem2juiu + dpxj,
      ).join("<br>"),

      dn: stem + dnfx,

      df: uniqueForms(
        stem2ua + dffx,
        stem2 + dffx,
        stem2juiu + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx,

      mn: uniqueForms(
        stemui + mnfxj,

      ).join("<br>"),

      mf: uniqueForms(
        stemui + mffxj,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefxj,
        stem2oö + fefxj,
        stem2jui + fefxj,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemui + snefxj,
      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefxj,
        stemoö + sfefxj,
      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem + mnefx,
        stemui + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem + mfefx,
        stemui + mfefx,

      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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
  } else if (["na"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
        stem2juiu + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

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

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem.slice(0, -1) + mnefx,
        stemui.slice(0, -1) + mnefx,
      ).join("<br>"),

      mfe: uniqueForms(
        stem.slice(0, -1) + mfefx,
        stemui.slice(0, -1) + mfefx,
      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

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

    // sna 明音形
  } else if (["nja"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(
        stem2 + pfxj,
        stem2ua + pfxj,
        stem2juiu + pfxj,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffx,
        stem2ui + ffx,
        stem2oö + ffx,
        stem2jui + ffx,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(

        stemVi + spfx,
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(

        stemVi + sffx,
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua.slice(0, -1) + dpxj,
        stem2.slice(0, -1) + dpxj,
        stem2juiu.slice(0, -1) + dpxj,
      ).join("<br>"),

      dn: stem.slice(0, -1) + dnfxh,

      df: uniqueForms(
        stem2ua.slice(0, -1) + dffx,
        stem2.slice(0, -1) + dffx,
        stem2juiu.slice(0, -1) + dffx,
      ).join("<br>"),

      // 反復相,
      mp: stem + mpfx.slice(1, 4),

      mn: uniqueForms(
        stemVi + mnfx,
        stemui + mnfx,

      ).join("<br>"),

      mf: uniqueForms(
        stemVi + mffx,
        stemui + mffx,
      ).join("<br>"),

      // 飾形
      // 完結相
      ne: uniqueForms(
        stemVi + nefx,
        stemui + nefx,

      ).join("<br>"),

      fe: uniqueForms(
        stem2ui + fefx,
        stem2oö + fefx,
        stem2jui + fefx,
      ).join("<br>"),

      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,

      ).join("<br>"),

      sfe: uniqueForms(
        stemui + sfefx,
        stemoö + sfefx,

      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
        stem2juiu + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
        stem2juiu + dfefx,
      ).join("<br>"),

      // 反復相,
      mne: uniqueForms(
        stem.slice(0, -1) + mnefx,
        stemui.slice(0, -1) + mnefx,

      ).join("<br>"),

      mfe: uniqueForms(
        stem.slice(0, -1) + mfefx,
        stemui.slice(0, -1) + mfefx,
      ).join("<br>"),

      // 具象形
      // 完結相
      p_gerund: uniqueForms(
        stem2ua + pfx2 + alva,
        stem2q + pfx2 + alva,
      ).join("<br>"),

      n_gerund: stem2ua + alva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: stem2ui + snfx + alva,
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua.slice(0, -1) + dpfx2 + alva,
      dn_gerund: stem2ua.slice(0, -1) + dnfx + alva,
      df_gerund: stem2ua.slice(0, -1) + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx.slice(1, 4) + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx + alva,
    }
  }
}
