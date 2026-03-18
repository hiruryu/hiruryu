function getConjA(_word, stem, _long_stem, stem2, _type, ruletype) {
  if (ruletype === "no") {
      return {};
            // p 基本形
         } else if (ruletype === "p") {      
        return {
          s: stem + "e", s2: stem + "fóte", s3: stem + "fóte",
          fs: stem + "e", fs2: stem + "fóte", fs3: stem + "fóte",
          on: stem + "e", on2: stem + "fóte", on3: stem + "fóte",
          es: stem + "e", es2: stem + "fóte", es3: stem + "fóte",
          ds: stem + "e", ds2: stem + "fóte", ds3: stem + "fóte",
          ads: stem + "e", ads2: stem + "fóte", ads3: stem + "fóte",
        }
      } else if (ruletype === "g") {      
        return {
          s: stem + "hie", s2: stem2 + "hiélle", s3: stem2 + "hiónne",
          fs: stem + "hve", fs2: stem2 + "vélle", fs3: stem2 + "vónne",
          on: stem + "xhe", on2: stem2 + "fóte", on3: stem + "fóte",
          es: stem + "e", es2: stem2 + "fóte", es3: stem + "fóte",
          ds: stem + "e", ds2: stem2 + "fóte", ds3: stem + "fóte",
          ads: stem + "e", ads2: stem2 + "fóte", ads3: stem + "fóte",
        }     
      }
}
