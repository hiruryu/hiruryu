function getConjV(_word, stem, _long_stem, stem2, _type, ruletype, baseOverrides) {

  const C = {
      p: "f", b: "v",
      t: "c", d: "x",
      k: "ch", g: "xh",
      h: "sh", q: "qn",
      y: "zh",
    };
    const V1 = {
      "ó": "ié",
      "ú": "í",
      "yó": "yá",
      "yú": "yí",
      "úi": "í",
      "yúi": "yí",
      "ǻ": "áy",
      "ǻl": "ály"
    };
    const V2 = {
      "yo": "ya",
      "yi": "yi",
      "yui": "yi",
      "o": "ie",
      "i": "i",
      "ui": "i",
      "å": "ay",
      "ål": "aly",
      "yi": "yi",
    };
    const V3 = {
      "yo": "ya",
      "yi": "yui",
      "yui": "yui",
      "o": "ie",
      "i": "iui",
      "ui": "ui",
      "å": "ay",
      "ål": "aly",
      "yi": "yi",
    };

  if (ruletype === "no") {
    return {};
    // s / z / c / h 基本形
  } else if (["s", "z", "c", "x", "h"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB+ "ílle",
      sf: sA + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: sA + "imik"
    }
    // f / v 基本形（唇音）
  } else if (["f", "v"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "ík",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB+ "ílle",
      sf: sA + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: sA + "imik"
    }

    // p / b 基本形（唇音）
  } else if (["p", "b"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "hól",
      f: sB + "hík",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "his",
      sp: sB + "hílle",
      sf: sB + "hísfe",
      // 反復相,
      mn: stem2 + "huim",
      mp: stem2 + "hmol",
      mf: sA + "hmik",
    }

    // t 基本形
  } else if (["t"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "hól",
      f: sB + "híp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "his",
      sp: sB + "hílle",
      sf: sB + "hísfe",
      // 反復相,
      mn: stem2 + "huim",
      mp: stem2 + "hmol",
      mf: sA + "hmik",
    }

    // t 複子音形
  } else if (["tt"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "hól",
      f: sB + "híp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "his",
      sp: sB + "hílle",
      sf: sB + "hísfe",
      // 反復相,
      mn: stem2 + "huim",
      mp: stem2 + "huimol",
      mf: sA + "himik",
    }

    // k 基本形
  } else if (["k"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-1) + "ch";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-1) + "ch";

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB + "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "mol",
      mf: sA + "mik",
    }

    // d 基本形
  } else if (["d"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-1) + "x";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-1) + "x";
    const sC = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V3[v] ?? "");
      }
    ).slice(0,-1) + "x";


    return {
      // 完結相
      n: "-",
      p: sC + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB + "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "mol",
      mf: sA + "mik",
    }

    // g 基本形
  } else if (["g"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-1) + "xh";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-1) + "xh";
    const sC = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V3[v] ?? "");
      }
    ).slice(0,-1) + "xh";

    return {
      // 完結相
      n: "-",
      p: sC + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB + "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "mol",
      mf: sA + "mik",
    }

    // h 基本形
  } else if (["h"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-1) + "sh";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-1) + "sh";
    const sC = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V3[v] ?? "");
      }
    ).slice(0,-1) + "sh";


    return {
      // 完結相
      n: "-",
      p: sC + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB + "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "mol",
      mf: sA + "mik",
    }

    // sh / zh / ch / xh 基本形（反舌音）
  } else if (["sh", "zh", "ch", "xh", "rh"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "es",
      sp: sB+ "élle",
      sf: sA + "ésfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: sA + "imik"
    }
    // m 基本形
  } else if (["m"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "hól",
      f: sB + "hík",
      // 完了相
      dn: sA + "hris",
      dp: stem2 + "hrol",
      df: sA + "hrip",
      // 進行相
      sn: sA + "his",
      sp: sB + "hílle",
      sf: sB + "hísfe",
      // 反復相,
      mn: stem2 + "huim",
      mp: stem2 + "mol",
      mf: sA + "mik",
    }

    // n 基本形
  } else if (["n"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: stem2 + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "dis",
      sp: sB+ "dílle",
      sf: sA + "dísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "uimol",
      mf: sA + "imik"
    }
    // q 基本形
  } else if (["q"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: sC + "nól",
      f: stem + "níp",
      // 完了相
      dn: stem2 + "gis",
      dp: stem2 + "gol",
      df: stem2 + "gip",
      // 進行相
      sn: stem2 + "nis",
      sp: stem + "nílle",
      sf: stem + "nísfe",
      // 反復相,
      mn: stem2 + "nuim",
      mp: stem2 + "nuimol",
      mf: stem2 + "nimik",
    }
    // r 基本形（流音）
  } else if (["r"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-1)  + "d";
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-1)  + "d";

    return {
      // 完結相
      n: "-",
      p: stem + "hól",
      f: sB + "íp",
      // 完了相
      dn: sA + "ris",
      dp: sA + "rol",
      df: sA + "rip",
      // 進行相
      sn: sA + "is",
      sp: sB+ "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "mol",
      mf: sA + "mik"
    }
    // l 基本形（流音）
  } else if (["rh", "l"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "vis",
      dp: sA + "vol",
      df: sA + "vik",
      // 進行相
      sn: sA + "is",
      sp: sB+ "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: stem2 + "mol",
      mf: sA + "mik"
    }
    // y 基本形
  } else if (["y", "rhy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0, -1) + "i";
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0, -1) + "zh";

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "dis",
      dp: sA + "dol",
      df: sA + "dik",
      // 進行相
      sn: sA + "zhis",
      sp: sB+ "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: stem2 + "uim",
      mp: sA + "mol",
      mf: sA + "mik"
    }


    // 明音型
    // sy / zy / cy / xy / shy / zhy / chy / xhy / hy 基本形
  } else if (["sy", "zy", "cy", "xy", "shy", "zhy", "chy", "xhy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "ék",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ek",
      // 進行相
      sn: sA + "is",
      sp: sB+ "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: stem2 + "iam",
      mp: sA + "imal",
      mf: sA + "imik"
    }

    // py / by 基本形
  } else if (["py","by"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem.slice(0,-1) + "hiól",
      f: sB.slice(0,-1) + "hiék",
      // 完了相
      dn: sA.slice(0,-1) + "bis",
      dp: sA.slice(0,-1) + "hial",
      df: sA.slice(0,-1) + "hiep",
      // 進行相
      sn: sA.slice(0,-1) + "hies",
      sp: sB.slice(0,-1) + "hiélle",
      sf: sB.slice(0,-1) + "hiésfe",
      // 反復相,
      mn: stem2.slice(0,-1) + "hiam",
      mp: stem2.slice(0,-1) + "himal",
      mf: sA.slice(0,-1) + "himik"
    }
    // ty 基本形
  } else if (["ty"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
     n: "-",
      p: stem.slice(0,-1) + "hiól",
      f: sB.slice(0,-1) + "hiép",
      // 完了相
      dn: sA.slice(0,-1) + "bis",
      dp: sA.slice(0,-1) + "hial",
      df: sA.slice(0,-1) + "hiep",
      // 進行相
      sn: sA.slice(0,-1) + "hies",
      sp: sB.slice(0,-1) + "hiélle",
      sf: sB.slice(0,-1) + "hiésfe",
      // 反復相,
      mn: stem2.slice(0,-1) + "hiam",
      mp: stem2.slice(0,-1) + "himal",
      mf: sA.slice(0,-1) + "himik"
    }

    // dy 基本形
  } else if (["dy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-2) + "xi";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-2) + "xi";
    const sC = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V3[v] ?? "");
      }
    ).slice(0,-2) + "xi";


    return {
      // 完結相
      n: "-",
      p: sC + "ól",
      f: sB + "ép",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ek",
      // 進行相
      sn: sA + "es",
      sp: sB+ "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: sA + "am",
      mp: sA + "mal",
      mf: sA + "mik"
    }

    // ky 基本形
  } else if (["ky"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-2) + "chi";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-2) + "chi";

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ek",
      // 進行相
      sn: sA + "es",
      sp: sB+ "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: sA + "am",
      mp: sA + "mal",
      mf: sA + "mik"
    }

    // gy 基本形
  } else if (["gy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-2) + "xhi";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-2) + "xhi";
    const sC = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V3[v] ?? "");
      }
    ).slice(0,-2) + "xhi";

    return {
      // 完結相
      n: "-",
      p: sC + "ól",
      f: sB + "ép",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ek",
      // 進行相
      sn: sA + "es",
      sp: sB+ "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: sA + "am",
      mp: sA + "mal",
      mf: sA + "mik"
    }

    // hy 基本形
  } else if (["hy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-2) + "shi";
    const sB = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-2) + "shi";
    const sC = stem.replace(
      /(qui|qyi|qi|pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V3[v] ?? "");
      }
    ).slice(0,-2) + "shi";


    return {
      // 完結相
      n: "-",
      p: sC + "ól",
      f: sB + "ép",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ek",
      // 進行相
      sn: sA + "es",
      sp: sB+ "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: sA + "am",
      mp: sA + "mal",
      mf: sA + "mik"
    }

    // fy / vy 基本形（唇音）
  } else if (["fy", "vy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );
    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "ék",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ek",
      // 進行相
      sn: sA + "is",
      sp: sB+ "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: stem2 + "iam",
      mp: sA + "imal",
      mf: sA + "imik"
    }
    
    // my 基本形
  } else if (["my"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem.slice(0,-1) + "hiól",
      f: sB.slice(0,-1) + "hiék",
      // 完了相
      dn: sA.slice(0,-1) + "bis",
      dp: sA.slice(0,-1) + "hial",
      df: sA.slice(0,-1) + "hiep",
      // 進行相
      sn: sA.slice(0,-1) + "hies",
      sp: sB.slice(0,-1) + "hiélle",
      sf: sB.slice(0,-1) + "hiésfe",
      // 反復相,
      mn: stem2.slice(0,-1) + "hiam",
      mp: stem2.slice(0,-1) + "himal",
      mf: sA.slice(0,-1) + "himik"
    }

    // ny 基本形
  } else if (["ny"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: sB + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA.slice(0,-1) + "dis",
      dp: sA + "al",
      df: sA + "ip",
      // 進行相
      sn: sA.slice(0,-2) + "xnies",
      sp: sB.slice(0,-2) + "xniélle",
      sf: sB.slice(0,-2) + "xniésfe",
      // 反復相,
      mn: stem2 + "iam",
      mp: stem2 + "imal",
      mf: sA + "imik"
    }
    // qy 基本形
  } else if (["qy"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: sB.slice(0,-1) + "niól",
      f: sB.slice(0,-1) + "niép",
      // 完了相
      dn: sA.slice(0,-1) + "gis",
      dp: sA.slice(0,-1) + "nial",
      df: sA.slice(0,-1) + "niep",
      // 進行相
      sn: sA.slice(0,-2) + "xhnies",
      sp: sB.slice(0,-2) + "xhniélle",
      sf: sB.slice(0,-2) + "xhniésfe",
      // 反復相,
      mn: stem2.slice(0,-1) + "niam",
      mp: stem2.slice(0,-1) + "nimal",
      mf: sA.slice(0,-1) + "nimik"
    }

    // ry 基本形
  } else if (["ry"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    ).slice(0,-2)  + "di";
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    ).slice(0,-2)  + "di";

    return {
      // 完結相
      n: "-",
      p: stem.slice(0,-1) + "hiól",
      f: sB + "ép",
      // 完了相
      dn: sA + "es",
      dp: sA + "al",
      df: sA + "ep",
      // 進行相
      sn: sA + "es",
      sp: sB + "élle",
      sf: sB + "ésfe",
      // 反復相,
      mn: sA + "am",
      mp: sA + "mal",
      mf: sA + "mik",
    }
    // ly 基本形
  } else if (["ly"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: stem + "ól",
      f: sB + "íp",
      // 完了相
      dn: sA.slice(0,-1) + "vies",
      dp: sA.slice(0,-1) + "vial",
      df: sA.slice(0,-1) + "viek",
      // 進行相
      sn: sA.slice(0,-1) + "vies",
      sp: sB.slice(0,-1) + "viélle",
      sf: sB.slice(0,-1) + "viésfe",
      // 反復相,
      mn: sA + "iam",
      mp: sA + "mal",
      mf: sA + "mik",
    }



    // 母音終了型
    // o 基本形（ po, bo, mo ）
  } else if (["po","bo","mo"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: sB.slice(0, -1) + "ól",
      f: sB.slice(0, -1) + "úk",
      // 完了相
      dn: sA.slice(0, -1) + "rus",
      dp: sA.slice(0, -1) + "rol",
      df: sA.slice(0, -1) + "ruk",
      // 進行相
      sn: sA + "is",
      sp: sB.slice(0, -1) + "úl",
      sf: sB.slice(0, -1) + "úrh",
      // 反復相,
      mn: sA.slice(0, -1) + "hom",
      mp: sA.slice(0, -1) + "hmol",
      mf: sA.slice(0, -1) + "hmuk",
    }
    // o 基本形（ fo, vo ）
  } else if (["fo","vo"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: sB.slice(0, -1) + "ól",
      f: sB.slice(0, -1) + "úk",
      // 完了相
      dn: sA.slice(0, -1) + "rus",
      dp: sA.slice(0, -1) + "rol",
      df: sA.slice(0, -1) + "ruk",
      // 進行相
      sn: sA + "is",
      sp: sB.slice(0, -1) + "úl",
      sf: sB.slice(0, -1) + "úrh",
      // 反復相,
      mn: sA + "m",
      mp: sA.slice(0, -1) + "mol",
      mf: sA.slice(0, -1) + "muk",
    }

    // o 基本形（ po, bo, mo ）
  } else if (["to"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );

    return {
      // 完結相
      n: "-",
      p: sB.slice(0, -1) + "ól",
      f: sB.slice(0, -1) + "úp",
      // 完了相
      dn: sA.slice(0, -1) + "rus",
      dp: sA.slice(0, -1) + "rol",
      df: sA.slice(0, -1) + "rup",
      // 進行相
      sn: sA + "is",
      sp: sB.slice(0, -1) + "úl",
      sf: sB.slice(0, -1) + "úrh",
      // 反復相,
      mn: sA.slice(0, -1) + "hom",
      mp: sA.slice(0, -1) + "hmol",
      mf: sA.slice(0, -1) + "hmuk",
    }
    
    // o 基本形（ それ以外 ）
  } else if (["o"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );
    return {
      // 完結相
      n: "-",
      p: sB.slice(0, -1) + "ól",
      f: sB.slice(0, -1) + "úk",
      // 完了相
      dn: sA.slice(0, -1) + "rus",
      dp: sA.slice(0, -1) + "rol",
      df: sA.slice(0, -1) + "ruk",
      // 進行相
      sn: sA + "is",
      sp: sB.slice(0, -1) + "úl",
      sf: sB.slice(0, -1) + "úrh",
      // 反復相,
      mn: sA + "m",
      mp: sA.slice(0, -1) + "mol",
      mf: sA.slice(0, -1) + "muk",
    }

    // ma / na / qa 基本形
  } else if (["ma", "na", "qa"].includes(ruletype)) {
    const sA = stem2.replace(
      /(pyó|byó|tyó|dyó|kyó|gyó|hyó|pó|bó|tó|dó|kó|gó|hó|pyú|byú|tyú|dyú|kyú|gyú|hyú|pú|bú|tú|dú|kú|gú|hú|yúi|úi|yú|yó|ú|ó|ǻl|ǻ)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V1[v] ?? "");
      }
    );
    const sB = stem.replace(
      /(pyo|byo|tyo|dyo|kyo|gyo|hyo|po|bo|to|do|ko|go|ho|pyi|byi|tyi|dyi|kyi|gyi|hyi|pi|bi|ti|di|ki|gi|hi|pyui|byui|tyui|dyui|kyui|gyui|hyui|pui|bui|tui|dui|kui|gui|hui|yui|yo|ui|o|ål|å)/g,
      (m) => {
        const c = m[0];          // 子音
        const v = m.slice(1);    // 母音部分
        return (C[c] ?? c) + (V2[v] ?? "");
      }
    );
    return {
      // 完結相
      n: "-",
      p: sB + "ól",
      f: sB + "íp",
      // 完了相
      dn: sB + "áris",
      dp: sB + "árol",
      df: sB + "árip",
      // 進行相
      sn: sB + "áis",
      sp: sB + "ílle",
      sf: sB + "ísfe",
      // 反復相,
      mn: sA + "uim",
      mp: sA + "uimol",
      mf: sA + "imik",
    }
  }
}
