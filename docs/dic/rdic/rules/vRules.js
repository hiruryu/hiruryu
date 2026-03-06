function getConjV(_word, stem, _long_stem, stem2, _type, ruletype) {
  if (ruletype === "no") {
      return {};
            
          // t, s, sh, n 基本形
            } else if (ruletype === "der") {      
        return {
          // 一人称完結相
          n1: stem,
          n2: stem.replace("é", "í"),
          n3: stem.slice(0, -1),
          p1: stem + "",
          p2: stem.replace("é", "í"),
          p3: stem.slice(0, -1),
          f1: stem + "íf",
          f2: stem + "íf",
          f3: stem + "íf",
          // 一人称完了相
          dn1: stem,
          dn2: stem.replace("é", "í"),
          dn3: stem.slice(0, -1),
          dp1: stem + "ót",
          dp2: stem.replace("é", "í"),
          dp3: stem.slice(0, -1),
          df1: stem + "íf",
          df2: stem + "íf",
          df3: stem + "íf",
          // 一人称進行相
          sn1: stem,
          sn2: stem.replace("é", "í"),
          sn3: stem.slice(0, -1),
          sp1: stem + "ót",
          sp2: stem.replace("é", "í"),
          sp3: stem.slice(0, -1),
          sf1: stem + "íf",
          sf2: stem + "íf",
          sf3: stem + "íf"
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