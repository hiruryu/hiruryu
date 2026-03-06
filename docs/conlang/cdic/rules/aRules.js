// スマートな形容詞屈折形生成
function getConjA(word, stem, type, ruletype) {
  if (ruletype === "no") return {};

  const rules = {
    c0: {
      suffixes: {
        s: "ui", s2: "onna", s3: "uiska",
        fs: "afi", fs2: "afna", fs3: "afuiska",
        es: "ol", es2: "onna", es3: "oluiska",
        ds: "ies", ds2: "ienna", ds3: "iesska",
        ads: "iup", ads2: "iupnui", ads3: "iupuiska",
        nar: "irus"
      }
    }
    // 他の ruletype があればここに追加可能
  };

  const rule = rules[ruletype];
  if (!rule) return {};

  const forms = {};
  for (const key in rule.suffixes) {
    forms[key] = stem + rule.suffixes[key];
  }

  return forms;
}
