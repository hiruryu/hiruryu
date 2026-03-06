function getConjA(word, stem, type, ruletype) {
  if (ruletype === "no") return {};

  const rules = {
    t: {
      suffixes: {
        s: "e", s2: "onna", s3: "uiska",
        fs: "afie", fs2: "afna", fs3: "afuiska",
        on: "ashie", on2: "ashna", on3: "ashuika",
        es: "ol", es2: "onna", es3: "oluiska",
        ds: "ies", ds2: "ienna", ds3: "iesska",
        ads: "iup", ads2: "iupnui", ads3: "iupuiska",
        nar: "os"
      }
    },
    k: {
      suffixes: {
        s: "e", s2: "onna", s3: "uiska",
        fs: "afie", fs2: "afna", fs3: "afuiska",
        on: "ashie", on2: "ashna", on3: "ashuika",
        es: "ol", es2: "onna", es3: "oluiska",
        ds: "ies", ds2: "ienna", ds3: "iesska",
        ads: "iup", ads2: "iupnui", ads3: "iupuiska",
        nar: "os"
      }
    }
    // 他の ruletype があればここに追加
  };

  const rule = rules[ruletype];
  if (!rule) return {};

  const forms = {};
  for (const key in rule.suffixes) {
    forms[key] = stem + rule.suffixes[key];
  }

  return forms;
}


