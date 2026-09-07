import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakTagalog } from '../utils/audioTTS';
import { updateWordRating } from '../utils/srsEngine';
import './QuizView.css';

export const QuizView = ({ lesson, onCompleteQuiz, onBackToSyllabus, onActivity }) => {
  const [quizQueue, setQuizQueue] = useState(() => lesson.quiz ? [...lesson.quiz] : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);
  const [wrongRepeatsCount, setWrongRepeatsCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quizQueue[currentIndex];

  const handlePlayAudio = (text) => {
    speakTagalog(text);
    if (onActivity) onActivity();
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (onActivity) onActivity();

    const isCorrect = option === currentQuestion.correctAnswer;
    const targetWord = {
      tagalog: currentQuestion.correctAnswer,
      hebrew: currentQuestion.questionHebrew || currentQuestion.explanationHebrew,
      category: lesson.title
    };

    if (isCorrect) {
      if (!currentQuestion.isRepeat) {
        setFirstTryCorrectCount(prev => prev + 1);
      }
      updateWordRating(targetWord, 'easy');
    } else {
      // תשובה שגויה - הגדרה כקשה והכנסה מחדש לסוף המבחן
      updateWordRating(targetWord, 'hard');
      setWrongRepeatsCount(prev => prev + 1);
      setQuizQueue(prev => [
        ...prev, 
        { ...currentQuestion, isRepeat: true }
      ]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQueue.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const initialTotal = lesson.quiz ? lesson.quiz.length : 1;
      const successPercentage = Math.round((firstTryCorrectCount / initialTotal) * 100);
      const xpEarned = Math.round((successPercentage / 100) * 50) + 15;
      
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onCompleteQuiz(lesson.lessonId, xpEarned);
    }
  };

  if (!lesson.quiz || lesson.quiz.length === 0) {
    return (
      <div className="quiz-container glass-panel animate-fade-in text-center">
        <h2>אין שאלות מבחן בשיעור זה עדיין</h2>
        <button className="quiz-btn primary" onClick={onBackToSyllabus}>חזרה למסלול</button>
      </div>
    );
  }

  if (isFinished) {
    const initialTotal = lesson.quiz.length;
    const rawScore = Math.round((firstTryCorrectCount / initialTotal) * 100);
    const finalGrade = Math.max(60, rawScore);
    const wrongCount = initialTotal - firstTryCorrectCount;

    let gradeLabel = '🌟 מצוין! שליטה מעולה';
    let gradeColor = '#10b981';
    if (finalGrade < 75) {
      gradeLabel = '💪 טוב מאוד! נדרש עוד תרגול';
      gradeColor = '#f59e0b';
    } else if (finalGrade < 90) {
      gradeLabel = '👏 כל הכבוד! תוצאה טובה';
      gradeColor = '#38bdf8';
    }

    return (
      <div className="quiz-finished-card glass-panel animate-fade-in">
        <div className="finish-badge">🏆</div>
        <h2>סיימת את המבחן בהצלחה!</h2>
        <p className="finish-sub">שיעור: {lesson.title}</p>

        {/* Grade Badge Card */}
        <div className="grade-badge-card" style={{ borderColor: gradeColor }}>
          <div className="grade-score" style={{ color: gradeColor }}>
            {finalGrade} <span className="grade-max">/ 100</span>
          </div>
          <div className="grade-label">{gradeLabel}</div>
        </div>

        {/* Quiz Breakdown Stats */}
        <div className="rating-breakdown-grid">
          <div className="breakdown-stat-box easy">
            <span className="b-val">🟢 {firstTryCorrectCount}</span>
            <span className="b-lbl">נכון מניסיון ראשון</span>
          </div>
          <div className="breakdown-stat-box hard">
            <span className="b-val">🔴 {wrongCount}</span>
            <span className="b-lbl">שגוי (תוקן בסוף)</span>
          </div>
          <div className="breakdown-stat-box medium">
            <span className="b-val">🔁 {wrongRepeatsCount}</span>
            <span className="b-lbl">סך חזרות אדפטיביות</span>
          </div>
        </div>

        {wrongRepeatsCount > 0 && (
          <div className="quiz-repeat-summary-pill">
            🔁 {wrongRepeatsCount} שאלות שגויות חזרו בסוף המבחן עד לשליטה מלאה!
          </div>
        )}

        <div className="finish-actions">
          <button className="quiz-btn secondary" onClick={() => {
            setQuizQueue([...lesson.quiz]);
            setCurrentIndex(0);
            setFirstTryCorrectCount(0);
            setWrongRepeatsCount(0);
            setIsFinished(false);
            setSelectedOption(null);
            setIsAnswered(false);
          }}>
            נסה שוב 🔄
          </button>
          <button className="quiz-btn primary" onClick={onBackToSyllabus}>
            חזרה למפת השיעורים 🗺️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container animate-fade-in">
      <div className="quiz-topbar">
        <button className="back-link" onClick={onBackToSyllabus}>← יציאה מהמבחן</button>
        <div className="quiz-progress-text">
          שאלה {currentIndex + 1} מתוך {quizQueue.length}
        </div>
      </div>

      <div className="quiz-bar-container">
        <div 
          className="quiz-bar-fill" 
          style={{ width: `${((currentIndex + 1) / quizQueue.length) * 100}%` }}
        />
      </div>

      {currentQuestion.isRepeat && (
        <div className="quiz-repeat-notice animate-bounce">
          <RefreshCw size={14} />
          <span>שאלה זו חזרה לשליטה נוספת בעקבות טעות קודמת</span>
        </div>
      )}

      <div className="question-card glass-panel">
        <div className="question-type-badge">
          {currentQuestion.type === 'listening' ? '🎧 מבחן האזנה' : 
           currentQuestion.type === 'fill-in-blank' ? '✏️ השלמת חסרים' : '❓ שאלת תרגול'}
        </div>

        <h2 className="question-title">{currentQuestion.questionHebrew}</h2>

        {currentQuestion.type === 'listening' && (
          <div className="listening-audio-box">
            <button 
              className="big-audio-btn"
              onClick={() => handlePlayAudio(currentQuestion.tagalogAudioText)}
            >
              <Volume2 size={32} />
              <span>השמע שוב את הצליל בטגלוג</span>
            </button>
          </div>
        )}

        <div className="options-grid">
          {currentQuestion.options.map((option, idx) => {
            let optionStateClass = '';
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer) {
                optionStateClass = 'correct';
              } else if (option === selectedOption) {
                optionStateClass = 'incorrect';
              } else {
                optionStateClass = 'disabled';
              }
            }

            return (
              <button
                key={idx}
                className={`option-btn ${optionStateClass}`}
                onClick={() => handleSelectOption(option)}
                disabled={isAnswered}
              >
                <span className="option-index">{idx + 1}</span>
                <span className="option-text">{option}</span>

                {isAnswered && option === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="icon-correct" size={20} />
                )}
                {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                  <XCircle className="icon-incorrect" size={20} />
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`explanation-card ${selectedOption === currentQuestion.correctAnswer ? 'exp-success' : 'exp-fail'}`}>
            <div className="exp-header">
              {selectedOption === currentQuestion.correctAnswer ? '✨ תשובה נכונה מאוד!' : '❌ תשובה לא מדויקת (תחזור בסוף המבחן)'}
            </div>
            <p className="exp-text">{currentQuestion.explanationHebrew}</p>
            
            <button className="quiz-btn primary next-q-btn" onClick={handleNext}>
              לשאלה הבאה <ArrowLeft size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;
