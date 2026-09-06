import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakTagalog } from '../utils/audioTTS';
import './QuizView.css';

export const QuizView = ({ lesson, onCompleteQuiz, onBackToSyllabus, onActivity }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = lesson.quiz || [];
  const currentQuestion = questions[currentIndex];

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
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const xpEarned = Math.round((score / questions.length) * 50) + 10;
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      onCompleteQuiz(lesson.lessonId, xpEarned);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container glass-panel animate-fade-in text-center">
        <h2>אין שאלות מבחן בשיעור זה עדיין</h2>
        <button className="quiz-btn primary" onClick={onBackToSyllabus}>חזרה למסלול</button>
      </div>
    );
  }

  if (isFinished) {
    const successPercentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-finished-card glass-panel animate-fade-in">
        <div className="finish-badge">🎉</div>
        <h2>סיימת את המבחן!</h2>
        <p className="finish-sub">שיעור: {lesson.title}</p>

        <div className="result-circle">
          <span className="res-num">{successPercentage}%</span>
          <span className="res-lbl">{score} מתוך {questions.length} תשובות נכונות</span>
        </div>

        <div className="finish-actions">
          <button className="quiz-btn secondary" onClick={() => {
            setCurrentIndex(0);
            setScore(0);
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
          שאלה {currentIndex + 1} מתוך {questions.length}
        </div>
      </div>

      <div className="quiz-bar-container">
        <div 
          className="quiz-bar-fill" 
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

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
              {selectedOption === currentQuestion.correctAnswer ? '✨ תשובה נכונה מאוד!' : '❌ תשובה לא מדויקת'}
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
