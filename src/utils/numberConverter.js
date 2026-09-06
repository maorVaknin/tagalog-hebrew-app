/**
 * מחולל וממיר מספרים דינמי לטגלוג (Native & Daily Filipino)
 * תומך בהמרת כל מספר שלם מ-0 עד 999,999 לכתיבה בטגלוג, תעתיק פונטי בעברית ותרגום עברי.
 */

// 1. אבני בניין בטגלוג מקורית
const nativeUnits = [
  { val: 0, tagalog: "Wala", phonetic: "וָואלָא", hebrew: "אפס" },
  { val: 1, tagalog: "Isa", phonetic: "אִיסָא", hebrew: "אחת" },
  { val: 2, tagalog: "Dalawa", phonetic: "דָאלָאוָוא", hebrew: "שתיים" },
  { val: 3, tagalog: "Tatlo", phonetic: "תָּאטְלוֹ", hebrew: "שלוש" },
  { val: 4, tagalog: "Apat", phonetic: "אָאָפָּאת", hebrew: "ארבע" },
  { val: 5, tagalog: "Lima", phonetic: "לִימָא", hebrew: "חמש" },
  { val: 6, tagalog: "Anim", phonetic: "אָאנִים", hebrew: "שש" },
  { val: 7, tagalog: "Pito", phonetic: "פִּיתוֹ", hebrew: "שבע" },
  { val: 8, tagalog: "Walo", phonetic: "וָואלוֹ", hebrew: "שמונה" },
  { val: 9, tagalog: "Siyam", phonetic: "שִׁיאָאם", hebrew: "תשע" },
  { val: 10, tagalog: "Sampu", phonetic: "סָאמְפּוּ", hebrew: "עשר" }
];

const nativeTeens = {
  11: { tagalog: "Labing-isa", phonetic: "לָאבִּילִימָא (לָאבִּינְג-אִיסָא)", hebrew: "אחת עשרה" },
  12: { tagalog: "Labindalawa", phonetic: "לָאבִּין-דָאלָאוָוא", hebrew: "שתים עשרה" },
  13: { tagalog: "Labintatlo", phonetic: "לָאבִּין-תָּאטְלוֹ", hebrew: "שלוש עשרה" },
  14: { tagalog: "Labing-apat", phonetic: "לָאבִּילִימָא-אָאָפָּאת", hebrew: "ארבע עשרה" },
  15: { tagalog: "Labing-lima", phonetic: "לָאבִּילִימָא", hebrew: "חמש עשרה" },
  16: { tagalog: "Labing-anim", phonetic: "לָאבִּילִימָא-אָאנִים", hebrew: "שש עשרה" },
  17: { tagalog: "Labimpito", phonetic: "לָאבִּים-פִּיתוֹ", hebrew: "שבע עשרה" },
  18: { tagalog: "Labingwalo", phonetic: "לָאבִּילִימָא-וָואלוֹ", hebrew: "שמונה עשרה" },
  19: { tagalog: "Labinsiyam", phonetic: "לָאבִּין-שִׁיאָאם", hebrew: "תשע עשרה" }
};

const nativeTens = {
  20: { tagalog: "Dalawampu", phonetic: "דָאלָאוָואמְפּוּ", hebrew: "עשרים" },
  30: { tagalog: "Tatlumpu", phonetic: "תָּאתְלוּמְפּוּ", hebrew: "שלושים" },
  40: { tagalog: "Apatnapu", phonetic: "אָאָפָּאתְנָאפּוּ", hebrew: "ארבעים" },
  50: { tagalog: "Limangpu", phonetic: "לִימָאנְג-פּוּ", hebrew: "חמישים" },
  60: { tagalog: "Animnapu", phonetic: "אָאנִים-נָאפּוּ", hebrew: "שישים" },
  70: { tagalog: "Pitumpu", phonetic: "פִּיתוּמְפּוּ", hebrew: "שבעים" },
  80: { tagalog: "Walumpu", phonetic: "וָואלוּמְפּוּ", hebrew: "שמונים" },
  90: { tagalog: "Siyamnapu", phonetic: "שִׁיאָאמְנָאפּוּ", hebrew: "תשעים" }
};

// 2. אבני בניין בפיליפינית יומיומית (ספרדית/יומיומי)
const dailyUnits = [
  { val: 0, tagalog: "Zero", phonetic: "זֶרוֹ", hebrew: "אפס" },
  { val: 1, tagalog: "Uno", phonetic: "אוּנוֹ", hebrew: "אחת" },
  { val: 2, tagalog: "Dos", phonetic: "דוֹס", hebrew: "שתיים" },
  { val: 3, tagalog: "Tres", phonetic: "תְּרֶס", hebrew: "שלוש" },
  { val: 4, tagalog: "Kuwatro", phonetic: "כּוּואָתְרוֹ", hebrew: "ארבע" },
  { val: 5, tagalog: "Singko", phonetic: "סִין-כּוֹ", hebrew: "חמש" },
  { val: 6, tagalog: "Sais", phonetic: "סָאאִיס", hebrew: "שש" },
  { val: 7, tagalog: "Siyete", phonetic: "שִׁייֶתֶה", hebrew: "שבע" },
  { val: 8, tagalog: "Otsyo", phonetic: "אוֹצְ'יוֹ", hebrew: "שמונה" },
  { val: 9, tagalog: "Niyebe", phonetic: "נִייֶבֶּה", hebrew: "תשע" },
  { val: 10, tagalog: "Diyes", phonetic: "דִייֶס", hebrew: "עשר" }
];

const dailyTeens = {
  11: { tagalog: "Onse", phonetic: "אוֹנְסֶה", hebrew: "אחת עשרה" },
  12: { tagalog: "Dose", phonetic: "דוֹסֶה", hebrew: "שתים עשרה" },
  13: { tagalog: "Trese", phonetic: "תְּרֶסֶה", hebrew: "שלוש עשרה" },
  14: { tagalog: "Katorse", phonetic: "כָּאתּוֹרְסֶה", hebrew: "ארבע עשרה" },
  15: { tagalog: "Kinse", phonetic: "כִּין-סֶה", hebrew: "חמש עשרה" },
  16: { tagalog: "Disiseis", phonetic: "דִירִסִיסֶאִיס", hebrew: "שש עשרה" },
  17: { tagalog: "Disisiyete", phonetic: "דִירִסִישִׁייֶתֶה", hebrew: "שבע עשרה" },
  18: { tagalog: "Disiotsyo", phonetic: "דִירִסִיאוֹצְ'יוֹ", hebrew: "שמונה עשרה" },
  19: { tagalog: "Disiniyebe", phonetic: "דִירִסִינִייֶבֶּה", hebrew: "תשע עשרה" }
};

const dailyTens = {
  20: { tagalog: "Bente", phonetic: "בֶּנְתֶה", hebrew: "עשרים" },
  30: { tagalog: "Treinta", phonetic: "תְּרֶאִינְתָּה", hebrew: "שלושים" },
  40: { tagalog: "Kuwarenta", phonetic: "כּוּואָרֶנְתָּה", hebrew: "ארבעים" },
  50: { tagalog: "Singkuwenta", phonetic: "סִין-כּוּוֶנְתָּה", hebrew: "חמישים" },
  60: { tagalog: "Saisenta", phonetic: "סָאאִיסֶנְתָּה", hebrew: "שישים" },
  70: { tagalog: "Setenta", phonetic: "סֶתֶנְתָּה", hebrew: "שבעים" },
  80: { tagalog: "Otsenta", phonetic: "אוֹצְ'אֶנְתָּה", hebrew: "שמונים" },
  90: { tagalog: "Nobenta", phonetic: "נוֹבֶנְתָּה", hebrew: "תשעים" }
};

/**
 * המרת מספר לטגלוג מקורית (Native Tagalog)
 */
export function getNativeTagalogNumber(n) {
  if (n < 0 || isNaN(n)) return null;
  n = Math.floor(n);

  if (n <= 10) return nativeUnits[n];
  if (n >= 11 && n <= 19) return nativeTeens[n];

  // 20 - 99
  if (n >= 20 && n <= 99) {
    const ten = Math.floor(n / 10) * 10;
    const unit = n % 10;
    const tenObj = nativeTens[ten];
    if (unit === 0) return tenObj;
    
    const unitObj = nativeUnits[unit];
    return {
      tagalog: `${tenObj.tagalog}'t ${unitObj.tagalog.toLowerCase()}`,
      phonetic: `${tenObj.phonetic}ת ${unitObj.phonetic}`,
      hebrew: `${tenObj.hebrew} ו${unitObj.hebrew}`
    };
  }

  // 100 - 999
  if (n >= 100 && n <= 999) {
    const hundredDigit = Math.floor(n / 100);
    const remainder = n % 100;

    let prefixTagalog = "";
    let prefixPhonetic = "";
    
    if (hundredDigit === 1) {
      prefixTagalog = "Isang daan";
      prefixPhonetic = "אִיסָאנְג דָאאַאן";
    } else if (hundredDigit === 2) {
      prefixTagalog = "Dalawang daan";
      prefixPhonetic = "דָאלָאוָואנְג דָאאַאן";
    } else if (hundredDigit === 3) {
      prefixTagalog = "Tatlong daan";
      prefixPhonetic = "תָּאתְלוֹנְג דָאאַאן";
    } else if (hundredDigit === 4) {
      prefixTagalog = "Apat na daan";
      prefixPhonetic = "אָאָפָּאת נָא דָאאַאן";
    } else if (hundredDigit === 5) {
      prefixTagalog = "Limang daan";
      prefixPhonetic = "לִימָאנְג דָאאַאן";
    } else if (hundredDigit === 6) {
      prefixTagalog = "Anim na daan";
      prefixPhonetic = "אָאנִים נָא דָאאַאן";
    } else if (hundredDigit === 7) {
      prefixTagalog = "Pitong daan";
      prefixPhonetic = "פִּיתוֹנְג דָאאַאן";
    } else if (hundredDigit === 8) {
      prefixTagalog = "Walong daan";
      prefixPhonetic = "וָואלוֹנְג דָאאַאן";
    } else if (hundredDigit === 9) {
      prefixTagalog = "Siyang daan";
      prefixPhonetic = "שִׁיאָאנְג דָאאַאן";
    }

    if (remainder === 0) {
      return {
        tagalog: prefixTagalog,
        phonetic: prefixPhonetic,
        hebrew: hundredDigit === 1 ? "מאה" : (hundredDigit === 2 ? "מאתיים" : `${nativeUnits[hundredDigit].hebrew} מאות`)
      };
    }

    const remObj = getNativeTagalogNumber(remainder);
    return {
      tagalog: `${prefixTagalog} at ${remObj.tagalog.toLowerCase()}`,
      phonetic: `${prefixPhonetic} אָאת ${remObj.phonetic}`,
      hebrew: `${hundredDigit === 1 ? "מאה" : (hundredDigit === 2 ? "מאתיים" : nativeUnits[hundredDigit].hebrew + " מאות")} ו${remObj.hebrew}`
    };
  }

  // 1,000 - 999,999
  if (n >= 1000 && n <= 999999) {
    const thousandDigit = Math.floor(n / 1000);
    const remainder = n % 1000;

    let thousandObj = getNativeTagalogNumber(thousandDigit);
    let thousandTagalog = thousandDigit === 1 ? "Isang libo" : `${thousandObj.tagalog}ng libo`;
    let thousandPhonetic = thousandDigit === 1 ? "אִיסָאנְג לִיבּוֹ" : `${thousandObj.phonetic}נְג לִיבּוֹ`;
    let thousandHebrew = thousandDigit === 1 ? "אלף" : (thousandDigit === 2 ? "אלפיים" : `${thousandObj.hebrew} אלפים`);

    if (remainder === 0) {
      return {
        tagalog: thousandTagalog,
        phonetic: thousandPhonetic,
        hebrew: thousandHebrew
      };
    }

    const remObj = getNativeTagalogNumber(remainder);
    return {
      tagalog: `${thousandTagalog} ${remObj.tagalog.toLowerCase()}`,
      phonetic: `${thousandPhonetic} ${remObj.phonetic}`,
      hebrew: `${thousandHebrew} ${remObj.hebrew}`
    };
  }

  return {
    tagalog: `Numero ${n}`,
    phonetic: `נוּמֶרוֹ ${n}`,
    hebrew: `${n}`
  };
}

/**
 * המרת מספר לפיליפינית יומיומית (Daily Filipino / Spanish-derived)
 */
export function getDailyFilipinoNumber(n) {
  if (n < 0 || isNaN(n)) return null;
  n = Math.floor(n);

  if (n <= 10) return dailyUnits[n];
  if (n >= 11 && n <= 19) return dailyTeens[n];

  // 20 - 99
  if (n >= 20 && n <= 99) {
    const ten = Math.floor(n / 10) * 10;
    const unit = n % 10;
    const tenObj = dailyTens[ten];
    if (unit === 0) return tenObj;

    const unitObj = dailyUnits[unit];
    return {
      tagalog: `${tenObj.tagalog} ${unitObj.tagalog.toLowerCase()}`,
      phonetic: `${tenObj.phonetic} ${unitObj.phonetic}`,
      hebrew: `${tenObj.hebrew} ו${unitObj.hebrew}`
    };
  }

  // 100 - 999
  if (n >= 100 && n <= 999) {
    const hundredDigit = Math.floor(n / 100);
    const remainder = n % 100;

    let hundredTagalog = hundredDigit === 1 ? "Ciento" : `${dailyUnits[hundredDigit].tagalog} cientos`;
    let hundredPhonetic = hundredDigit === 1 ? "סִייֶנְתוֹ" : `${dailyUnits[hundredDigit].phonetic} סִייֶנְתוֹס`;
    let hundredHebrew = hundredDigit === 1 ? "מאה" : (hundredDigit === 2 ? "מאתיים" : `${dailyUnits[hundredDigit].hebrew} מאות`);

    if (remainder === 0) {
      return {
        tagalog: hundredTagalog,
        phonetic: hundredPhonetic,
        hebrew: hundredHebrew
      };
    }

    const remObj = getDailyFilipinoNumber(remainder);
    return {
      tagalog: `${hundredTagalog} ${remObj.tagalog.toLowerCase()}`,
      phonetic: `${hundredPhonetic} ${remObj.phonetic}`,
      hebrew: `${hundredHebrew} ו${remObj.hebrew}`
    };
  }

  // 1000+
  if (n >= 1000 && n <= 999999) {
    const thousandDigit = Math.floor(n / 1000);
    const remainder = n % 1000;

    let thousandObj = getDailyFilipinoNumber(thousandDigit);
    let thousandTagalog = thousandDigit === 1 ? "Mil" : `${thousandObj.tagalog} mil`;
    let thousandPhonetic = thousandDigit === 1 ? "מִיל" : `${thousandObj.phonetic} מִיל`;
    let thousandHebrew = thousandDigit === 1 ? "אלף" : (thousandDigit === 2 ? "אלפיים" : `${thousandObj.hebrew} אלפים`);

    if (remainder === 0) {
      return {
        tagalog: thousandTagalog,
        phonetic: thousandPhonetic,
        hebrew: thousandHebrew
      };
    }

    const remObj = getDailyFilipinoNumber(remainder);
    return {
      tagalog: `${thousandTagalog} ${remObj.tagalog.toLowerCase()}`,
      phonetic: `${thousandPhonetic} ${remObj.phonetic}`,
      hebrew: `${thousandHebrew} ${remObj.hebrew}`
    };
  }

  return {
    tagalog: `Number ${n}`,
    phonetic: `נָאמְבֶּר ${n}`,
    hebrew: `${n}`
  };
}

/**
 * פונקציה ראשית המייצרת אובייקט מספר מלא כולל מחיר בפסו פיליפיני
 */
export function convertAnyNumber(input) {
  const num = parseInt(input, 10);
  if (isNaN(num) || num < 0) return null;

  const native = getNativeTagalogNumber(num);
  const daily = getDailyFilipinoNumber(num);

  // מחירי פסו
  const pesoTagalog = num === 1 ? "Piso" : `${daily.tagalog} piso`;
  const pesoPhonetic = num === 1 ? "פִּיסוֹ" : `${daily.phonetic} פִּיסוֹ`;
  const pesoHebrew = `${num} פסו פיליפיני (PHP ₱)`;

  return {
    num,
    formattedNum: num.toLocaleString('he-IL'),
    native,
    daily,
    peso: {
      price: num,
      tagalog: pesoTagalog,
      phonetic: pesoPhonetic,
      hebrew: pesoHebrew
    }
  };
}
