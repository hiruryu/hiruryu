function getConjV(_word, stem, _long_stem, stem2, _type, ruletype) {
  if (ruletype === "no") {
      return {};
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
          // t 基本形
            } else if (ruletype === "t") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "ris",
          dp: stem2 + "ris",
          df: stem2 + "ris",
          // 進行相
          sn: stem2 + "sis",
          sp: stem2 + "sis",
          sf: stem2 + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // d 基本形
            } else if (ruletype === "d") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ris",
          dp: stem + "ris",
          df: stem + "ris",
          // 進行相
          sn: stem + "sis",
          sp: stem + "sis",
          sf: stem + "sis",
          // 反復相,
          mn: stem + "mis",
          mp: stem + "mis",
          mf: stem + "mis",
        }
        // k 基本形
            } else if (ruletype === "k") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ris",
          dp: stem + "ris",
          df: stem + "ris",
          // 進行相
          sn: stem + "sis",
          sp: stem + "sis",
          sf: stem + "sis",
          // 反復相,
          mn: stem + "mis",
          mp: stem + "mis",
          mf: stem + "mis",
        }
         // g 基本形
            } else if (ruletype === "g") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ris",
          dp: stem + "ris",
          df: stem + "ris",
          // 進行相
          sn: stem + "sis",
          sp: stem + "sis",
          sf: stem + "sis",
          // 反復相,
          mn: stem + "mis",
          mp: stem + "mis",
          mf: stem + "mis",
        }
        
        // f 基本形
      } else if (ruletype === "f") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ris",
          dp: stem + "ris",
          df: stem + "ris",
          // 進行相
          sn: stem + "sis",
          sp: stem + "sis",
          sf: stem + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // v 基本形
      } else if (ruletype === "v") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ris",
          dp: stem + "ris",
          df: stem + "ris",
          // 進行相
          sn: stem + "sis",
          sp: stem + "sis",
          sf: stem + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // s 基本形
            } else if (ruletype === "s") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "tis",
          dp: stem2 + "tis",
          df: stem2 + "tis",
          // 進行相
          sn: stem2 + "sis",
          sp: stem2 + "sis",
          sf: stem2 + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // sy 基本形
            } else if (ruletype === "sy") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2.slice(0,-1) + "tyis",
          dp: stem2.slice(0,-1) + "tyis",
          df: stem2.slice(0,-1) + "tyis",
          // 進行相
          sn: stem2 + "is",
          sp: stem2 + "is",
          sf: stem2 + "is",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // s 変則形
            } else if (ruletype === "ls") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "tis",
          dp: stem2 + "tis",
          df: stem2 + "tis",
          // 進行相
          sn: stem2 + "sis",
          sp: stem2 + "sis",
          sf: stem2 + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // z 基本形
            } else if (ruletype === "z") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "dís",
          dp: stem + "dís",
          df: stem + "dís",
          // 進行相
          sn: stem + "sís",
          sp: stem + "sís",
          sf: stem + "sís",
          // 反復相,
          mn: stem + "mís",
          mp: stem + "mís",
          mf: stem + "mís",
        }
// zy 基本形
            } else if (ruletype === "zy") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2.slice(0,-1) + "dyis",
          dp: stem2.slice(0,-1) + "dyis",
          df: stem2.slice(0,-1) + "dyis",
          // 進行相
          sn: stem2 + "is",
          sp: stem2 + "is",
          sf: stem2 + "is",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // z 変則形
            } else if (ruletype === "lz") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "tis",
          dp: stem2 + "tis",
          df: stem2 + "tis",
          // 進行相
          sn: stem2 + "sis",
          sp: stem2 + "sis",
          sf: stem2 + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // c 基本形
            } else if (ruletype === "c") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "tis",
          dp: stem2 + "tis",
          df: stem2 + "tis",
          // 進行相
          sn: stem2 + "sis",
          sp: stem2 + "sis",
          sf: stem2 + "sis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // cy 基本形
            } else if (ruletype === "cy") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2.slice(0,-1) + "tyis",
          dp: stem2.slice(0,-1) + "tyis",
          df: stem2.slice(0,-1) + "tyis",
          // 進行相
          sn: stem2 + "is",
          sp: stem2 + "is",
          sf: stem2 + "is",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
         // sh 基本形
            } else if (ruletype === "sh") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "ris",
          dp: stem2 + "ris",
          df: stem2 + "ris",
          // 進行相
           sn: stem2.slice(0,-1) + "shis",
          sp: stem2.slice(0,-1) + "shis",
          sf: stem2.slice(0,-1) + "shis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // zh 基本形
            } else if (ruletype === "zh") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "ris",
          dp: stem2 + "ris",
          df: stem2 + "ris",
          // 進行相
           sn: stem2.slice(0,-1) + "zhis",
          sp: stem2.slice(0,-1) + "zhis",
          sf: stem2.slice(0,-1) + "zhis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // ch 基本形
            } else if (ruletype === "ch") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem2 + "ris",
          dp: stem2 + "ris",
          df: stem2 + "ris",
          // 進行相
           sn: stem2.slice(0,-1) + "chis",
          sp: stem2.slice(0,-1) + "chis",
          sf: stem2.slice(0,-1) + "chis",
          // 反復相,
          mn: stem2 + "mis",
          mp: stem2 + "mis",
          mf: stem2 + "mis",
        }
        // m 基本形
      } else if (ruletype === "m") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ódis",
          dp: stem + "ódis",
          df: stem + "ódis",
          // 進行相
          sn: stem + "ósis",
          sp: stem + "ósis",
          sf: stem + "ósis",
          // 反復相,
          mn: stem + "ómis",
          mp: stem + "ómis",
          mf: stem + "ómis",
        }
         // my 基本形
      } else if (ruletype === "my") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ódis",
          dp: stem + "ódis",
          df: stem + "ódis",
          // 進行相
          sn: stem + "ósis",
          sp: stem + "ósis",
          sf: stem + "ósis",
          // 反復相,
          mn: stem + "ómis",
          mp: stem + "ómis",
          mf: stem + "ómis",
        }
// n 基本形
      } else if (ruletype === "n") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ódis",
          dp: stem + "ódis",
          df: stem + "ódis",
          // 進行相
          sn: stem + "ósis",
          sp: stem + "ósis",
          sf: stem + "ósis",
          // 反復相,
          mn: stem + "ómis",
          mp: stem + "ómis",
          mf: stem + "ómis",
        }
        // ny 基本形
      } else if (ruletype === "ny") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ódis",
          dp: stem + "ódis",
          df: stem + "ódis",
          // 進行相
          sn: stem + "ósis",
          sp: stem + "ósis",
          sf: stem + "ósis",
          // 反復相,
          mn: stem + "ómis",
          mp: stem + "ómis",
          mf: stem + "ómis",
        }
        // q 基本形
      } else if (ruletype === "q") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ódis",
          dp: stem + "ódis",
          df: stem + "ódis",
          // 進行相
          sn: stem + "ósis",
          sp: stem + "ósis",
          sf: stem + "ósis",
          // 反復相,
          mn: stem + "ómis",
          mp: stem + "ómis",
          mf: stem + "ómis",
        }
        // qy 基本形
      } else if (ruletype === "qy") {      
        return {
          // 完結相
          n: "-",
          p: stem + "ók",
          f: stem + "yíf",
          // 完了相
          dn: stem + "ódis",
          dp: stem + "ódis",
          df: stem + "ódis",
          // 進行相
          sn: stem + "ósis",
          sp: stem + "ósis",
          sf: stem + "ósis",
          // 反復相,
          mn: stem + "ómis",
          mp: stem + "ómis",
          mf: stem + "ómis",
        }
      }
}
