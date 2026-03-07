// conjugation.js
function getConjot(word, stem, type, ruletype) {
    if (ruletype === "no") {
      return {};
    } else if (ruletype === "p") {      
        const anpC = stem + "tas";         
        const adsC = stem + "ola";      // adsCを定義     
        const adpC = stem + "otta";      
        return {
          ansC: stem,
          f_ansC: stem + "af",
          e_ansC: stem + "on",
          d_ansC: stem + "e",
          ad_ansC: stem + "ūt",
          g_ansC: stem + "oy",
          v_ansC: stem + "agh",
          in_ansC: stem + "iax",
          // 非限定形可視複数形
          anpC: anpC,
          f_anpC: anpC.slice(0, -1) + "f",
          e_anpC: anpC.slice(0, -2) + "on",
          d_anpC: anpC.slice(0, -2) + "e",
          ad_anpC: anpC.slice(0, -2) + "ūt",
          g_anpC: anpC.slice(0, -2) + "oy",
          v_anpC: anpC.slice(0, -2) + "agh",
          in_anpC: anpC.slice(0, -2) + "iax",
    
          // 限定形可視単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "on",
          d_adsC: adsC.slice(0, -1) + "e",
          ad_adsC: adsC.slice(0, -1) + "ūt",
          g_adsC: adsC.slice(0, -1) + "oy",
          v_adsC: adsC.slice(0, -1) + "agh",
          in_adsC: adsC.slice(0, -1) + "iax",
          // 限定形可視複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "on",
          d_adpC: adpC.slice(0, -1) + "e",
          ad_adpC: adpC.slice(0, -1) + "ūt",
          g_adpC: adpC.slice(0, -1) + "oy",
          v_adpC: adpC.slice(0, -1) + "agh",
          in_adpC: adpC.slice(0, -1) + "iax",
    }
  }
}
