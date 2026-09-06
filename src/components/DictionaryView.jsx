import React, { useState, useMemo } from 'react';
import { Search, Volume2, BookOpen, Filter, X, Sparkles, HelpCircle } from 'lucide-react';
import { speakTagalog } from '../utils/audioTTS';
import './DictionaryView.css';

export const DictionaryView = ({ courseData, onSelectLesson, onActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handlePlayAudio = (text, e) => {
    if (e) e.stopPropagation();
    speakTagalog(text);
    if (onActivity) onActivity();
  };

  // 1. איסוף כל מילות אוצר המילים מכל היחידות והשיעורים במערכת
  const allDictionaryItems = useMemo(() => {
    const dictionaryList = [];
    
    courseData.units.forEach(unit => {
      unit.lessons.forEach(lesson => {
        lesson.vocabulary.forEach(vocab => {
          dictionaryList.push({
            ...vocab,
            lessonTitle: lesson.title,
            lessonRef: lesson,
            unitTitle: unit.titleHebrew
          });
        });
      });
    });

    return dictionaryList;
  }, [courseData]);

  // 2. איסוף כל הקטגוריות הקיימות
  const categories = useMemo(() => {
    const cats = new Set(allDictionaryItems.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [allDictionaryItems]);

  // 3. סינון מהיר בזמן אמת לפי טגלוג, עברית, תעתיק פונטי או קטגוריה
  const filteredResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    
    return allDictionaryItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      if (!matchesCategory) return false;
      if (!query) return true;

      const matchTagalog = item.tagalog.toLowerCase().includes(query);
      const matchHebrew = item.hebrew.toLowerCase().includes(query);
      const matchPhonetic = item.phoneticHebrew ? item.phoneticHebrew.toLowerCase().includes(query) : false;

      return matchTagalog || matchHebrew || matchPhonetic;
    });
  }, [allDictionaryItems, searchTerm, selectedCategory]);

  return (
    <div className="dictionary-wrapper animate-fade-in" dir="rtl">
      <div className="dictionary-header">
        <span className="hero-emoji">📖</span>
        <h2>מילון אינטראקטיבי וסרגל חיפוש מהיר</h2>
        <p>חפשו מילים בטגלוג, בעברית או לפי תעתיק פונטי, והקשיבו להגייה המדויקת!</p>
      </div>

      {/* סרגל חיפוש ראשי */}
      <div className="search-bar-container glass-panel">
        <Search className="search-icon" size={22} />
        <input 
          type="text"
          className="search-input"
          placeholder="חפש מילה בטגלוג, עברית או תעתיק (למשל: Salamat, תודה, סלמאת)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* שבבי קטגוריות (Filter Chips) */}
      <div className="categories-chips">
        <span className="chip-label"><Filter size={14} /> סינון קטגוריה:</span>
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`chip-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat === 'all' ? 'הכל ⭐' : cat}
          </button>
        ))}
      </div>

      {/* מונה תוצאות */}
      <div className="results-count">
        נמצאו <strong>{filteredResults.length}</strong> מילים במילון
      </div>

      {/* גריד המילים במילון */}
      {filteredResults.length > 0 ? (
        <div className="dictionary-grid">
          {filteredResults.map(item => (
            <div key={item.id} className="dict-card glass-panel" onClick={(e) => handlePlayAudio(item.tagalog, e)}>
              <div className="dict-card-top">
                <span className="dict-badge">{item.category}</span>
                <span className="dict-lesson-tag">{item.lessonTitle}</span>
              </div>

              <div className="dict-main">
                <h3 className="dict-tagalog">{item.tagalog}</h3>
                <div className="dict-phonetic">🗣️ {item.phoneticHebrew}</div>
                <div className="dict-hebrew">"{item.hebrew}"</div>
              </div>

              {item.exampleSentence && (
                <div className="dict-example-box">
                  <div className="dict-ex-tagalog">{item.exampleSentence.tagalog}</div>
                  <div className="dict-ex-hebrew">"{item.exampleSentence.hebrew}"</div>
                </div>
              )}

              <div className="dict-card-footer">
                <button 
                  className="dict-audio-btn"
                  onClick={(e) => handlePlayAudio(item.tagalog, e)}
                  title="השמע הגייה"
                >
                  <Volume2 size={18} /> השמע הגייה
                </button>

                <button 
                  className="dict-practice-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectLesson(item.lessonRef);
                  }}
                >
                  לשיעור בכרטיסיות ←
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results-card glass-panel">
          <HelpCircle size={48} className="no-res-icon" />
          <h3>לא נמצאו מילים התואמות את החיפוש "{searchTerm}"</h3>
          <p>נסו לחפש מילה אחרת בטגלוג או בעברית, או נקו את סרגל החיפוש.</p>
          <button className="reset-btn" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
            איפוס חיפוש
          </button>
        </div>
      )}
    </div>
  );
};
