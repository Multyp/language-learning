const hiraganaData = {
  basic: [
    {
      row: "あ行 (a - o)",
      chars: [
        { hiragana: "あ", romaji: "a" },
        { hiragana: "い", romaji: "i" },
        { hiragana: "う", romaji: "u" },
        { hiragana: "え", romaji: "e" },
        { hiragana: "お", romaji: "o" },
      ],
    },
    {
      row: "か行 (ka - ko)",
      chars: [
        { hiragana: "か", romaji: "ka" },
        { hiragana: "き", romaji: "ki" },
        { hiragana: "く", romaji: "ku" },
        { hiragana: "け", romaji: "ke" },
        { hiragana: "こ", romaji: "ko" },
      ],
    },
    {
      row: "さ行 (sa - so)",
      chars: [
        { hiragana: "さ", romaji: "sa" },
        { hiragana: "し", romaji: "shi" },
        { hiragana: "す", romaji: "su" },
        { hiragana: "せ", romaji: "se" },
        { hiragana: "そ", romaji: "so" },
      ],
    },
    {
      row: "た行 (ta - to)",
      chars: [
        { hiragana: "た", romaji: "ta" },
        { hiragana: "ち", romaji: "chi" },
        { hiragana: "つ", romaji: "tsu" },
        { hiragana: "て", romaji: "te" },
        { hiragana: "と", romaji: "to" },
      ],
    },
    {
      row: "な行 (na - no)",
      chars: [
        { hiragana: "な", romaji: "na" },
        { hiragana: "に", romaji: "ni" },
        { hiragana: "ぬ", romaji: "nu" },
        { hiragana: "ね", romaji: "ne" },
        { hiragana: "の", romaji: "no" },
      ],
    },
    {
      row: "は行 (ha - ho)",
      chars: [
        { hiragana: "は", romaji: "ha" },
        { hiragana: "ひ", romaji: "hi" },
        { hiragana: "ふ", romaji: "fu" },
        { hiragana: "へ", romaji: "he" },
        { hiragana: "ほ", romaji: "ho" },
      ],
    },
    {
      row: "ま行 (ma - mo)",
      chars: [
        { hiragana: "ま", romaji: "ma" },
        { hiragana: "み", romaji: "mi" },
        { hiragana: "む", romaji: "mu" },
        { hiragana: "め", romaji: "me" },
        { hiragana: "も", romaji: "mo" },
      ],
    },
    {
      row: "や行 (ya - yo)",
      chars: [
        { hiragana: "や", romaji: "ya" },
        { hiragana: "ゆ", romaji: "yu" },
        { hiragana: "よ", romaji: "yo" },
      ],
    },
    {
      row: "ら行 (ra - ro)",
      chars: [
        { hiragana: "ら", romaji: "ra" },
        { hiragana: "り", romaji: "ri" },
        { hiragana: "る", romaji: "ru" },
        { hiragana: "れ", romaji: "re" },
        { hiragana: "ろ", romaji: "ro" },
      ],
    },
    {
      row: "わ行 (wa - n)",
      chars: [
        { hiragana: "わ", romaji: "wa" },
        { hiragana: "を", romaji: "wo" },
        { hiragana: "ん", romaji: "n" },
      ],
    },
  ],
  dakuten: [
    {
      row: "が行 (ga - go)",
      chars: [
        { hiragana: "が", romaji: "ga" },
        { hiragana: "ぎ", romaji: "gi" },
        { hiragana: "ぐ", romaji: "gu" },
        { hiragana: "げ", romaji: "ge" },
        { hiragana: "ご", romaji: "go" },
      ],
    },
    {
      row: "ざ行 (za - zo)",
      chars: [
        { hiragana: "ざ", romaji: "za" },
        { hiragana: "じ", romaji: "ji" },
        { hiragana: "ず", romaji: "zu" },
        { hiragana: "ぜ", romaji: "ze" },
        { hiragana: "ぞ", romaji: "zo" },
      ],
    },
    {
      row: "だ行 (da - do)",
      chars: [
        { hiragana: "だ", romaji: "da" },
        { hiragana: "ぢ", romaji: "ji" },
        { hiragana: "づ", romaji: "zu" },
        { hiragana: "で", romaji: "de" },
        { hiragana: "ど", romaji: "do" },
      ],
    },
    {
      row: "ば行 (ba - bo)",
      chars: [
        { hiragana: "ば", romaji: "ba" },
        { hiragana: "び", romaji: "bi" },
        { hiragana: "ぶ", romaji: "bu" },
        { hiragana: "べ", romaji: "be" },
        { hiragana: "ぼ", romaji: "bo" },
      ],
    },
  ],
  handakuten: [
    {
      row: "ぱ行 (pa - po)",
      chars: [
        { hiragana: "ぱ", romaji: "pa" },
        { hiragana: "ぴ", romaji: "pi" },
        { hiragana: "ぷ", romaji: "pu" },
        { hiragana: "ぺ", romaji: "pe" },
        { hiragana: "ぽ", romaji: "po" },
      ],
    },
  ],
  combinations: [
    {
      row: "きょ行 (kya - kyo)",
      chars: [
        { hiragana: "きゃ", romaji: "kya" },
        { hiragana: "きゅ", romaji: "kyu" },
        { hiragana: "きょ", romaji: "kyo" },
      ],
    },
    {
      row: "しょ行 (sha - sho)",
      chars: [
        { hiragana: "しゃ", romaji: "sha" },
        { hiragana: "しゅ", romaji: "shu" },
        { hiragana: "しょ", romaji: "sho" },
      ],
    },
    {
      row: "ちょ行 (cha - cho)",
      chars: [
        { hiragana: "ちゃ", romaji: "cha" },
        { hiragana: "ちゅ", romaji: "chu" },
        { hiragana: "ちょ", romaji: "cho" },
      ],
    },
    {
      row: "にょ行 (nya - nyo)",
      chars: [
        { hiragana: "にゃ", romaji: "nya" },
        { hiragana: "にゅ", romaji: "nyu" },
        { hiragana: "にょ", romaji: "nyo" },
      ],
    },
    {
      row: "ひょ行 (hya - hyo)",
      chars: [
        { hiragana: "ひゃ", romaji: "hya" },
        { hiragana: "ひゅ", romaji: "hyu" },
        { hiragana: "ひょ", romaji: "hyo" },
      ],
    },
    {
      row: "みょ行 (mya - myo)",
      chars: [
        { hiragana: "みゃ", romaji: "mya" },
        { hiragana: "みゅ", romaji: "myu" },
        { hiragana: "みょ", romaji: "myo" },
      ],
    },
    {
      row: "りょ行 (rya - ryo)",
      chars: [
        { hiragana: "りゃ", romaji: "rya" },
        { hiragana: "りゅ", romaji: "ryu" },
        { hiragana: "りょ", romaji: "ryo" },
      ],
    },
  ],
};

export default hiraganaData;
