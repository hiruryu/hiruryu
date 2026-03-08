// スマートな形容詞屈折形生成
function getConjA(word, stem, type, ruletype) {
  if (ruletype === "no") return {};

  const rules = {
    k: {
      suffixes: {
        s: "i", s2: "les", s3: "ferl"
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
