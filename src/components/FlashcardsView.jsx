import React, { useState } from 'react';
import { Volume2, RotateCw, CheckCircle, ArrowRight, ArrowLeft, Sparkles, AlertCircle, RefreshCw, Layers, BookmarkPlus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakTagalog } from '../utils/audioTTS';
import { updateWordRating, createCustomReviewLesson } from '../utils/srsEngine';
import './FlashcardsView.css';

// Helper function to split main translation from parenthesis notes
const parseHebrewTranslation = (rawHebrew) => {
  if (!rawHebrew) return { main: '', note: '' };
  const match = rawHebrew.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return { main: match[1].trim(), note: match[2].trim() };
  }
  return { main: rawHebrew, note: '' };
};

export const FlashcardsView = ({ lesson, onCompleteLesson, onBackToSyllabus, onStartQuiz, onActivity, onStartCustomReview }) => {
  // תור אדפטיבי (Adaptive Dynamic Queue)
  const [queue, setQueue] = useState(() => lesson.vocabulary.map(v => ({ ...v, lessonId: lesson.lessonId })));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate] = useState(1.0);
  const [masteredIds, setMasteredIds] = useState(new Set());
  const [repeatCount, setRepeatCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioHintVisible, setAudioHintVisible] = useState(false);

  const [initialRatings, setInitialRatings] = useState({});
  const [sessionUnknownWords, setSessionUnknownWords] = useState([]);

  const currentVocab = queue[currentIndex] || lesson.vocabulary[0];
  const { main: mainHebrew, note: hebrewNote } = parseHebrewTranslation(currentVocab?.hebrew);

  const handlePlayAudio = (text, e) => {
    if (e) e.stopPropagation();
    setIsPlaying(true);
    if (onActivity) onActivity();

    speakTagalog(text, {
      rate: speechRate,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => {
        setIsPlaying(false);
        setAudioHintVisible(true);
      }
    });
  };

  const handleRating = (rating) => {
    setIsFlipped(false);
    if (onActivity) onActivity();

    const vocabId = currentVocab.id || currentVocab.tagalog;

    // 1. תיעוד דירוג ראשוני למילה זו
    if (!initialRatings[vocabId]) {
      setInitialRatings(prev => ({ ...prev, [vocabId]: rating }));
    }

    // 2. הוספה למאגר המילים שלא ידעתי בסשן
    if (rating === 'hard' || rating === 'medium') {
      setSessionUnknownWords(prev => {
        const exists = prev.some(w => (w.id || w.tagalog) === vocabId);
        return exists ? prev : [...prev, currentVocab];
      });
    }

    // 3. שמירת דירוג המילה ב-SRS Database
    updateWordRating(currentVocab, rating);

    let updatedQueue = [...queue];

    if (rating === 'easy') {
      // מילה שנשלטה - סימון כנשלטת
      const updated = new Set(masteredIds);
      updated.add(vocabId);
      setMasteredIds(updated);
    } else if (rating === 'hard') {
      // מילה קשה - הכנסה מחדש לתור במרחק 2-3 כרטיסיות
      const reinsertIndex = Math.min(currentIndex + 3, updatedQueue.length);
      updatedQueue.splice(reinsertIndex, 0, { 
        ...currentVocab, 
        isRepeat: true, 
        repeatReason: '🔴 מילה קשה - חזרה נוספת' 
      });
      setQueue(updatedQueue);
      setRepeatCount(prev => prev + 1);
    } else if (rating === 'medium') {
      // מילה בינונית - הכנסה מחדש לסוף התור
      updatedQueue.push({ 
        ...currentVocab, 
        isRepeat: true, 
        repeatReason: '🟡 מילה בינונית - חיזוק בסוף' 
      });
      setQueue(updatedQueue);
      setRepeatCount(prev => prev + 1);
    }

    // מעבר לכרטיסייה הבאה בתור
    if (currentIndex + 1 < updatedQueue.length) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 150);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      const earnedXP = 30 + masteredIds.size * 5 + repeatCount * 2;
      onCompleteLesson(lesson.lessonId, earnedXP);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < queue.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (isCompleted) {
    const totalVocab = lesson.vocabulary.length;
    const ratingsArray = Object.values(initialRatings);
    const easyCount = ratingsArray.filter(r => r === 'easy').length;
    const mediumCount = ratingsArray.filter(r => r === 'medium').length;
    const hardCount = ratingsArray.filter(r => r === 'hard').length;

    // חישוב ציון משוקלל מתוך 100
    const rawScore = totalVocab > 0
      ? Math.round(((easyCount * 100 + mediumCount * 70 + hardCount * 40) / totalVocab))
      : 100;
    const finalGrade = Math.max(60, rawScore);

    let gradeLabel = '🌟 מצוין! שליטה מעולה';
    let gradeColor = '#10b981';
    if (finalGrade < 80) {
      gradeLabel = '💪 טוב מאוד! נדרש עוד חיזוק קל';
      gradeColor = '#f59e0b';
    } else if (finalGrade < 92) {
      gradeLabel = '👏 כל הכבוד! תוצאה נהדרת';
      gradeColor = '#38bdf8';
    }

    return (
      <div className="flashcard-completion glass-panel animate-fade-in">
        <div className="completion-icon">🏆</div>
        <h2>סיימת את השיעור בהצלחה מלאה!</h2>
        <p className="completion-sub">
          תרגלת את כל {totalVocab} המילים בשיעור "{lesson.title}". המילים הקשות והבינוניות עברו חזרות מותאמות עד לשליטה!
        </p>

        {/* Grade Badge Card */}
        <div className="grade-badge-card" style={{ borderColor: gradeColor }}>
          <div className="grade-score" style={{ color: gradeColor }}>
            {finalGrade} <span className="grade-max">/ 100</span>
          </div>
          <div className="grade-label">{gradeLabel}</div>
        </div>
        
        {/* Detailed Breakdown Stats - Conditional rendering of categories > 0 */}
        <div className="rating-breakdown-grid">
          {easyCount > 0 && (
            <div className="breakdown-stat-box easy">
              <span className="b-val">🟢 {easyCount} מתוך {totalVocab}</span>
              <span className="b-pct">({Math.round((easyCount / totalVocab) * 100)}%)</span>
              <span className="b-lbl">קלה (שליטה מיידית)</span>
            </div>
          )}
          {mediumCount > 0 && (
            <div className="breakdown-stat-box medium">
              <span className="b-val">🟡 {mediumCount} מתוך {totalVocab}</span>
              <span className="b-pct">({Math.round((mediumCount / totalVocab) * 100)}%)</span>
              <span className="b-lbl">בינונית (חזרה בסוף)</span>
            </div>
          )}
          {hardCount > 0 && (
            <div className="breakdown-stat-box hard">
              <span className="b-val">🔴 {hardCount} מתוך {totalVocab}</span>
              <span className="b-pct">({Math.round((hardCount / totalVocab) * 100)}%)</span>
              <span className="b-lbl">קשה (חזרות מרובות)</span>
            </div>
          )}
        </div>

        <div className="completion-stats">
          <div className="comp-stat-card">
            <span className="comp-stat-val">+{30 + masteredIds.size * 5 + repeatCount * 2}</span>
            <span className="comp-stat-lbl">נקודות XP נצברו</span>
          </div>
          <div className="comp-stat-card">
            <span className="comp-stat-val">{easyCount} / {totalVocab}</span>
            <span className="comp-stat-lbl">מילים בציון "קל"</span>
          </div>
          {repeatCount > 0 && (
            <div className="comp-stat-card highlight">
              <span className="comp-stat-val">🔁 {repeatCount}</span>
              <span className="comp-stat-lbl">חזרות אדפטיביות</span>
            </div>
          )}
        </div>

        {/* Dedicated Post-Lesson Focus Review for Unknown Words */}
        {sessionUnknownWords.length > 0 && (
          <div className="unknown-words-focus-box glass-panel animate-scale-up">
            <div className="focus-box-header">
              <BookmarkPlus size={22} className="focus-icon-gold" />
              <div>
                <h4 className="focus-title">נשמרו {sessionUnknownWords.length} מילים במאגר "לא ידעתי"!</h4>
                <p className="focus-desc">רוצה לתרגל עכשיו בנפרד רק את המילים שלא ידעת בשיעור זה?</p>
              </div>
            </div>
            <button 
              className="action-btn unknown-focus-btn"
              onClick={() => {
                const customLesson = createCustomReviewLesson(
                  sessionUnknownWords, 
                  `🔥 תרגול מופרד: ${sessionUnknownWords.length} מילים שלא ידעת בשיעור`
                );
                if (onStartCustomReview) {
                  onStartCustomReview(customLesson);
                }
              }}
            >
              <Sparkles size={18} />
              <span>התחל תרגול מופרד ממוקד ({sessionUnknownWords.length} מילים) ←</span>
            </button>
          </div>
        )}

        <div className="completion-actions">
          <button className="action-btn secondary" onClick={onBackToSyllabus}>
            חזרה למסלול הלימוד
          </button>
          <button className="action-btn primary" onClick={() => onStartQuiz(lesson)}>
            <Sparkles size={18} />
            עבור למבחן השיעור!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flashcards-wrapper animate-fade-in" dir="rtl">
      <div className="flashcards-topbar">
        <button className="back-link" onClick={onBackToSyllabus}>
          ← בחירת שיעור
        </button>
        <div className="lesson-info">
          <h3>{lesson.title}</h3>
          <span className="progress-counter">
            כרטיסייה {currentIndex + 1} מתוך {queue.length} בתור
          </span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${Math.min(100, ((currentIndex + 1) / queue.length) * 100)}%` }}
        />
      </div>

      {/* תווית חזרה אדפטיבית */}
      {currentVocab.isRepeat && (
        <div className="adaptive-repeat-pill animate-bounce">
          <RefreshCw size={14} />
          <span>{currentVocab.repeatReason}</span>
        </div>
      )}

      <div className="card-scene">
        <div 
          className={`flashcard-3d ${isFlipped ? 'is-flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Card Front: Tagalog Word & Pronunciation */}
          <div className="card-side card-front glass-panel">
            <div className="card-badge">{currentVocab.category || 'כללי'}</div>
            
            <div className="card-main-content">
              <h1 className="tagalog-heading">{currentVocab.tagalog}</h1>
              
              <div className="phonetic-container">
                <span className="phonetic-label">🗣️ תעתיק פונטי:</span>
                <span className="phonetic-text">{currentVocab.phoneticHebrew}</span>
              </div>
            </div>

            <button 
              className={`audio-trigger-btn ${isPlaying ? 'playing' : ''}`}
              onClick={(e) => handlePlayAudio(currentVocab.tagalog, e)}
            >
              <Volume2 size={24} className={isPlaying ? 'animate-bounce' : ''} />
              <span>{isPlaying ? 'משמיע שמע...' : 'השמע הגייה בטגלוג'}</span>
            </button>

            {audioHintVisible && (
              <div className="iphone-mute-hint" onClick={(e) => e.stopPropagation()}>
                <AlertCircle size={14} /> באייפון? וודא שמתג השמע הפיזי בצד המכשיר אינו על השתק/רטט.
              </div>
            )}

            <div className="flip-prompt">
              <RotateCw size={16} /> לחץ להפיכת הכרטיסייה לתרגום בעברית
            </div>
          </div>

          {/* Card Back: Clean Hebrew Translation & Example */}
          <div className="card-side card-back glass-panel">
            <div className="card-badge back-badge">תרגום בעברית ומשפט דוגמה</div>
            
            <div className="card-main-content">
              {/* Clean Hebrew Title */}
              <h2 className="hebrew-heading">{mainHebrew}</h2>
              
              {/* Grammar/Context Note Pill */}
              {hebrewNote && (
                <div className="hebrew-note-pill">
                  <Sparkles size={14} />
                  <span>{hebrewNote}</span>
                </div>
              )}
              
              {/* Clean Example Box */}
              {currentVocab.exampleSentence && (
                <div className="example-card-box">
                  <div className="example-tagalog-line">
                    <span className="ex-flag">🇵🇭</span>
                    <span className="ex-tagalog-text">{currentVocab.exampleSentence.tagalog}</span>
                  </div>
                  <div className="example-phonetic-line">
                    <span className="ex-speaker">🗣️</span>
                    <span className="ex-phonetic-text">{currentVocab.exampleSentence.phoneticHebrew}</span>
                  </div>
                  <div className="example-hebrew-line">
                    <span className="ex-flag">🇮🇱</span>
                    <span className="ex-hebrew-text">"{currentVocab.exampleSentence.hebrew}"</span>
                  </div>
                </div>
              )}
            </div>

            {/* Rating Buttons */}
            <div className="rating-buttons-container" onClick={(e) => e.stopPropagation()}>
              <span className="rating-title">איך הרגשת עם המילה הזו?</span>
              <div className="rating-grid">
                <button className="rate-btn hard" onClick={() => handleRating('hard')}>
                  🔴 קשה (שוב בקרוב)
                </button>
                <button className="rate-btn medium" onClick={() => handleRating('medium')}>
                  🟡 בינוני (חזרה בסוף)
                </button>
                <button className="rate-btn easy" onClick={() => handleRating('easy')}>
                  🟢 קל (שולט!)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-navigation">
        <button className="nav-arrow-btn" onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowRight size={18} /> המילה הקודמת
        </button>

        <button className="flip-btn-direct" onClick={() => setIsFlipped(!isFlipped)}>
          <RotateCw size={16} /> {isFlipped ? 'צד טגלוג' : 'צד עברית'}
        </button>

        <button className="nav-arrow-btn primary" onClick={handleNext}>
          המילה הבאה <ArrowLeft size={18} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardsView;
