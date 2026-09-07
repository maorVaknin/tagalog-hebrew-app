/**
 * מנוע תרגום חופשי בלייב (Live Google Translate Engine)
 * משלב שליפה מהירה ממאגר המילון וחיבור בזמן אמת ל-Google Translate API הרשמי.
 * תומך בתרגום מדויק מעברית לפיליפינית (Tagalog) ובפונטיקה מלאה בעברית מנוקדת.
 */
import { comprehensiveDictionaryData } from '../data/dictionaryData';
import { courseData } from '../data/courseData';

const masterDictionaryMap = new Map();

function initMasterDictionary() {
  if (masterDictionaryMap.size > 0) return;

  if (courseData?.units) {
    courseData.units.forEach(unit => {
      unit.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(vocab => {
          const tagalogKey = vocab.tagalog.trim().toLowerCase();
          const hebrewKey = vocab.hebrew.trim().toLowerCase();
          masterDictionaryMap.set(tagalogKey, vocab);
          masterDictionaryMap.set(hebrewKey, vocab);
        });
      });
    });
  }

  comprehensiveDictionaryData.forEach(item => {
    const tagalogKey = item.tagalog.trim().toLowerCase();
    const hebrewKey = item.hebrew.trim().toLowerCase();
    if (!masterDictionaryMap.has(tagalogKey)) masterDictionaryMap.set(tagalogKey, item);
    if (!masterDictionaryMap.has(hebrewKey)) masterDictionaryMap.set(hebrewKey, item);
  });
}

/**
 * זיהוי האם הטקסט מכיל אותיות עבריות
 */
export function isHebrewText(text) {
  const hebrewRegex = /[\u0590-\u05FF]/;
  return hebrewRegex.test(text);
}

/**
 * מנוע פונטיקה דינמי ומלא להמרת מילות טגלוג לתעתיק בעברית מנוקדת
 */
const phoneticDictionary = {
  "magandang": "מַגַאנְדַאנְג",
  "maganda": "מָאגָאנְדָה",
  "umaga": "אוּמָאגָה",
  "hapon": "הָאפּוֹן",
  "gabi": "גָאבִֿי",
  "salamat": "סָלָמָאט",
  "maraming": "מָארָאמִינְג",
  "kumusta": "קוּמוּסְטָה",
  "ka": "כָּה",
  "ako": "אָקוֹ",
  "ikaw": "אִיכָּאוּ",
  "kami": "כָּאמִי",
  "tayo": "תָּאיוֹ",
  "sila": "סִילָה",
  "po": "פּוֹ",
  "opo": "אוֹפּוֹ",
  "oo": "אוֹ-אוֹ",
  "hindi": "הִין-דִי",
  "masarap": "מָאסָארָאפּ",
  "pagkain": "פָּאגְכָּאִין",
  "tubig": "תוּבִֿיג",
  "kanin": "כָּאנִין",
  "magkano": "מָאגְכָּאנוֹ",
  "ito": "אִיתוֹ",
  "piso": "פִּיסוֹ",
  "mura": "מוּרָה",
  "mahal": "מָאהָאל",
  "sukli": "סוּכְלִי",
  "para": "פָּארָה",
  "bayad": "בָּאיָאד",
  "saan": "סָאָאן",
  "kailan": "כָּאאִילָאן",
  "paano": "פָּאָאָנוֹ",
  "bakit": "בָּאכִֿית",
  "sino": "סִינוֹ",
  "ano": "אָנוֹ",
  "dagat": "דָאגָאת",
  "bangka": "בָּאנְג-כָּה",
  "kwarto": "כְּוָוארְתוֹ",
  "susi": "סוּסִי",
  "tulong": "תוּלוֹנְג",
  "doktor": "דּוֹכְתוֹר",
  "ospital": "אוֹסְפִּינָאל",
  "kita": "כִּיתָה",
  "pogi": "פּוֹגִי",
  "kaibigan": "כָּאאִיבִֿיגָאן",
  "ingat": "אִין-גָאט",
  "paalam": "פָּאָאָלָאם",
  "gusto": "גּוּסְתוֹ",
  "kong": "כּוֹנְג",
  "kumain": "כּוּמָאאִין",
  "isda": "אִיסְדָה",
  "manok": "מָאנוֹכְּ",
  "baboy": "בָּאבּוֹי",
  "mansanas": "מָאנְסָאנָאס"
};

export function generateTagalogPhonetic(tagalogText) {
  if (!tagalogText) return '';
  const words = tagalogText.toLowerCase().replace(/[^a-zñ\s-]/g, '').split(/\s+/);
  
  const phoneticWords = words.map(w => {
    if (!w) return '';
    if (phoneticDictionary[w]) return phoneticDictionary[w];
    
    // המרה הברותית מלאה של אותיות טאגאלוג לעברית
    return w
      .replace(/ng/g, 'נְג')
      .replace(/ch/g, 'צ\'')
      .replace(/sh/g, 'ש')
      .replace(/mag/g, 'מָאג')
      .replace(/ang/g, 'אָנְג')
      .replace(/ing/g, 'אִין-ג')
      .replace(/a/g, 'ָא').replace(/e/g, 'ֶא').replace(/i/g, 'ִי').replace(/o/g, 'וֹ').replace(/u/g, 'וּ')
      .replace(/b/g, 'בּ').replace(/k/g, 'כּ').replace(/c/g, 'כּ').replace(/d/g, 'ד').replace(/g/g, 'ג')
      .replace(/h/g, 'ה').replace(/l/g, 'ל').replace(/m/g, 'מ').replace(/n/g, 'נ').replace(/p/g, 'פּ')
      .replace(/r/g, 'ר').replace(/s/g, 'ס').replace(/t/g, 'תּ').replace(/w/g, 'ו').replace(/y/g, 'י')
      .replace(/z/g, 'ז').replace(/j/g, 'ג\'').replace(/f/g, 'פּ').replace(/v/g, 'בּ');
  });

  return phoneticWords.filter(Boolean).join(' ');
}

/**
 * מנגנון תרגום ראשי מול Google Translate API הרשמי
 */
async function fetchGoogleTranslateAPI(q, sourceLang, targetLang) {
  try {
    const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sourceLang}&tl=${targetLang}&q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data[0]) {
      const translated = typeof data[0] === 'string' ? data[0] : (data[0][0] || null);
      if (translated) return translated.trim();
    }
  } catch (err) {
    console.log(`Google Translate API ${sourceLang}->${targetLang} error:`, err);
  }
  return null;
}

/**
 * מנגנון גיבוי משני (MyMemory API)
 */
async function fetchMyMemoryTranslation(q, sourceLang, targetLang) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${sourceLang}|${targetLang}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.responseData?.translatedText) {
      return data.responseData.translatedText.trim();
    }
  } catch (err) {
    console.log(`MyMemory ${sourceLang}->${targetLang} error:`, err);
  }
  return null;
}

/**
 * תרגום אסינכרוני בזמן אמת מול מנועי Google Translate + מילון מקומי
 */
export async function translateFreeTextAsync(inputText) {
  initMasterDictionary();
  const trimmed = (inputText || '').trim();
  if (!trimmed) return null;

  const isHeb = isHebrewText(trimmed);

  // 1. בדיקת התאמה מדויקת במילון המקומי (תגובה מיידית ב-0ms)
  const inputKey = trimmed.toLowerCase();
  const exactMatch = masterDictionaryMap.get(inputKey);
  if (exactMatch) {
    return {
      originalText: trimmed,
      tagalog: exactMatch.tagalog,
      hebrew: exactMatch.hebrew,
      phoneticHebrew: exactMatch.phoneticHebrew || generateTagalogPhonetic(exactMatch.tagalog),
      category: exactMatch.category || 'מילון קורס',
      exampleSentence: exactMatch.exampleSentence || null,
      isExactMatch: true,
      detectedLang: isHeb ? 'hebrew' : 'tagalog'
    };
  }

  // 2. תרגום ראשי מול Google Translate API
  const sourceLang = isHeb ? 'he' : 'tl';
  const targetLang = isHeb ? 'tl' : 'he';

  let translatedRes = await fetchGoogleTranslateAPI(trimmed, sourceLang, targetLang);

  // 3. במידה ו-Google Translate לא החזיר תוצאה, פניה למנוע הגיבוי MyMemory
  if (!translatedRes || translatedRes.toLowerCase() === trimmed.toLowerCase()) {
    translatedRes = await fetchMyMemoryTranslation(trimmed, sourceLang, targetLang);
  }

  if (translatedRes) {
    // ניקוי תווי רווח ומקפים
    const cleanedRes = translatedRes
      .replace(/\s+-\s+/g, '-')
      .replace(/\bTYVM\b/gi, 'Maraming salamat');

    const tagalogOutput = isHeb ? cleanedRes : trimmed;
    const hebrewOutput = isHeb ? trimmed : cleanedRes;
    const phonetic = generateTagalogPhonetic(tagalogOutput);

    return {
      originalText: trimmed,
      tagalog: tagalogOutput,
      hebrew: hebrewOutput,
      phoneticHebrew: phonetic,
      category: 'תרגום פיליפינית בזמן אמת 🇵🇭',
      exampleSentence: null,
      isExactMatch: false,
      detectedLang: isHeb ? 'hebrew' : 'tagalog'
    };
  }

  // 4. מנוע נפילה מקומי (Word-by-word fallback)
  return translateFreeTextFallback(trimmed, isHeb);
}

function translateFreeTextFallback(trimmed, isHeb) {
  let matchedWords = [];
  const words = trimmed.split(/\s+/);

  words.forEach(w => {
    const match = masterDictionaryMap.get(w.toLowerCase());
    if (match) {
      matchedWords.push(isHeb ? match.tagalog : match.hebrew);
    } else {
      matchedWords.push(w);
    }
  });

  const translatedText = matchedWords.join(' ');
  const tagalogOutput = isHeb ? translatedText : trimmed;
  const hebrewOutput = isHeb ? trimmed : translatedText;

  return {
    originalText: trimmed,
    tagalog: tagalogOutput,
    hebrew: hebrewOutput,
    phoneticHebrew: generateTagalogPhonetic(tagalogOutput),
    category: 'תרגום חופשי',
    exampleSentence: null,
    isExactMatch: false,
    detectedLang: isHeb ? 'hebrew' : 'tagalog'
  };
}

export const quickTravelPhrases = [
  { tagalog: "Saan ang hotel?", hebrew: "איפה המלון?", phonetic: "סָאָאן אָנְג הוֹתֶל?" },
  { tagalog: "Magkano ito?", hebrew: "כמה זה עולה?", phonetic: "מָאגְכָּאנוֹ אִיתוֹ?" },
  { tagalog: "Maraming salamat po", hebrew: "תודה רבה מאוד", phonetic: "מָארָאמִינְג סָלָמָאט פּוֹ" },
  { tagalog: "Para po sa kanto", hebrew: "עצור בצד בפינה", phonetic: "פָּארָה פּוֹ סָא כָּאנְתוֹ" },
  { tagalog: "Pahingi ng tubig", hebrew: "אפשר לקבל מים?", phonetic: "פָּאהִין-גִי נְג תוּבִֿיג" },
  { tagalog: "Masarap ang pagkain!", hebrew: "האוכל ממש טעים!", phonetic: "מָאסָארָאפּ אָנְג פָּאגְכָּאִין!" },
  { tagalog: "Mahal kita", hebrew: "אני אוהב אותך", phonetic: "מָאהָאל כִּיתָה" }
];
