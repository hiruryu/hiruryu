// 名象
function getConjN(word, stem, _long_stem, stem2, type, ruletype) {
    if (ruletype === "no") {
      return {};   
      // a 基本形
            } else if (ruletype === "a") {      
        const anpC = stem.slice(0, -1) + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "uik",
          d_ansC: stem.slice(0, -1) + "es",
          l_ansC: stem.slice(0, -1) + "uim",
          i_ansC: stem + "sh",
          g_ansC: stem.slice(0, -1) + "oy",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "oyta",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "uim",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "oyta",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "uim",
          i_adsC: adsC + "sh",
          g_adsC: adsC.slice(0, -1) + "oy",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "oyta",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "åq",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "uim",
          i_adpC: adpC + "sh",
          g_adpC: adpC.slice(0, -1) + "oy",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "oyta",
        }
        // a 尾高形
            } else if (ruletype === "á") {      
        const ansC = stem;    
        const anpC = stem2 + "ra";         
        const adsC = stem.slice(0, -1) + "åla";
        const adpC = stem2.slice(0, -1) + "årla";      
      
        return {
          // 非限定単数形
          ansC: ansC,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "ók",
          d_ansC: stem.slice(0, -1) + "ás",
          l_ansC: stem.slice(0, -1) + "óm",
          i_ansC: stem + "sh",
          g_ansC: stem.slice(0, -1) + "óy",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "óyta",
          // 非限定複数形
          anpC: anpC,
          e_anpC: stem.slice(0, -1) + "ók",
          d_anpC: stem.slice(0, -1) + "ás",
          l_anpC: stem.slice(0, -1) + "óm",
          i_anpC: stem + "sh",
          g_anpC: stem.slice(0, -1) + "óy",
          v_anpC: stem + "rh",
          in_anpC: stem.slice(0, -1) + "óyta",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: stem.slice(0, -1) + "ók",
          d_adsC: stem.slice(0, -1) + "ás",
          l_adsC: stem.slice(0, -1) + "óm",
          i_adsC: stem + "sh",
          g_adsC: stem.slice(0, -1) + "óy",
          v_adsC: stem + "rh",
          in_adsC: stem.slice(0, -1) + "óyta",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "ók",
          d_adpC: adpC.slice(0, -1) + "ás",
          l_adpC: adpC.slice(0, -1) + "óm",
          i_adpC: adpC + "sh",
          g_adpC: adpC.slice(0, -1) + "óy",
          v_adpC: adpC + "rh",
          in_adpC: adpC.slice(0, -1) + "óyta",
        }     
      // o 基本形
      } else if (ruletype === "o") {      
        const anpC = stem.slice(0, -1) + "ro";         
        const adsC = stem2 + "ól";
        const adpC = stem2 + "ról";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "ok",
          d_ansC: stem2 + "ös",
          l_ansC: stem.slice(0, -1) + "om",
          i_ansC: stem2 + "ösh",
          g_ansC: stem.slice(0, -1) + "uy",
          v_ansC: stem2 + "örh",
          in_ansC: stem.slice(0, -1) + "uyta",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "ok",
          d_anpC: anpC.slice(0, -1) + "ös",
          l_anpC: anpC.slice(0, -1) + "om",
          i_anpC: anpC.slice(0, -1) + "ösh",
          g_anpC: anpC.slice(0, -1) + "uy",
          v_anpC: anpC.slice(0, -1) + "örh",
          in_anpC: anpC.slice(0, -1) + "uyta",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "ffa",
          e_adsC: adsC.slice(0, -1) + "vka",
          d_adsC: adsC.slice(0, -1) + "ves",
          l_adsC: adsC.slice(0, -1) + "vma",
          i_adsC: adsC.slice(0, -1) + "les",
          g_adsC: adsC + "y",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "yra",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "ffa",
          e_adpC: adpC.slice(0, -1) + "vka",
          d_adpC: adpC.slice(0, -1) + "ves",
          l_adpC: adpC.slice(0, -1) + "vma",
          i_adpC: adpC.slice(0, -1) + "les",
          g_adpC: adpC + "y",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "yta",
        }
        // lo 変則形
      } else if (ruletype === "lo") {      
        const anpC = stem.slice(0, -2) + "nd";         
        const adsC = stem.slice(0, -2) + "nna";
        const adpC = stem2 + "röna";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "uik",
          d_ansC: stem.slice(0, -1) + "ös",
          l_ansC: stem.slice(0, -1) + "um",
          i_ansC: stem.slice(0, -1) + "öis",
          g_ansC: stem.slice(0, -1) + "lui",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "uuita",
          // 非限定複数形
          anpC: anpC + "o",
          f_anpC: anpC.slice(0, -1) + "caf",
          e_anpC: anpC + "uik",
          d_anpC: anpC + "es",
          l_anpC: anpC + "om",
          i_anpC: anpC + "ais",
          g_anpC: anpC + "oi",
          v_anpC: anpC + "arh",
          in_anpC: anpC + "oita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "om",
          i_adsC: adsC + "öis",
          g_adsC: adsC.slice(0, -1) + "lui",
          v_adsC: adsC.slice(0, -1) + "rh",
          in_adsC: adsC.slice(0, -1) + "uuita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "om",
          i_adpC: adpC + "öis",
          g_adpC: adpC.slice(0, -1) + "lui",
          v_adpC: adpC.slice(0, -1) + "rh",
          in_adpC: adpC.slice(0, -1) + "uuita",
        }     
    // t 基本形
      } else if (ruletype === "t") {      
        const anpC = stem + "ra";         
        const adsC = stem + "la";
        const adpC = stem + "rla";      
      
        return {
          // 非限定単数形
          ansC: stem,
          f_ansC: stem + "fa",
          e_ansC: stem + "ka",
          d_ansC: stem.slice(0, -1) + "ces",
          l_ansC: stem + "uim",
          i_ansC: stem + "sh",
          g_ansC: stem + "y",
          v_ansC: stem + "arh",
          in_ansC: stem + "yra",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "uim",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "ui",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "uim",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "ui",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "uim",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "ui",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
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
      // yo 基本形

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

