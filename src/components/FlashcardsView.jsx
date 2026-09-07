import React, { useState } from 'react';
import { Volume2, RotateCw, CheckCircle, ArrowRight, ArrowLeft, Sparkles, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakTagalog } from '../utils/audioTTS';
import { updateWordRating } from '../utils/srsEngine';
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

export const FlashcardsView = ({ lesson, onCompleteLesson, onBackToSyllabus, onStartQuiz, onActivity }) => {
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

    // 1. שמירת דירוג המילה ב-SRS Database
    updateWordRating(currentVocab, rating);

    let updatedQueue = [...queue];

    if (rating === 'easy') {
      // מילה שנשלטה - סימון כנשלטת
      const updated = new Set(masteredIds);
      updated.add(currentVocab.id || currentVocab.tagalog);
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
    return (
      <div className="flashcard-completion glass-panel animate-fade-in">
        <div className="completion-icon">🏆</div>
        <h2>סיימת את השיעור בהצלחה מלאה!</h2>
        <p className="completion-sub">
          תרגלת את כל {totalVocab} המילים בשיעור "{lesson.title}". המילים הקשות והבינוניות עברו חזרות מותאמות עד לשליטה!
        </p>
        
        <div className="completion-stats">
          <div className="comp-stat-card">
            <span className="comp-stat-val">+{30 + masteredIds.size * 5 + repeatCount * 2}</span>
            <span className="comp-stat-lbl">נקודות XP נצברו</span>
          </div>
          <div className="comp-stat-card">
            <span className="comp-stat-val">{masteredIds.size} / {totalVocab}</span>
            <span className="comp-stat-lbl">מילים נשלטו בציון "קל"</span>
          </div>
          {repeatCount > 0 && (
            <div className="comp-stat-card highlight">
              <span className="comp-stat-val">🔁 {repeatCount}</span>
              <span className="comp-stat-lbl">חזרות אדפטיביות שבוצעו</span>
            </div>
          )}
        </div>

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
