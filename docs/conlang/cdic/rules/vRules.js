function getConjV(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {
  // 屈折接辞
  // 基本形
  // 完結相
  nefx = "en";
  pfx = "ól";
  ffx = "íp"; fefx = "íhen";

  pfx2 = "al";
  ffx2 = "ip";

  // 進行相
  snfx = "ish"; snefx = "ishen";
  spfx = "ishal";
  sffx = "iship"; sfefx = "ishphen";

  // 完了相
  dnfx = "na"; dnefx = "áin";
  dpfx = "nól";
  dffx = "náip"; dfefx = "áinip";

  dpfx2 = "nal";
  dffx2 = "naip";

  // 反復相
  mnfx = "ium"; mnefx = "men";
  mpfx = "mal";
  mffx = "imip"; mfefx = "mihen";

  // 軟音形
  // 完結相
  pfxh = "hól";
  ffxh = "híp";

  pfxh2 = "hal";
  ffxh2 = "hip";

  // 進行相
  snfxh = "hish";
  spfxh = "hishal";
  sffxh = "hiship";

  // 完了相
  dnfxh = "hna";
  dpfxh = "hnól";
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
    return {};
    // p / b 基本形
  } else if (["p", "b", "pj", "bj"].includes(ruletype)) {
    return {
      // 完結相
      p: uniqueForms(
        stem2 + pfx,
        stem2ua + pfx,
      ).join("<br>"),

      n: "ー",
      f: uniqueForms(
        stem2ua + ffxp,
        stem2ui + ffxp,
        stem2oö + ffxp,
      ).join("<br>"),

      // 進行相
      sp: uniqueForms(
        stemui + spfx,
        stemoö + spfx,
      ).join("<br>"),

      sn: uniqueForms(
        stemVi + snfx,
        stemui + snfx,
        stemoö + snfx,
      ).join("<br>"),

      sf: uniqueForms(
        stemui + sffx,
        stemoö + sffx,
      ).join("<br>"),

      // 完了相
      dp: uniqueForms(
        stem2ua + dpfxh,
        stem2 + dpfxh,
      ).join("<br>"),

      dn: stem + dnfxh,

      df: uniqueForms(
        stem2ua + dffxh,
        stem2 + dffxh,
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
      ).join("<br>"),
      
      // 進行相
      sne: uniqueForms(
        stemVi + snefx,
        stemui + snefx,
      ).join("<br>"),

      sfe: uniqueForms(
        stem2ui + sfefx,
        stem2oö + sfefx,
      ).join("<br>"),

      // 完了相
      dne: uniqueForms(
        stem2ua + dnefx,
        stem2 + dnefx,
      ).join("<br>"),

      dfe: uniqueForms(
        stem2ua + dfefx,
        stem2 + dfefx,
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
      sn_gerund: [stem2ui + snfx + alva],
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfxh2 + alva,
      dn_gerund: stem2ua + dnfxh + alva,
      df_gerund: stem2ua + dffxh2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfxh + alva,
      mn_gerund: stem2ui + mnfxh + alva,
      mf_gerund: stem2ui + mffxh.slice(0, -1) + alva,
    }
  }
}
