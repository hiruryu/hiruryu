// スマートな形容詞屈折形生成
function getConjA(_word, stem, _long_stem, stem2, _type, ruletype) {
  if (ruletype === "no") {
      return {};
            // p 基本形
         } else if (ruletype === "p") {      
        return {
          s: stem2 + "e", s2: stem.slice(0, -1) + "fálla", s3: stem.slice(0, -1) + "fónna",
          fs: stem2.slice(0, -1) + "fave", fs2: stem.slice(0, -1) + "faválla", fs3: stem.slice(0, -1) + "favónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2.slice(0, -1) + "feze", es2: stem.slice(0, -1) + "fyizálla", es3: stem.slice(0, -1) + "fyizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2.slice(0, -1) + "fame", ads2: stem.slice(0, -1) + "famálla", ads3: stem.slice(0, -1) + "famónna",
        }
        // b 基本形
        } else if (ruletype === "b") {      
        return {
          s: stem2 + "e", s2: stem.slice(0, -1) + "válla", s3: stem.slice(0, -1) + "vónna",
          fs: stem2.slice(0, -1) + "vave", fs2: stem.slice(0, -1) + "vaválla", fs3: stem.slice(0, -1) + "vavónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2.slice(0, -1) + "veze", es2: stem.slice(0, -1) + "vyizálla", es3: stem.slice(0, -1) + "vyizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2.slice(0, -1) + "vame", ads2: stem.slice(0, -1) + "vamálla", ads3: stem.slice(0, -1) + "vamónna",
        }
        // t 基本形
         } else if (ruletype === "t") {      
        return {
          s: stem2 + "e", s2: stem.slice(0, -1) + "cálla", s3: stem.slice(0, -1) + "cónna",
          fs: stem2.slice(0, -1) + "cave", fs2: stem.slice(0, -1) + "caválla", fs3: stem.slice(0, -1) + "cavónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2.slice(0, -1) + "ceze", es2: stem.slice(0, -1) + "cyizálla", es3: stem.slice(0, -1) + "cyizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2.slice(0, -1) + "came", ads2: stem.slice(0, -1) + "camálla", ads3: stem.slice(0, -1) + "camónna",
        }
        // d 基本形
        } else if (ruletype === "d") {      
        return {
          s: stem2 + "e", s2: stem.slice(0, -1) + "xálla", s3: stem.slice(0, -1) + "xónna",
          fs: stem2.slice(0, -1) + "xave", fs2: stem.slice(0, -1) + "xaválla", fs3: stem.slice(0, -1) + "xavónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2.slice(0, -1) + "xeze", es2: stem.slice(0, -1) + "xyizálla", es3: stem.slice(0, -1) + "xyizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2.slice(0, -1) + "xame", ads2: stem.slice(0, -1) + "xamálla", ads3: stem.slice(0, -1) + "xamónna",
        }
        // k 基本形
        } else if (ruletype === "k") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // g 基本形
      } else if (ruletype === "g") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // f / v / s / z / sh / zh / x / xh 基本形
         } else if (ruletype === "f") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "che", on2: stem + "kálla", on3: stem + "kónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "ye", ds2: stem + "yálla", ds3: stem + "yónna",
          ads: stem2 + "me", ads2: stem + "málla", ads3: stem + "mónna",
        }
         // f / v / s / z / sh / zh / x / xh 重子音形
         } else if (ruletype === "sf") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "áche", on2: stem + "akálla", on3: stem + "akónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "ye", ds2: stem + "yálla", ds3: stem + "yónna",
          ads: stem2 + "áme", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // c 基本形
        } else if (ruletype === "c") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "che", on2: stem + "kálla", on3: stem + "kónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "ye", ds2: stem + "yálla", ds3: stem + "yónna",
          ads: stem2 + "me", ads2: stem + "málla", ads3: stem + "mónna",
        }
        // ch 基本形
        } else if (ruletype === "ch") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // m 基本形
      } else if (ruletype === "m") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // n 基本形
         } else if (ruletype === "n") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // q 基本形
      } else if (ruletype === "q") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }
        // r / l 基本形
      } else if (ruletype === "r") {      
        return {
          s: stem2 + "e", s2: stem + "álla", s3: stem + "ónna",
          fs: stem2 + "ave", fs2: stem + "aválla", fs3: stem + "avónna",
          on: stem2 + "uiche", on2: stem + "uikálla", on3: stem + "uikónna",
          es: stem2 + "eze", es2: stem + "yizálla", es3: stem + "yizónna",
          ds: stem2 + "uiye", ds2: stem + "uiyálla", ds3: stem + "uiyónna",
          ads: stem2 + "ame", ads2: stem + "amálla", ads3: stem + "amónna",
        }

      }
}
