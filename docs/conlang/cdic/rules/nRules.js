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
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "on",
          d_ansC: stem.slice(0, -1) + "es",
          l_ansC: stem.slice(0, -1) + "om",
          i_ansC: stem + "is",
          g_ansC: stem.slice(0, -1) + "oi",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "oita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "on",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "om",
          i_anpC: anpC + "is",
          g_anpC: anpC.slice(0, -1) + "oi",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "oita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "on",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "om",
          i_adsC: adsC + "is",
          g_adsC: adsC.slice(0, -1) + "oi",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "oita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "on",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "om",
          i_adpC: adpC + "is",
          g_adpC: adpC.slice(0, -1) + "oi",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "oita",
        }
        // a 尾高形
            } else if (ruletype === "á") {      
        const ansC = stem + "q";    
        const anpC = stem2 + "ra";         
        const adsC = stem + "na";
        const adpC = stem2 + "rma";      
      
        return {
          // 非限定単数形
          ansC: ansC,
          f_ansC: ansC + "uaf",
          e_ansC: ansC + "uon",
          d_ansC: ansC + "ues",
          l_ansC: ansC + "uom",
          i_ansC: ansC + "uais",
          g_ansC: ansC + "ui",
          v_ansC: ansC + "uarh",
          in_ansC: ansC + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "on",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "om",
          i_anpC: anpC + "is",
          g_anpC: anpC.slice(0, -1) + "oi",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "oita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "on",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "om",
          i_adsC: adsC + "is",
          g_adsC: adsC.slice(0, -1) + "oi",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "oita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "on",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "om",
          i_adpC: adpC + "is",
          g_adpC: adpC.slice(0, -1) + "oi",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "oita",
        }     
      // o 基本形
      } else if (ruletype === "o") {      
        const anpC = stem.slice(0, -1) + "ra";         
        const adsC = stem2 + "öna";
        const adpC = stem2 + "röna";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "un",
          d_ansC: stem.slice(0, -1) + "ös",
          l_ansC: stem.slice(0, -1) + "um",
          i_ansC: stem.slice(0, -1) + "öis",
          g_ansC: stem.slice(0, -1) + "uui",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "uuita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "un",
          d_anpC: anpC.slice(0, -1) + "ös",
          l_anpC: anpC.slice(0, -1) + "um",
          i_anpC: anpC.slice(0, -1) + "öis",
          g_anpC: anpC.slice(0, -1) + "uui",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uuita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "un",
          d_adsC: adsC.slice(0, -1) + "ös",
          l_adsC: adsC.slice(0, -1) + "um",
          i_adsC: adsC.slice(0, -1) + "öis",
          g_adsC: adsC.slice(0, -1) + "uui",
          v_adsC: adsC.slice(0, -1) + "rh",
          in_adsC: adsC.slice(0, -1) + "uuita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "un",
          d_adpC: adpC.slice(0, -1) + "ös",
          l_adpC: adpC.slice(0, -1) + "um",
          i_adpC: adpC.slice(0, -1) + "öis",
          g_adpC: adpC.slice(0, -1) + "uui",
          v_adpC: adpC.slice(0, -1) + "rh",
          in_adpC: adpC.slice(0, -1) + "uuita",
        }
        // lo 変則形
      } else if (ruletype === "lo") {      
        const anpC = stem.slice(0, -2) + "nt";         
        const adsC = stem.slice(0, -2) + "nna";
        const adpC = stem2 + "röna";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "un",
          d_ansC: stem.slice(0, -1) + "ös",
          l_ansC: stem.slice(0, -1) + "um",
          i_ansC: stem.slice(0, -1) + "öis",
          g_ansC: stem.slice(0, -1) + "uui",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "uuita",
          // 非限定複数形
          anpC: anpC + "is",
          f_anpC: anpC.slice(0, -1) + "caf",
          e_anpC: anpC + "on",
          d_anpC: anpC + "es",
          l_anpC: anpC + "om",
          i_anpC: anpC + "ais",
          g_anpC: anpC + "oi",
          v_anpC: anpC + "arh",
          in_anpC: anpC + "oita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "on",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "om",
          i_adsC: adsC + "öis",
          g_adsC: adsC.slice(0, -1) + "uui",
          v_adsC: adsC.slice(0, -1) + "rh",
          in_adsC: adsC.slice(0, -1) + "uuita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "on",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "om",
          i_adpC: adpC + "öis",
          g_adpC: adpC.slice(0, -1) + "uui",
          v_adpC: adpC.slice(0, -1) + "rh",
          in_adpC: adpC.slice(0, -1) + "uuita",
        }     

         // na 基本形
            } else if (ruletype === "na") {
        const anpC = stem.slice(0, -2) + "lla";         
        const adsC = stem.slice(0, -1) + "ana";
        const adpC = stem.slice(0, -2) + "llana";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "on",
          d_ansC: stem.slice(0, -1) + "es",
          l_ansC: stem.slice(0, -1) + "om",
          i_ansC: stem + "is",
          g_ansC: stem.slice(0, -1) + "oi",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "oita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "on",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "om",
          i_anpC: anpC + "is",
          g_anpC: anpC.slice(0, -1) + "oi",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "oita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "on",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "om",
          i_adsC: adsC + "is",
          g_adsC: adsC.slice(0, -1) + "oi",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "oita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "on",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "om",
          i_adpC: adpC + "is",
          g_adpC: adpC.slice(0, -1) + "oi",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "oita",
        }
      // io 基本形

      // p 基本形
      } else if (ruletype === "p") {      
        const anpC = stem + "tas";         
        const adsC = stem + "ola";      // adsCを定義     
        const adpC = stem + "otta";      
      
        return {
          ansC: stem,
          f_ansC: stem.slice(0, -1) + "faf",
          e_ansC: stem + "on",
          d_ansC: stem + "e",
          l_ansC: stem + "ūt",
          in_ansC: stem + "ūt",
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
          v_anpC: anpC.slice(0, -2) + "arh",
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
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "iax",
        }}
}