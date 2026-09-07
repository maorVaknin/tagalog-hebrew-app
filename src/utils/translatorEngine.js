/**
 * מנוע תרגום חופשי בלייב (Live Google Translate Engine)
 * משלב שליפה מהירה ממאגר המילון וחיבור בזמן אמת ל-Google Translate API.
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
 * מנוע פונטיקה דינמי להמרת מילות טגלוג לתעתיק בעברית מנוקדת
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
  "island": "אָאיְלֶנְד",
  "hopping": "הוֹפִּינְג",
  "bangka": "בָּאנְג-כָּה",
  "kwarto": "כְּוָוארְתוֹ",
  "susi": "סוּסִי",
  "tulong": "תוּלוֹנְג",
  "masakit": "מָאסָאכִֿית",
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
  "bapor": "בָּאפּוֹר"
};

export function generateTagalogPhonetic(tagalogText) {
  if (!tagalogText) return '';
  const words = tagalogText.toLowerCase().replace(/[^a-zñ\s-]/g, '').split(/\s+/);
  
  const phoneticWords = words.map(w => {
    if (phoneticDictionary[w]) return phoneticDictionary[w];
    return w
      .replace(/mag/g, 'מָאג')
      .replace(/ang/g, 'אָנְג')
      .replace(/ing/g, 'אִין-ג')
      .replace(/ng/g, 'נְג')
      .replace(/ka/g, 'כָּה')
      .replace(/ko/g, 'כּוֹ')
      .replace(/mo/g, 'מוֹ')
      .replace(/na/g, 'נָא')
      .replace(/pa/g, 'פָּא')
      .replace(/ba/g, 'בָּא')
      .replace(/sa/g, 'סָא')
      .replace(/ta/g, 'תָּא');
  });

  return phoneticWords.join(' ');
}

/**
 * זיהוי האם טקסט מכיל מילים באנגלית ומחייב תרגום שני (pivot) לטאגאלוג/פיליפינית
 */
function isEnglishSentence(text) {
  if (!text) return false;
  const englishWordsRegex = /\b(the|is|are|where|how|much|want|order|food|hotel|restaurant|closest|near|where's|there's|can|you|help|my|to|a|an|in|on|at|for|ride|city|center|airport|please|thank|thanks|your)\b/i;
  const tagalogMarkers = /\b(ang|ng|sa|mga|po|ko|mo|na|ka|si|ako|ikaw|kami|tayo|sila|saan|kailan|bakit|magkano|masarap|salamat|maraming|gusto|para|ba|pa|din|rin)\b/i;
  
  return englishWordsRegex.test(text) && !tagalogMarkers.test(text);
}

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
 * תרגום אסינכרוני בזמן אמת מול מנועי תרגום פיליפינית (MyMemory API + Google Translate + מילון מקומי)
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

  // 2. תרגום מעברית לפיליפינית / Tagalog
  if (isHeb) {
    // 2.1 ניסיון תרגום ישיר עברית -> טאגאלוג
    let tagalogRes = await fetchMyMemoryTranslation(trimmed, 'he', 'tl');

    // 2.2 אם התוצאה החזירה אנגלית או ריקה - ביצוע פיווט (Hebrew -> English -> Tagalog)
    if (!tagalogRes || tagalogRes.toLowerCase() === trimmed.toLowerCase() || isEnglishSentence(tagalogRes)) {
      const englishIntermediate = await fetchMyMemoryTranslation(trimmed, 'he', 'en');
      if (englishIntermediate) {
        const tagalogPivot = await fetchMyMemoryTranslation(englishIntermediate, 'en', 'tl');
        if (tagalogPivot) {
          tagalogRes = tagalogPivot;
        }
      }
    }

    // ניקוי תווי מכונה וסימנים (למשל: "Mag - order" -> "Mag-order")
    if (tagalogRes) {
      tagalogRes = tagalogRes
        .replace(/\s+-\s+/g, '-')
        .replace(/\bTYVM\b/gi, 'Maraming salamat');
      
      const phonetic = generateTagalogPhonetic(tagalogRes);

      return {
        originalText: trimmed,
        tagalog: tagalogRes,
        hebrew: trimmed,
        phoneticHebrew: phonetic,
        category: 'תרגום פיליפינית בזמן אמת 🇵🇭',
        exampleSentence: null,
        isExactMatch: false,
        detectedLang: 'hebrew'
      };
    }
  } else {
    // מפיליפינית/אנגלית לעברית
    let hebrewRes = await fetchMyMemoryTranslation(trimmed, 'tl', 'he');
    if (!hebrewRes || hebrewRes.toLowerCase() === trimmed.toLowerCase()) {
      hebrewRes = await fetchMyMemoryTranslation(trimmed, 'en', 'he');
    }

    if (hebrewRes) {
      return {
        originalText: trimmed,
        tagalog: trimmed,
        hebrew: hebrewRes,
        phoneticHebrew: generateTagalogPhonetic(trimmed),
        category: 'תרגום פיליפינית בזמן אמת 🇵🇭',
        exampleSentence: null,
        isExactMatch: false,
        detectedLang: 'tagalog'
      };
    }
  }

  // 3. מנוע נפילה מקומי (Word-by-word fallback)
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
