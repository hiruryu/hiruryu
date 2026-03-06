// 名詞
function getConjN(word, stem, _long_stem, stem2, type, ruletype) {
    if (ruletype === "no") {
      return {};
            
      // a 基本形
            } else if (ruletype === "der") {      
        const anpC = stem.slice(0, -1) + "ra";         
        const adsC = stem.slice(0, -1) + "ana";
        const adpC = stem.slice(0, -1) + "rana";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          d_ansC: stem.slice(0, -1) + "es",
          l_ansC: stem.slice(0, -1) + "om",
          i_ansC: stem + "is",
          g_ansC: stem.slice(0, -1) + "oi",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "oita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "om",
          i_anpC: anpC + "is",
          g_anpC: anpC.slice(0, -1) + "oi",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "oita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "om",
          i_adsC: adsC + "is",
          g_adsC: adsC.slice(0, -1) + "oi",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "oita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "om",
          i_adpC: adpC + "is",
          g_adpC: adpC.slice(0, -1) + "oi",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "oita",
        }
            }
}