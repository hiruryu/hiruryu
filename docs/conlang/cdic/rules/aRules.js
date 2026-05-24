// スマートな形容詞屈折形生成
function getConjA(_word, stem, _long_stem, stem2, _type, ruletype, baseOverrides) {
  if (ruletype === "no") {
      return {};
// ry / ly 基本形
      } else if (ruletype === "ly") {  
        let s = stem + "";         
        let s2 = stem2 + "la";
        let s3 = stem2 + "na"; 
        let p = stem2 + "rå";         
        let p2 = stem2 + "rva";
        let p3 = stem2 + "rma"; 
        if (baseOverrides) {
            if (baseOverrides.s != null) s = baseOverrides.s;
            if (baseOverrides.s2 != null) s2 = baseOverrides.s2;
            if (baseOverrides.s3 != null) s3 = baseOverrides.s3;
            if (baseOverrides.p != null) p = baseOverrides.p;
            if (baseOverrides.p2 != null) p2 = baseOverrides.p2;
            if (baseOverrides.p3 != null) p3 = baseOverrides.p3;
        }    
        return {
          // 単数一致-原級
          s: s + "e",
          f_s: stem2 + "fy",
          d_s: s + "is",
          e_s: s + "ůi",
          ad_s: stem2 + "my",
          h_s: s + "us",
          // 単数一致-比較級
          s2: s2,
          f_s2: s2 + "fy",
          d_s2: s2.slice(0, -1) + "es",
          e_s2: s2.slice(0, -1) + "ůi",
          ad_s2: s2 + "my",
          h_s2: s2.slice(0, -1) + "os",
          // 単数一致-最上級
          s3: s3,
          f_s3: s3 + "fy",
          d_s3: s3.slice(0, -1) + "es",
          e_s3: s3.slice(0, -1) + "ůi",
          ad_s3: s3 + "my",
          h_s3: s3.slice(0, -1) + "os",
          // 単数一致-原級
          p: p,
          f_p: p + "fy",
          d_p: p.slice(0, -1) + "es",
          e_p: p.slice(0, -1) + "ůi",
          ad_p: p + "my",
          h_p: p.slice(0, -1) + "os",
          // 単数一致-比較級
          p2: p2,
          f_p2: p2 + "fy",
          d_p2: p2.slice(0, -1) + "es",
          e_p2: p2.slice(0, -1) + "ůi",
          ad_p2: p2 + "my",
          h_p2: p2.slice(0, -1) + "os",
          // 単数一致-最上級
          p3: p3,
          f_p3: p3 + "fy",
          d_p3: p3.slice(0, -1) + "es",
          e_p3: p3.slice(0, -1) + "ůi",
          ad_p3: p3 + "my",
          h_p3: p3.slice(0, -1) + "os",
        }    
      }
}
