import React, { useState } from 'react';
import { Volume2, RotateCw, CheckCircle, ArrowRight, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakTagalog } from '../utils/audioTTS';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechRate] = useState(1.0);
  const [masteredIds, setMasteredIds] = useState(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [audioHintVisible, setAudioHintVisible] = useState(false);

  const currentVocab = lesson.vocabulary[currentIndex];
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
    if (rating === 'easy') {
      const updated = new Set(masteredIds);
      updated.add(currentVocab.id);
      setMasteredIds(updated);
    }

    if (currentIndex + 1 < lesson.vocabulary.length) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 200);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      onCompleteLesson(lesson.lessonId, 30 + masteredIds.size * 5);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex + 1 < lesson.vocabulary.length) {
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
    return (
      <div className="flashcard-completion glass-panel animate-fade-in">
        <div className="completion-icon">🏆</div>
        <h2>כל הכבוד! סיימת את הכרטיסיות!</h2>
        <p className="completion-sub">למדת את כל {lesson.vocabulary.length} המילים בשיעור "{lesson.title}".</p>
        
        <div className="completion-stats">
          <div className="comp-stat-card">
            <span className="comp-stat-val">+{30 + masteredIds.size * 5}</span>
            <span className="comp-stat-lbl">נקודות XP נצברו</span>
          </div>
          <div className="comp-stat-card">
            <span className="comp-stat-val">{masteredIds.size} / {lesson.vocabulary.length}</span>
            <span className="comp-stat-lbl">מילים נשלטו בציון "קל"</span>
          </div>
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
            כרטיסייה {currentIndex + 1} מתוך {lesson.vocabulary.length}
          </span>
        </div>
      </div>

      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${((currentIndex + 1) / lesson.vocabulary.length) * 100}%` }}
        />
      </div>

      <div className="card-scene">
        <div 
          className={`flashcard-3d ${isFlipped ? 'is-flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Card Front: Tagalog Word & Pronunciation */}
          <div className="card-side card-front glass-panel">
            <div className="card-badge">{currentVocab.category}</div>
            
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
                  🔴 קשה (שוב)
                </button>
                <button className="rate-btn medium" onClick={() => handleRating('medium')}>
                  🟡 בינוני
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
