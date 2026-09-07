/**
 * מנוע תרגום חופשי בלייב (Live Tagalog-Hebrew Translator Engine)
 * תומך בחיפוש ותרגום עברית ⇄ טגלוג, יצירת תעתיק פונטי חכם ושילוב מנוע שמע.
 */
import { comprehensiveDictionaryData } from '../data/dictionaryData';
import { courseData } from '../data/courseData';

// 1. מילון מונחים מקוצר להתאמה מהירה
const masterDictionaryMap = new Map();

function initMasterDictionary() {
  if (masterDictionaryMap.size > 0) return;

  // מילות הקורס
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

  // מילות המילון המורחב
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
  "paalam": "פָּאָאָלָאם"
};

export function generateTagalogPhonetic(tagalogText) {
  if (!tagalogText) return '';
  const words = tagalogText.toLowerCase().replace(/[^a-zñ\s-]/g, '').split(/\s+/);
  
  const phoneticWords = words.map(w => {
    if (phoneticDictionary[w]) return phoneticDictionary[w];
    // מנגנון תעתיק בסיסי למילים לא מוכרות
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
 * הפונקציה הראשית לתרגום חופשי בלייב
 */
export function translateFreeText(inputText) {
  initMasterDictionary();
  const trimmed = (inputText || '').trim();
  if (!trimmed) return null;

  const inputKey = trimmed.toLowerCase();
  const isHeb = isHebrewText(trimmed);

  // 1. חיפוש התאמה מדויקת במילון
  const exactMatch = masterDictionaryMap.get(inputKey);
  if (exactMatch) {
    return {
      originalText: trimmed,
      tagalog: exactMatch.tagalog,
      hebrew: exactMatch.hebrew,
      phoneticHebrew: exactMatch.phoneticHebrew || generateTagalogPhonetic(exactMatch.tagalog),
      category: exactMatch.category || 'תרגום חופשי',
      exampleSentence: exactMatch.exampleSentence || null,
      isExactMatch: true,
      detectedLang: isHeb ? 'hebrew' : 'tagalog'
    };
  }

  // 2. תרגום חכם עבור משפטים ומילים חופשיות
  if (isHeb) {
    // תרגום מורכב מעברית לטגלוג
    let matchedTagalogWords = [];
    let matchedPhonetics = [];
    const words = trimmed.split(/\s+/);

    words.forEach(w => {
      const match = masterDictionaryMap.get(w.toLowerCase());
      if (match) {
        matchedTagalogWords.push(match.tagalog);
        if (match.phoneticHebrew) matchedPhonetics.push(match.phoneticHebrew);
      } else {
        matchedTagalogWords.push(w);
      }
    });

    const translatedTagalog = matchedTagalogWords.join(' ');
    const phonetic = matchedPhonetics.join(' ') || generateTagalogPhonetic(translatedTagalog);

    return {
      originalText: trimmed,
      tagalog: translatedTagalog,
      hebrew: trimmed,
      phoneticHebrew: phonetic,
      category: 'תרגום חופשי בלייב',
      exampleSentence: null,
      isExactMatch: false,
      detectedLang: 'hebrew'
    };
  } else {
    // תרגום חכם מפיליפינית/טגלוג לעברית
    let matchedHebrewWords = [];
    const words = trimmed.split(/\s+/);

    words.forEach(w => {
      const match = masterDictionaryMap.get(w.toLowerCase());
      if (match) {
        matchedHebrewWords.push(match.hebrew);
      } else {
        matchedHebrewWords.push(w);
      }
    });

    const translatedHebrew = matchedHebrewWords.join(' ');
    const phonetic = generateTagalogPhonetic(trimmed);

    return {
      originalText: trimmed,
      tagalog: trimmed,
      hebrew: translatedHebrew,
      phoneticHebrew: phonetic,
      category: 'תרגום חופשי בלייב',
      exampleSentence: null,
      isExactMatch: false,
      detectedLang: 'tagalog'
    };
  }
}

/**
 * ביטויים מהירים ושימושיים למטיילים
 */
export const quickTravelPhrases = [
  { tagalog: "Saan ang hotel?", hebrew: "איפה המלון?", phonetic: "סָאָאן אָנְג הוֹתֶל?" },
  { tagalog: "Magkano ito?", hebrew: "כמה זה עולה?", phonetic: "מָאגְכָּאנוֹ אִיתוֹ?" },
  { tagalog: "Maraming salamat po", hebrew: "תודה רבה מאוד", phonetic: "מָארָאמִינְג סָלָמָאט פּוֹ" },
  { tagalog: "Para po sa kanto", hebrew: "עצור בצד בפינה", phonetic: "פָּארָה פּוֹ סָא כָּאנְתוֹ" },
  { tagalog: "Pahingi ng tubig", hebrew: "אפשר לקבל מים?", phonetic: "פָּאהִין-גִי נְג תוּבִֿיג" },
  { tagalog: "Masarap ang pagkain!", hebrew: "האוכל ממש טעים!", phonetic: "מָאסָארָאפּ אָנְג פָּאגְכָּאִין!" },
  { tagalog: "Mahal kita", hebrew: "אני אוהב אותך", phonetic: "מָאהָאל כִּיתָה" }
];
