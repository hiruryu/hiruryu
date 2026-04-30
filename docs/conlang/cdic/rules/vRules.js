function getConjV(_word, stem, _long_stem, stem2, _type, ruletype) {
  if (ruletype === "no") {
      return {};
            // p 基本形
         } else if (ruletype === "p") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }     
         // b 基本形
         } else if (ruletype === "b") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }     
          // t 基本形
            } else if (ruletype === "t") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // d 基本形
            } else if (ruletype === "d") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // k 基本形
            } else if (ruletype === "k") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
         // g 基本形
            } else if (ruletype === "g") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        
        // f 基本形
      } else if (ruletype === "f") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // v 基本形
      } else if (ruletype === "v") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // s 基本形
            } else if (ruletype === "s") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // sy 基本形
            } else if (ruletype === "sy") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // s 変則形
            } else if (ruletype === "ls") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // z 基本形
            } else if (ruletype === "z") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
// zy 基本形
            } else if (ruletype === "zy") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // z 変則形
            } else if (ruletype === "lz") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // c 基本形
            } else if (ruletype === "c") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // cy 基本形
            } else if (ruletype === "cy") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
         // sh 基本形
            } else if (ruletype === "sh") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // zh 基本形
            } else if (ruletype === "zh") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // ch 基本形
            } else if (ruletype === "ch") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // m 基本形
      } else if (ruletype === "m") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
         // my 基本形
      } else if (ruletype === "my") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
// n 基本形
      } else if (ruletype === "n") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // ny 基本形
      } else if (ruletype === "ny") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // q 基本形
      } else if (ruletype === "q") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
        // qy 基本形
      } else if (ruletype === "qy") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
       // r / l 基本形
      } else if (ruletype === "r") {      
        return {
          // 完結相
          n: "-", n1: stem + "álva", n2: stem2 + "ey",
          p: stem2 + "al", p1: stem + "alálva", p2: stem + "áley",
          f: stem2 + "ie", f1: stem + "ifálva", f2: stem + "ífey",
          // 完了相
          dn: stem2 + "as", dn1: stem + "asálva", dn2: stem + "ásey",
          dp: stem2 + "ais", dp1: stem + "aisálva", dp2: stem + "aisey",
          df: stem + "iéis", df1: stem + "ieisálva", df2: stem + "iésey",
          // 進行相
          sn: stem2 + "is", sn1: stem + "isálva", sn2: stem + "ísey",
          sp: stem + "ális", sp1: stem + "alisálva", sp2: stem + "álisey",
          sf: stem2 + "ifis", sf1: stem + "ifisálva", sf2: stem + "ifísey",
          // 反復相,
          mn: stem + "óc", mn1: stem + "uicálva", mn2: stem + "ócey",
          mp: stem + "uikóc", mp1: stem + "uikuicálva", mp2: stem + "uikócey",
          mf: stem + "ipóc", mf1: stem + "ipuicálva", mf2: stem + "ipócey",
        }
      }
}
