/**
 * מנוע חזרות אדפטיבי (Spaced Repetition System - SRS)
 * מנהל את רמות הקושי של מילים (קשה, בינוני, קל), שומר אותן במכשיר ובערן,
 * ומאפשר שליפת מילים חלשות לתרגול מרוכז.
 */

const SRS_STORAGE_KEY = 'th_srs_word_ratings';

/**
 * שליפת כל נתוני ה-SRS מהאחסון
 */
export function getSRSData() {
  try {
    const data = localStorage.getItem(SRS_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Failed to load SRS data:', e);
    return {};
  }
}

/**
 * שמירת נתוני SRS
 */
export function saveSRSData(srsData) {
  try {
    localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(srsData));
  } catch (e) {
    console.error('Failed to save SRS data:', e);
  }
}

/**
 * עדכון דירוג קושי למילה בודדת
 * @param {Object} word - אובייקט המילה (מכיל id, tagalog, hebrew, phoneticHebrew, category וכו')
 * @param {'hard' | 'medium' | 'easy'} rating - דרגת הקושי
 */
export function updateWordRating(word, rating) {
  if (!word || (!word.id && !word.tagalog)) return;
  const wordKey = word.id || word.tagalog.toLowerCase().trim();

  const srsData = getSRSData();
  const existing = srsData[wordKey] || {
    id: wordKey,
    tagalog: word.tagalog,
    hebrew: word.hebrew,
    phoneticHebrew: word.phoneticHebrew,
    category: word.category || 'כללי',
    lessonId: word.lessonId || null,
    exampleSentence: word.exampleSentence || null,
    reviewCount: 0,
    history: []
  };

  existing.difficulty = rating;
  existing.reviewCount = (existing.reviewCount || 0) + 1;
  existing.lastReviewed = new Date().toISOString();
  existing.history.push({ rating, date: new Date().toISOString() });

  srsData[wordKey] = existing;
  saveSRSData(srsData);
  return existing;
}

/**
 * שליפת כל המילים החלשות (קשות ובינוניות) הזקוקות לחיזוק
 */
export function getWeakWords() {
  const srsData = getSRSData();
  const weakWords = Object.values(srsData).filter(
    item => item.difficulty === 'hard' || item.difficulty === 'medium'
  );

  // מיון: מילים קשות (hard) תחילה, לאחר מכן בינוניות (medium)
  weakWords.sort((a, b) => {
    if (a.difficulty === 'hard' && b.difficulty !== 'hard') return -1;
    if (a.difficulty !== 'hard' && b.difficulty === 'hard') return 1;
    return new Date(b.lastReviewed) - new Date(a.lastReviewed);
  });

  return weakWords;
}

/**
 * שליפת סטטיסטיקות קושי למשתמש
 */
export function getSRSStats() {
  const srsData = getSRSData();
  const values = Object.values(srsData);
  
  const hardCount = values.filter(w => w.difficulty === 'hard').length;
  const mediumCount = values.filter(w => w.difficulty === 'medium').length;
  const easyCount = values.filter(w => w.difficulty === 'easy').length;

  return {
    totalTracked: values.length,
    hardCount,
    mediumCount,
    easyCount
  };
}

/**
 * יצירת שיעור תרגול מדומה עבור מילים חלשות
 */
export function createWeakWordsLesson() {
  const weakWords = getWeakWords();
  if (weakWords.length === 0) return null;

  return {
    lessonId: 'weak_words_practice',
    unitId: 'practice',
    title: '🧠 חזרה על מילים קשות ובינוניות',
    description: 'תרגול מותאם אישית של מילים שסומנו כקשות או בינוניות מכל השיעורים שלך',
    vocabulary: weakWords.map(w => ({
      id: w.id,
      tagalog: w.tagalog,
      hebrew: w.hebrew,
      phoneticHebrew: w.phoneticHebrew,
      category: w.category || 'חזרה חכמה',
      exampleSentence: w.exampleSentence
    })),
    quiz: weakWords.slice(0, 10).map((w, idx) => ({
      id: `q_weak_${idx}`,
      question: `מה התרגום הנכון בטגלוג למילה: "${w.hebrew}"?`,
      options: [
        w.tagalog,
        'Salamat',
        'Magandang umaga',
        'Ano ito'
      ].sort(() => Math.random() - 0.5),
      correctAnswer: w.tagalog,
      explanation: `התרגום של "${w.hebrew}" בטגלוג הוא "${w.tagalog}" (הגייה: ${w.phoneticHebrew}).`
    }))
  };
}
