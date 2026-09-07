import React, { useState, useEffect } from 'react';
import { Search, Volume2, Copy, Check, X, Globe, Sparkles, ArrowLeftRight, Loader2, Send } from 'lucide-react';
import { speakTagalog } from '../utils/audioTTS';
import { translateFreeTextAsync, quickTravelPhrases } from '../utils/translatorEngine';
import './LiveTranslatorModal.css';

export function LiveTranslatorModal({ isOpen, onClose }) {
  const [inputText, setInputText] = useState('');
  const [translationResult, setTranslationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const executeTranslation = async (textToTranslate) => {
    const trimmed = (textToTranslate || '').trim();
    if (!trimmed) {
      setTranslationResult(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await translateFreeTextAsync(trimmed);
      setTranslationResult(res);
    } catch (e) {
      console.log('Translation error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      setTranslationResult(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      executeTranslation(trimmed);
    }, 400); // 400ms debounce for live typing

    return () => clearTimeout(timer);
  }, [inputText]);

  if (!isOpen) return null;

  const handleManualSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputText.trim()) {
      executeTranslation(inputText.trim());
    }
  };

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
    executeTranslation(phrase.hebrew);
  };

  return (
    <div className="translator-modal-backdrop animate-fade-in" onClick={onClose} dir="rtl">
      <div className="translator-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="translator-header">
          <div className="translator-header-title">
            <div className="translator-globe-icon"><Globe size={22} /></div>
            <div>
              <h3>תרגום חופשי לשרת פיליפינית 🇵🇭</h3>
              <span className="translator-sub-title">תרגום בזמן אמת (עברית ⇄ Tagalog / פיליפינית)</span>
            </div>
          </div>
          <button className="translator-close-btn" onClick={onClose} title="סגור">
            <X size={20} />
          </button>
        </div>

        {/* Input Bar with Submit Button */}
        <form className="translator-input-group" onSubmit={handleManualSubmit}>
          <textarea
            className="translator-textarea"
            placeholder="מה תרצה לתרגם?"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleManualSubmit(e);
              }
            }}
            rows={2}
            autoFocus
          />
          <div className="input-action-buttons">
            {inputText && (
              <button 
                type="button" 
                className="translator-clear-btn" 
                onClick={() => { setInputText(''); setTranslationResult(null); }}
                title="נקה טקסט"
              >
                <X size={18} />
              </button>
            )}
            <button 
              type="submit" 
              className="translator-submit-btn"
              disabled={!inputText.trim() || loading}
              title="תרגם פיליפינית עכשיו"
            >
              <Send size={15} />
              <span>תרגם</span>
            </button>
          </div>
        </form>

        {/* Translation Results Display */}
        {loading ? (
          <div className="translator-loading-state">
            <Loader2 size={26} className="animate-spin text-emerald-400" />
            <span>מתרגם לפיליפינית (Tagalog) בזמן אמת... ✨</span>
          </div>
        ) : translationResult ? (
          <div className="translation-result-card animate-fade-in">
            <div className="result-header">
              <span className="result-badge">{translationResult.category}</span>
              <span className="result-lang-indicator">
                <ArrowLeftRight size={13} /> {translationResult.detectedLang === 'hebrew' ? 'מעברית לפיליפינית (Tagalog)' : 'מפיליפינית לעברית'}
              </span>
            </div>

            {/* Tagalog / Filipino Output Box */}
            <div className="result-output-box tagalog-box">
              <div className="output-label">🇵🇭 פיליפינית (Tagalog)</div>
              <div className="output-main-row">
                <span className="output-text tagalog-text">{translationResult.tagalog}</span>
                <div className="output-actions">
                  <button 
                    className="action-btn audio-btn"
                    onClick={() => handlePlayAudio(translationResult.tagalog)}
                    title="השמע הגייה פיליפינית"
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
            <p>הקלידו מילה או משפט חופשי כדי לקבל תרגום מדויק לפיליפינית (Tagalog), תעתיק פונטי בעברית והשמעה קולית.</p>
          </div>
        )}

        {/* Quick Travel Phrase Chips */}
        <div className="quick-phrases-section">
          <span className="quick-phrases-label">⚡ ביטויים נפוצים בלחיצה אחת:</span>
          <div className="quick-phrases-chips">
            {quickTravelPhrases.map((phrase, idx) => (
              <button 
                key={idx}
                type="button"
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
