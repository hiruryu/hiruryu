function getConjV(_word, stem, long_stem, stem2, stem3, _type, ruletype, baseOverrides) {
  // 屈折接辞
   // 基本形
  // 完結相
  nefx ="en";
  pfx = "ól";
  ffx = "íp"; fefx = "íhen"; 

  pfx2 = "al";
  ffx2 = "ip";

  // 進行相
  snfx = "ish"; snefx ="ishen";
  spfx = "ishal";
  sffx = "iship"; sfefx ="ishphen";

  // 完了相
  dnfx = "na"; dnefx ="áin";
  dpfx = "nól";
  dffx = "náip"; dfefx ="áinip";

  dpfx2 = "nal";
  dffx2 = "naip";

  // 反復相
  mnfx = "ium"; mnefx ="men";
  mpfx = "mal";
  mffx = "imip"; mfefx ="miphen";

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
  alva ="álva";
  halva ="hálva";

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

function uniqueForms(...forms) {
  return [...new Set(forms)];
}
  
  if (ruletype === "not") {
    return {};
    // p / b 基本形
  } else if (["p", "b", "pj", "bj"].includes(ruletype)) {
    return {
      // 完結相
      p:  uniqueForms( 
stem2 + pfx,
stem2ua + pfx,
stem2Vi + pfx,
stem2ui + pfx,
).join("<br>"),

      n: "ー",
      f: uniqueForms( 
stem2 + ffxp,
stem2Vi + ffxp,
stem2ui + ffxp,
stem2oö + ffxp,
).join("<br>"),

      // 進行相
      sp: uniqueForms(
stem + spfx,
stemVi + spfx,
stemui + spfx,
stemoö + spfx,
).join("<br>"),

      sn: uniqueForms(
stem + snfx,
stemVi + snfx,
stemui + snfx,
stemoö + snfx,
).join("<br>"),

      sf: uniqueForms(
stem + sffx,
stemVi + sffx,
stemui + sffx,
stemoö + sffx,
).join("<br>"),

      // 完了相
      dp: stem2 + dpfxh,
      dn: stem + dnfxh,
      df: stem2 + dffxh,

      // 反復相,
      mp: stem + mpfxh,
      mn: stemVi + mnfxh,
      mf: stemVi + mffxh,

      // 飾形
      // 完結相
      ne: stemVi + nefx,
      fe: stem2Vi + fefx,

      // 進行相
      sne: stemVi + snefx,
      sfe: stemVi + sfefx,

      // 完了相
      dne: stem2 + dnefx,
      dfe: stem2 + dfefx,

      // 反復相,
      mne: stem + "h" + mnefx,
      mfe: stemVi +"h" + mfefx,

// 具象形
      // 完結相
      p_gerund: [stem2ua + pfx2 + alva],
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
      mf_gerund: stem2ui + mffxh.slice(0, -1)+ alva,
    }
// t / d 型
  } else if (["t", "d", "k", "g", "f", "v", "s", "z", "c", "x", "h", "j"].includes(ruletype)) {
    return {
      // 完結相
      p:  uniqueForms( 
stem2 + pfx,
stem2ua + pfx,
stem2Vi + pfx,
stem2ui + pfx,
).join("<br>"),

      n: "ー",
      f: uniqueForms( 
stem2 + ffx,
stem2Vi + ffx,
stem2ui + ffx,
stem2oö + ffx,
).join("<br>"),

      // 進行相
      sp: uniqueForms(
stem + spfx,
stemVi + spfx,
stemui + spfx,
stemoö + spfx,
).join("<br>"),

      sn: uniqueForms(
stem + snfx,
stemVi + snfx,
stemui + snfx,
stemoö + snfx,
).join("<br>"),

      sf: uniqueForms(
stem + sffx,
stemVi + sffx,
stemui + sffx,
stemoö + sffx,
).join("<br>"),

      // 完了相
      dp: stem2 + dpfxh,
      dn: stem + dnfx,
      df: stem2 + dffx,

      // 反復相,
      mp: stem + mpfxh,
      mn: stemVi + mnfx,
      mf: stemVi + mffx,

      // 飾形
      // 完結相
      ne: stemVi + nefx,
      fe: stem2Vi + fefx,

      // 進行相
      sne: stemVi + snefx,
      sfe: stemVi + sfefx,

      // 完了相
      dne: stem2 + dnefx,
      dfe: stem2 + dfefx,

      // 反復相,
      mne: stem + "h" + mnefx,
      mfe: stemVi +"h" + mfefx,

// 具象形
      // 完結相
      p_gerund: [stem2ua + pfx2 + alva],
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
      mf_gerund: stem2ui + mffxh.slice(0, -1)+ alva,
    }
   } else if (["r", "rh", "l"].includes(ruletype)) {
    return {
      // 完結相
      p: [stem2 + pfx],
      n: "ー",
      f: stem2 + ffx,

      // 進行相
      sp: stemVi + spfx,
      sn: [stemVi + snfx, stemui + snfx],
      sf: stemVi + sffx,

      // 完了相
      dp: stem2 + dpfxh,
      dn: stem + dnfxh,
      df: stem2 + dffxh,

      // 反復相,
      mp: stem + mpfx,
      mn: [stemVi + mnfx, stemui + mnfx],
      mf: [stemVi + mffx, stemui + mffx],

      // 飾形
      // 完結相
      ne: stemVi + nefx,
      fe: [stem2Vi + fefx, stem2ui + fefx],

      // 進行相
      sne: [stemVi + snefx, stemui + snefx],
      sfe: stemVi + sfefx,

      // 完了相
      dne: stem2 + dnefx,
      dfe: stem2 + dfefx,

      // 反復相,
      mne: [stem + mnfx, stemui + mnfx],
      mfe: [stemVi + mfefx, stemui + mfefx],

// 具象形
      // 完結相
      p_gerund: [stem2ua + pfx2 + alva],
      n_gerund: stem2ua + halva,
      f_gerund: stem2ua + ffxp2 + alva,

      // 進行相
      sp_gerund: stem2ui + spfx + alva,
      sn_gerund: [stem2ui + snfx + alva],
      sf_gerund: stem2ui + sffx + alva,

      // 完了相
      dp_gerund: stem2ua + dpfx2 + alva,
      dn_gerund: stem2ua + dnfx + alva,
      df_gerund: stem2ua + dffx2 + alva,

      // 反復相,
      mp_gerund: stem2ua + mpfx + alva,
      mn_gerund: stem2ui + mnfx + alva,
      mf_gerund: stem2ui + mffx.slice(0, -1)+ alva,
    }
  }
}
