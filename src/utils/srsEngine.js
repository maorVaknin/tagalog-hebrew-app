/**
 * מנוע חזרות אדפטיבי (Spaced Repetition System - SRS)
 * מנהל את רמות הקושי של מילים (קשה, בינוני, קל), שומר אותן במכשיר ובערן,
 * ומאפשר שליפת מילים חלשות ומאגר מילים שלא ידעת לתרגול מופרד.
 */

const SRS_STORAGE_KEY = 'th_srs_word_ratings';
const UNKNOWN_VAULT_KEY = 'th_srs_unknown_vault';

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
 * @param {Object} word - אובייקט המילה
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

  // אם הדירוג הוא קשה או בינוני - הוספה אוטומטית למאגר "מילים שלא ידעתי"
  if (rating === 'hard' || rating === 'medium') {
    existing.inUnknownVault = true;
    addToUnknownVault(existing);
  } else if (rating === 'easy') {
    existing.inUnknownVault = false;
    removeFromUnknownVault(wordKey);
  }

  srsData[wordKey] = existing;
  saveSRSData(srsData);
  return existing;
}

/**
 * מנגנון ניהול מאגר המילים שלא ידעתי (Unknown Words Vault)
 */
export function getUnknownVaultWords() {
  try {
    const data = localStorage.getItem(UNKNOWN_VAULT_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function addToUnknownVault(word) {
  if (!word) return;
  try {
    const vault = getUnknownVaultWords();
    const wordKey = word.id || word.tagalog.toLowerCase().trim();
    const existsIndex = vault.findIndex(w => (w.id || w.tagalog.toLowerCase().trim()) === wordKey);

    if (existsIndex >= 0) {
      vault[existsIndex] = { ...vault[existsIndex], ...word, updatedAt: new Date().toISOString() };
    } else {
      vault.push({ ...word, addedAt: new Date().toISOString() });
    }
    localStorage.setItem(UNKNOWN_VAULT_KEY, JSON.stringify(vault));
  } catch (e) {}
}

export function removeFromUnknownVault(wordIdOrTagalog) {
  if (!wordIdOrTagalog) return;
  try {
    const key = wordIdOrTagalog.toLowerCase().trim();
    const vault = getUnknownVaultWords();
    const filtered = vault.filter(w => (w.id || w.tagalog.toLowerCase().trim()) !== key);
    localStorage.setItem(UNKNOWN_VAULT_KEY, JSON.stringify(filtered));
  } catch (e) {}
}

/**
 * שליפת כל המילים החלשות (קשות ובינוניות) הזקוקות לחיזוק
 */
export function getWeakWords() {
  const srsData = getSRSData();
  const weakWords = Object.values(srsData).filter(
    item => item.difficulty === 'hard' || item.difficulty === 'medium'
  );

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
  const unknownVault = getUnknownVaultWords();

  const hardCount = values.filter(w => w.difficulty === 'hard').length;
  const mediumCount = values.filter(w => w.difficulty === 'medium').length;
  const easyCount = values.filter(w => w.difficulty === 'easy').length;

  return {
    totalTracked: values.length,
    hardCount,
    mediumCount,
    easyCount,
    vaultCount: unknownVault.length
  };
}

/**
 * יצירת שיעור תרגול מותאם אישית עבור רשימת מילים ספציפית
 */
export function createCustomReviewLesson(vocabArray, title = '🔥 תרגול ממוקד - מילים שלא ידעת') {
  if (!vocabArray || vocabArray.length === 0) return null;

  return {
    lessonId: 'custom_unknown_words_practice_' + Date.now(),
    unitId: 'practice',
    title: title,
    description: `תרגול מופרד ומבודד של ${vocabArray.length} המילים שלא ידעת`,
    vocabulary: vocabArray.map(w => ({
      id: w.id || w.tagalog,
      tagalog: w.tagalog,
      hebrew: w.hebrew,
      phoneticHebrew: w.phoneticHebrew,
      category: w.category || 'מאגר מילים שלא ידעתי',
      exampleSentence: w.exampleSentence
    })),
    quiz: vocabArray.slice(0, 10).map((w, idx) => ({
      id: `q_custom_${idx}`,
      questionHebrew: `מה התרגום הנכון בטגלוג למילה: "${w.hebrew}"?`,
      options: [
        w.tagalog,
        'Salamat',
        'Magandang umaga',
        'Ano ito'
      ].sort(() => Math.random() - 0.5),
      correctAnswer: w.tagalog,
      explanationHebrew: `התרגום של "${w.hebrew}" בטגלוג הוא "${w.tagalog}" (הגייה: ${w.phoneticHebrew}).`
    }))
  };
}

/**
 * יצירת שיעור תרגול מדומה עבור מילים חלשות
 */
export function createWeakWordsLesson() {
  const weakWords = getWeakWords();
  if (weakWords.length === 0) return null;
  return createCustomReviewLesson(weakWords, '🧠 חזרה על מילים קשות ובינוניות');
}
