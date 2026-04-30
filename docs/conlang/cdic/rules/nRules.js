// 名象
function getConjN(word, stem, _long_stem, stem2, type, ruletype, baseOverrides) {
    if (ruletype === "not") {
      return {ansC: word};
      // a 基本形
            } else if (ruletype === "a") {      
        let anpC = stem + "ra";         
        let adsC = stem2 + "óla";
        let adpC = stem2 + "róla";
        if (baseOverrides) {
            if (baseOverrides.anpC != null) anpC = baseOverrides.anpC;
            if (baseOverrides.adsC != null) adsC = baseOverrides.adsC;
            if (baseOverrides.adpC != null) adpC = baseOverrides.adpC;
        }
        
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "af",
          e_ansC: stem + "uik",
          d_ansC: stem + "es",
          l_ansC: stem + "am",
          i_ansC: stem + "ash",
          g_ansC: stem + "oy",
          v_ansC: stem + "arh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "am",
          i_adsC: adsC + "sh",
          g_adsC: adsC.slice(0, -1) + "oy",
          v_adsC: adsC.slice(0, -1) + "arh",
          in_adsC: adsC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "am",
          i_adpC: adpC + "sh",
          g_adpC: adpC.slice(0, -1) + "oy",
          v_adpC: adpC.slice(0, -1) + "arh",
          in_adpC: adpC.slice(0, -1) + "uita",
        }
        // a 尾高形
            } else if (ruletype === "á") {       
        const anpC = stem2 + "ra";         
        const adsC = stem.slice(0, -1) + "åla";
        const adpC = stem2.slice(0, -1) + "årla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "ók",
          d_ansC: stem.slice(0, -1) + "ás",
          l_ansC: stem.slice(0, -1) + "óm",
          i_ansC: stem + "sh",
          g_ansC: stem.slice(0, -1) + "óy",
          v_ansC: stem + "rh",
          in_ansC: stem.slice(0, -1) + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: adsC.slice(0, -1) + "af",
          e_anpC: stem.slice(0, -1) + "ók",
          d_anpC: stem.slice(0, -1) + "ás",
          l_anpC: stem.slice(0, -1) + "óm",
          i_anpC: stem + "sh",
          g_anpC: stem.slice(0, -1) + "óy",
          v_anpC: stem + "rh",
          in_anpC: stem.slice(0, -1) + "uita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC.slice(0, -1) + "af",
          e_adsC: stem.slice(0, -1) + "ók",
          d_adsC: stem.slice(0, -1) + "ás",
          l_adsC: stem.slice(0, -1) + "óm",
          i_adsC: stem + "sh",
          g_adsC: stem.slice(0, -1) + "óy",
          v_adsC: stem + "rh",
          in_adsC: stem.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC.slice(0, -1) + "af",
          e_adpC: adpC.slice(0, -1) + "ók",
          d_adpC: adpC.slice(0, -1) + "ás",
          l_adpC: adpC.slice(0, -1) + "óm",
          i_adpC: adpC + "sh",
          g_adpC: adpC.slice(0, -1) + "óy",
          v_adpC: adpC + "rh",
          in_adpC: adpC.slice(0, -1) + "uita",
        }     
      // o 基本形
      } else if (ruletype === "o") {      
        const anpC = stem.slice(0, -1) + "ro";         
        const adsC = stem2 + "ól";
        const adpC = stem2 + "ról";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "f",
          e_ansC: stem.slice(0, -1) + "ok",
          d_ansC: stem2 + "ös",
          l_ansC: stem.slice(0, -1) + "om",
          i_ansC: stem2 + "ösh",
          g_ansC: stem.slice(0, -1) + "uiy",
          v_ansC: stem2 + "örh",
          in_ansC: stem.slice(0, -1) + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "ok",
          d_anpC: anpC.slice(0, -1) + "ös",
          l_anpC: anpC.slice(0, -1) + "om",
          i_anpC: anpC.slice(0, -1) + "ösh",
          g_anpC: anpC.slice(0, -1) + "uiy",
          v_anpC: anpC.slice(0, -1) + "örh",
          in_anpC: anpC.slice(0, -1) + "uita",
    
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
          ansC: word,
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
      // p 基本形
      } else if (ruletype === "p") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem.slice(0, -1) + "faf",
          e_ansC: stem.slice(0, -1) + "fuik",
          d_ansC: stem.slice(0, -1) + "fes",
          l_ansC: stem.slice(0, -1) + "fam",
          i_ansC: stem.slice(0, -1) + "fash",
          g_ansC: stem + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "oy",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "oy",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
        }
        // b 基本形
      } else if (ruletype === "b") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem.slice(0, -1) + "vaf",
          e_ansC: stem.slice(0, -1) + "vuik",
          d_ansC: stem.slice(0, -1) + "ves",
          l_ansC: stem.slice(0, -1) + "vam",
          i_ansC: stem.slice(0, -1) + "vash",
          g_ansC: stem + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "oy",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "oy",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
        }
    // t 基本形
      } else if (ruletype === "t") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem.slice(0, -1) + "caf",
          e_ansC: stem + "uik",
          d_ansC: stem.slice(0, -1) + "ces",
          l_ansC: stem + "am",
          i_ansC: stem + "sh",
          g_ansC: stem + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem.slice(0, -1) + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "oy",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "oy",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
        }
 // d 基本形
      } else if (ruletype === "d") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem.slice(0, -1) + "xaf",
          e_ansC: stem + "uik",
          d_ansC: stem.slice(0, -1) + "xes",
          l_ansC: stem + "am",
          i_ansC: stem + "ash",
          g_ansC: stem.slice(0, -1) + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "oy",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "oy",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
        }
      // k 基本形
      } else if (ruletype === "k") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem.slice(0, -1) + "haf",
          e_ansC: stem + "uik",
          d_ansC: stem.slice(0, -1) + "hes",
          l_ansC: stem + "am",
          i_ansC: stem + "ash",
          g_ansC: stem + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "oy",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "oy",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
        }
      // m 基本形
      } else if (ruletype === "m") {      
        const anpC = stem + "bra";         
        const adsC = stem + "bla";
        const adpC = stem2 + "bróla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "fa",
          e_ansC: stem + "ka",
          d_ansC: stem + "es",
          l_ansC: stem + "am",
          i_ansC: stem + "ash",
          g_ansC: stem + "ui",
          v_ansC: stem + "arh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "ui",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "ui",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: anpC.slice(0, -1) + "es",
          l_adpC: anpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: anpC.slice(0, -1) + "ui",
          v_adpC: anpC + "rh",
          in_adpC: anpC.slice(0, -1) + "uita",
        }

    // n 基本形
      } else if (ruletype === "n") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "af",
          e_ansC: stem + "uik",
          d_ansC: stem + "es",
          l_ansC: stem + "am",
          i_ansC: stem + "ash",
          g_ansC: stem + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem + "oyta",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "oyta",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: anpC.slice(0, -1) + "es",
          l_adsC: anpC.slice(0, -1) + "am",
          i_adsC: anpC + "sh",
          g_adsC: anpC.slice(0, -1) + "oy",
          v_adsC: anpC + "rh",
          in_adsC: anpC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "am",
          i_adpC: anpC + "sh",
          g_adpC: adpC.slice(0, -1) + "oy",
          v_adpC: adpC + "rh",
          in_adpC: adpC.slice(0, -1) + "uita",
        }
        // no 基本形
      } else if (ruletype === "no") {      
        const anpC1 = stem.slice(0, -1) + "llo";   
        const anpC2 = stem2.slice(0, -1) + "llo";      
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "of",
          e_ansC: stem + "ok",
          d_ansC: stem2 + "ös",
          l_ansC: stem + "om",
          i_ansC: stem2 + "ösh",
          g_ansC: stem + "uiy",
          v_ansC: stem2 + "örh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC1,
          f_anpC: anpC1 + "f",
          e_anpC: anpC1.slice(0, -1) + "ok",
          d_anpC: anpC2.slice(0, -1) + "ös",
          l_anpC: anpC1.slice(0, -1) + "om",
          i_anpC: anpC2.slice(0, -1) + "ösh",
          g_anpC: anpC1.slice(0, -1) + "uiy",
          v_anpC: anpC2.slice(0, -1) + "örh",
          in_anpC: anpC1.slice(0, -1) + "uita",
    
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "am",
          i_adsC: adsC + "sh",
          g_adsC: adsC.slice(0, -1) + "oy",
          v_adsC: adsC + "rh",
          in_adsC: adsC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "am",
          i_adpC: adpC + "sh",
          g_adpC: adpC.slice(0, -1) + "oy",
          v_adpC: adpC + "rh",
          in_adpC: adpC.slice(0, -1) + "uita",
        }
         // q 基本形
            } else if (ruletype === "q") {
        const anpC = stem.slice(0, -2) + "lla";         
        const adsC = stem2.slice(0, -1) + "ana";
        const adpC = stem2.slice(0, -2) + "llana";      
      
        return {
          // 非限定単数形
          ansC: word,
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
         // r / l 基本形
            } else if (ruletype === "r") {
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";    
      
        return {
          // 非限定単数形
          ansC: word,
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
        // y 基本形
        } else if (ruletype === "y") {      
        const anpC = stem + "ra";         
        const adsC = stem2 + "óla";
        const adpC = stem2 + "róla";      
      
        return {
          // 非限定単数形
          ansC: word,
          f_ansC: stem + "af",
          e_ansC: stem + "uik",
          d_ansC: stem + "es",
          l_ansC: stem + "am",
          i_ansC: stem + "sh",
          g_ansC: stem + "oy",
          v_ansC: stem2 + "árh",
          in_ansC: stem + "uita",
          // 非限定複数形
          anpC: anpC,
          f_anpC: anpC + "f",
          e_anpC: anpC.slice(0, -1) + "uik",
          d_anpC: anpC.slice(0, -1) + "es",
          l_anpC: anpC.slice(0, -1) + "am",
          i_anpC: anpC + "sh",
          g_anpC: anpC.slice(0, -1) + "oy",
          v_anpC: anpC + "rh",
          in_anpC: anpC.slice(0, -1) + "uita",
          // 限定単数形
          adsC: adsC,
          f_adsC: adsC + "f",
          e_adsC: adsC.slice(0, -1) + "uik",
          d_adsC: adsC.slice(0, -1) + "es",
          l_adsC: adsC.slice(0, -1) + "am",
          i_adsC: adsC + "sh",
          g_adsC: adsC.slice(0, -1) + "oy",
          v_adsC: adsC + "rh",
          in_adsC: adsC.slice(0, -1) + "uita",
          // 限定複数形
          adpC: adpC,
          f_adpC: adpC + "f",
          e_adpC: adpC.slice(0, -1) + "uik",
          d_adpC: adpC.slice(0, -1) + "es",
          l_adpC: adpC.slice(0, -1) + "am",
          i_adpC: adpC + "sh",
          g_adpC: adpC.slice(0, -1) + "oy",
          v_adpC: adpC + "rh",
          in_adpC: adpC.slice(0, -1) + "uita",
        }
    }
}
