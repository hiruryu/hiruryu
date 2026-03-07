function getConjV(_word, stem, _long_stem, stem2, _type, ruletype) {
  if (ruletype === "no") {
      return {};
            
          // t, s, sh, n 基本形
            } else if (ruletype === "t") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ót",
          f: stem + "íf",
          // 完了相
          dn: stem + "su",
          dp: stem + "sót",
          df: stem + "síf",
          // 進行相
          sn: stem + "ra",
          sp: stem + "rót",
          sf: stem + "ríf",
          // 反復相,
          mn: stem2 + "uim",
          mp: stem2 + "muit",
          mf: stem2 + "puif",
        }

          // p 基本形
         } else if (ruletype === "p") {      
        return {
          // 完結相
          n: "-",
          p: stem.slice(0, -1) + "fót",
          f: stem.slice(0, -1) + "fíf",
          // 完了相
          dn: "ri" + stem2,
          dp: "ri" + stem.slice(0, -1) + "fót",
          df: "ri" + stem.slice(0, -1) + "fíf",
          // 進行相
          sn: "si" + stem2,
          sp: "si" + stem.slice(0, -1) + "fót",
          sf: "si" + stem.slice(0, -1) + "fíf",
          // 反復相,
          mn: "mi" + stem2,
          mp: "mi" + stem.slice(0, -1) + "fót",
          mf: "mi" + stem.slice(0, -1) + "fíf",
        }     
         // b 基本形
         } else if (ruletype === "b") {      
        return {
          // 完結相
          n: "-",
          p: stem.slice(0, -1) + "vót",
          f: stem.slice(0, -1) + "víp",
          // 完了相
          dn: "ri" + stem2,
          dp: "ri" + stem.slice(0, -1) + "vót",
          df: "ri" + stem.slice(0, -1) + "víp",
          // 進行相
          sn: "si" + stem2,
          sp: "si" + stem.slice(0, -1) + "vót",
          sf: "si" + stem.slice(0, -1) + "víp",
          // 反復相,
          mn: "mi" + stem2,
          mp: "mi" + stem.slice(0, -1) + "vót",
          mf: "mi" + stem.slice(0, -1) + "víp",
        }     
         // k 基本形
         } else if (ruletype === "k") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ót",
          f: stem + "íf",
          // 完了相
          dn: "ri" + stem2,
          dp: "ri" + stem + "ót",
          df: "ri" + stem + "yíf",
          // 進行相
          sn: "si" + stem2,
          sp: "si" + stem + "ót",
          sf: "si" + stem + "yíf",
          // 反復相,
          mn: "mi" + stem2,
          mp: "mi" + stem + "ót",
          mf: "mi" + stem + "yíf",
        }     
         // g 基本形
         } else if (ruletype === "g") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ót",
          f: stem + "yíp",
          // 完了相
          dn: "ri" + stem2,
          dp: "ri" + stem + "ót",
          df: "ri" + stem + "yíp",
          // 進行相
          sn: "si" + stem2,
          sp: "si" + stem + "ót",
          sf: "si" + stem + "yíp",
          // 反復相,
          mn: "mi" + stem2,
          mp: "mi" + stem + "ót",
          mf: "mi" + stem + "yíp",
        }    
         // q 基本形
         } else if (ruletype === "q") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ót",
          f: stem + "íf",
          // 完了相
          dn: "ri" + stem2,
          dp: "ri" + stem + "ót",
          df: "ri" + stem + "yíf",
          // 進行相
          sn: "si" + stem2,
          sp: "si" + stem + "ót",
          sf: "si" + stem + "yíf",
          // 反復相,
          mn: "mi" + stem2,
          mp: "mi" + stem + "ót",
          mf: "mi" + stem + "yíf",
        }      
      }
}
