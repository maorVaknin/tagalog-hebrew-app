import React, { useState, useEffect } from 'react';
import { Search, Volume2, Copy, Check, X, Globe, Sparkles, ArrowLeftRight, HelpCircle } from 'lucide-react';
import { speakTagalog } from '../utils/audioTTS';
import { translateFreeText, quickTravelPhrases } from '../utils/translatorEngine';
import './LiveTranslatorModal.css';

export function LiveTranslatorModal({ isOpen, onClose }) {
  const [inputText, setInputText] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inputText.trim()) {
      const res = translateFreeText(inputText);
      setTranslationResult(res);
    } else {
      setTranslationResult(null);
    }
  }, [inputText]);

  if (!isOpen) return null;

  const handlePlayAudio = (text) => {
    if (text) speakTagalog(text);
  };

  const handleCopyText = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectQuickPhrase = (phrase) => {
    setInputText(phrase.hebrew);
  };

  return (
    <div className="translator-modal-backdrop animate-fade-in" onClick={onClose} dir="rtl">
      <div className="translator-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="translator-header">
          <div className="translator-header-title">
            <div className="translator-globe-icon"><Globe size={22} /></div>
            <div>
              <h3>מתרגם חופשי בלייב</h3>
              <span className="translator-sub-title">תרגום מיידי עברית ⇄ טגלוג עם שמע ותעתיק</span>
            </div>
          </div>
          <button className="translator-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Input Bar */}
        <div className="translator-input-group">
          <textarea
            className="translator-textarea"
            placeholder="הקלד כאן כל מילה או משפט חופשי (למשל: כמה זה עולה?, איפה המלון?, Saan ang beach?)..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={2}
            autoFocus
          />
          {inputText && (
            <button className="translator-clear-btn" onClick={() => setInputText('')}>
              <X size={18} />
            </button>
          )}
        </div>

        {/* Translation Results Display */}
        {translationResult ? (
          <div className="translation-result-card animate-fade-in">
            <div className="result-header">
              <span className="result-badge">{translationResult.category}</span>
              <span className="result-lang-indicator">
                <ArrowLeftRight size={13} /> {translationResult.detectedLang === 'hebrew' ? 'מעברית לטגלוג' : 'מטגלוג לעברית'}
              </span>
            </div>

            {/* Tagalog Output Box */}
            <div className="result-output-box tagalog-box">
              <div className="output-label">🇵🇭 טגלוג (Tagalog)</div>
              <div className="output-main-row">
                <span className="output-text tagalog-text">{translationResult.tagalog}</span>
                <div className="output-actions">
                  <button 
                    className="action-btn audio-btn"
                    onClick={() => handlePlayAudio(translationResult.tagalog)}
                    title="השמע הגייה"
                  >
                    <Volume2 size={20} />
                  </button>
                  <button 
                    className={`action-btn copy-btn ${copied ? 'copied' : ''}`}
                    onClick={() => handleCopyText(translationResult.tagalog)}
                    title="העתק טקסט"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Phonetic Hebrew Transliteration Box */}
            {translationResult.phoneticHebrew && (
              <div className="result-output-box phonetic-box">
                <div className="output-label">🗣️ תעתיק פונטי בעברית (איך הוגים)</div>
                <div className="phonetic-text">{translationResult.phoneticHebrew}</div>
              </div>
            )}

            {/* Hebrew Definition Box */}
            <div className="result-output-box hebrew-box">
              <div className="output-label">🇮🇱 תרגום לעברית</div>
              <div className="hebrew-text">"{translationResult.hebrew}"</div>
            </div>

            {/* Example Sentence if available */}
            {translationResult.exampleSentence && (
              <div className="result-example-box">
                <span className="example-title">💬 משפט דוגמה בשיחה:</span>
                <div className="example-tagalog">{translationResult.exampleSentence.tagalog}</div>
                <div className="example-hebrew">"{translationResult.exampleSentence.hebrew}"</div>
              </div>
            )}
          </div>
        ) : (
          <div className="translator-empty-state">
            <Sparkles size={32} className="empty-sparkle-icon" />
            <p>הקלידו מילה או משפט חופשי כדי לקבל תרגום מיידי, תעתיק פונטי והשמעה קולית.</p>
          </div>
        )}

        {/* Quick Travel Phrase Chips */}
        <div className="quick-phrases-section">
          <span className="quick-phrases-label">⚡ ביטויים נפוצים בלחיצה אחת:</span>
          <div className="quick-phrases-chips">
            {quickTravelPhrases.map((phrase, idx) => (
              <button 
                key={idx}
                className="quick-phrase-chip"
                onClick={() => handleSelectQuickPhrase(phrase)}
              >
                <span>{phrase.hebrew}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveTranslatorModal;
