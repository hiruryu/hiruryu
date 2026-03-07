// 名象
function getConjN(word, stem, _long_stem, stem2, type, ruletype) {
    if (ruletype === "no") {
      return {};   
      // a 基本形
            } else if (ruletype === "a") {      
        const anpC = stem.slice(0, -1) + "ra";         
        const adsC = stem.slice(0, -1) + "ana";
        const adpC = stem.slice(0, -1) + "rana";      
      
        return {
          // 非限定単数形
          ansC: stem,
          t_ansC: stem + "f",
          y_ansC: stem.slice(0, -1) + "on",
          d_ansC: stem.slice(0, -1) + "es",
          f_ansC: stem.slice(0, -1) + "om",
          v_ansC: stem + "rh",
          // 非限定複数形
          anpC: anpC,
          t_anpC: anpC + "f",
          y_anpC: anpC.slice(0, -1) + "on",
          d_anpC: anpC.slice(0, -1) + "es",
          f_anpC: anpC.slice(0, -1) + "om",
          v_anpC: anpC + "rh",
    
          // 限定単数形
          adsC: adsC,
          t_adsC: adsC.slice(0, -1) + "af",
          y_adsC: adsC.slice(0, -1) + "on",
          d_adsC: adsC.slice(0, -1) + "es",
          f_adsC: adsC.slice(0, -1) + "om",
          v_adsC: adsC.slice(0, -1) + "arh",

          // 限定複数形
          adpC: adpC,
          t_adpC: adpC.slice(0, -1) + "af",
          y_adpC: adpC.slice(0, -1) + "on",
          d_adpC: adpC.slice(0, -1) + "es",
          f_adpC: adpC.slice(0, -1) + "om",
          v_adpC: adpC.slice(0, -1) + "arh",
        }
    }
}
