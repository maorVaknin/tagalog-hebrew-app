import React, { useState, useMemo } from 'react';
import { Search, Volume2, BookOpen, Filter, X, LayoutGrid, List, Sparkles, HelpCircle } from 'lucide-react';
import { speakTagalog } from '../utils/audioTTS';
import { comprehensiveDictionaryData } from '../data/dictionaryData';
import './DictionaryView.css';

export const DictionaryView = ({ courseData, onSelectLesson, onActivity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const handlePlayAudio = (text, e) => {
    if (e) e.stopPropagation();
    speakTagalog(text);
    if (onActivity) onActivity();
  };

  // 1. איסוף ואיחוד כל אוצר המילים מכל היחידות + מסד הנתונים המורחב (ללא כפילויות)
  const allDictionaryItems = useMemo(() => {
    const map = new Map();

    // 1.1 מילות הקורס הראשיות
    if (courseData?.units) {
      courseData.units.forEach(unit => {
        unit.lessons.forEach(lesson => {
          lesson.vocabulary.forEach(vocab => {
            const key = vocab.tagalog.trim().toLowerCase();
            map.set(key, {
              ...vocab,
              lessonTitle: lesson.title,
              lessonRef: lesson,
              unitTitle: unit.titleHebrew
            });
          });
        });
      });
    }

    // 1.2 מסד נתוני המילון המורחב (תוספות והשלמות מלאות)
    comprehensiveDictionaryData.forEach(item => {
      const key = item.tagalog.trim().toLowerCase();
      if (!map.has(key)) {
        map.set(key, item);
      } else {
        // העשרת הנתונים הקיימים עם משפטי דוגמה ופונטיקה במידה וחסר
        const existing = map.get(key);
        map.set(key, {
          ...item,
          ...existing,
          phoneticHebrew: existing.phoneticHebrew || item.phoneticHebrew,
          exampleSentence: existing.exampleSentence || item.exampleSentence
        });
      }
    });

    return Array.from(map.values());
  }, [courseData]);

  // 2. איסוף כל הקטגוריות הקיימות עם ספירת מילים
  const categoryCounts = useMemo(() => {
    const counts = { all: allDictionaryItems.length };
    allDictionaryItems.forEach(item => {
      const cat = item.category || 'כללי';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [allDictionaryItems]);

  const categories = useMemo(() => {
    return Object.keys(categoryCounts);
  }, [categoryCounts]);

  // 3. סינון מהיר בזמן אמת לפי טגלוג, עברית, תעתיק פונטי או קטגוריה
  const filteredResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    
    return allDictionaryItems.filter(item => {
      const itemCat = item.category || 'כללי';
      const matchesCategory = selectedCategory === 'all' || itemCat === selectedCategory;
      
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
      {/* Header Banner */}
      <div className="dictionary-header-card glass-panel">
        <div className="dict-header-titles">
          <div className="dict-hero-badge">📖 מילון מקיף Tagalingo</div>
          <h2>מילון טגלוג-עברית אינטראקטיבי</h2>
          <p>חפשו מילים בטגלוג, עברית או תעתיק פונטי, והקשיבו להגייה המדויקת בלחיצה אחת!</p>
        </div>

        {/* Search Input Bar */}
        <div className="dict-search-container">
          <Search className="search-icon" size={20} />
          <input 
            type="text"
            className="dict-search-input"
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
      </div>

      {/* Toolbar: Category Chips & View Toggle */}
      <div className="dict-toolbar-strip">
        <div className="dict-categories-scroll">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`dict-chip-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span>{cat === 'all' ? 'הכל ⭐' : cat}</span>
              <span className="chip-count">{categoryCounts[cat]}</span>
            </button>
          ))}
        </div>

        {/* Cards / Table View Toggle */}
        <div className="dict-view-switcher">
          <button 
            className={`view-switch-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            title="תצוגת כרטיסיות מפורטות"
          >
            <LayoutGrid size={16} />
            <span>כרטיסיות</span>
          </button>
          <button 
            className={`view-switch-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="תצוגת טבלה מרוכזת"
          >
            <List size={16} />
            <span>טבלה</span>
          </button>
        </div>
      </div>

      {/* Results Stats Counter */}
      <div className="results-count-bar">
        <span>נמצאו <strong>{filteredResults.length}</strong> מילים במילון</span>
        {searchTerm && <span className="query-notice">תוצאות עבור "{searchTerm}"</span>}
      </div>

      {/* Content Rendering: Cards vs Table View */}
      {filteredResults.length > 0 ? (
        viewMode === 'cards' ? (
          /* Cards Grid View */
          <div className="dictionary-grid">
            {filteredResults.map(item => (
              <div 
                key={item.id || item.tagalog} 
                className="dict-card glass-panel" 
                onClick={(e) => handlePlayAudio(item.tagalog, e)}
              >
                <div className="dict-card-top">
                  <span className="dict-badge">{item.category || 'כללי'}</span>
                  {item.lessonTitle && <span className="dict-lesson-tag">{item.lessonTitle}</span>}
                </div>

                <div className="dict-main">
                  <div className="dict-word-row">
                    <h3 className="dict-tagalog">{item.tagalog}</h3>
                    <button 
                      className="dict-mini-audio-btn"
                      onClick={(e) => handlePlayAudio(item.tagalog, e)}
                      title="השמע הגייה"
                    >
                      <Volume2 size={20} />
                    </button>
                  </div>

                  <div className="dict-phonetic">🗣️ {item.phoneticHebrew}</div>
                  <div className="dict-hebrew">"{item.hebrew}"</div>
                </div>

                {item.exampleSentence && (
                  <div className="dict-example-box">
                    <div className="dict-ex-tagalog">{item.exampleSentence.tagalog}</div>
                    <div className="dict-ex-hebrew">"{item.exampleSentence.hebrew}"</div>
                  </div>
                )}

                {item.lessonRef && (
                  <div className="dict-card-footer">
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
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="dict-table-container glass-panel">
            <table className="dict-table">
              <thead>
                <tr>
                  <th>שמע</th>
                  <th>טגלוג (Tagalog)</th>
                  <th>תעתיק פונטי בעברית</th>
                  <th>תרגום לעברית</th>
                  <th>קטגוריה</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(item => (
                  <tr key={item.id || item.tagalog} onClick={(e) => handlePlayAudio(item.tagalog, e)}>
                    <td className="td-audio">
                      <button 
                        className="dict-table-audio-btn"
                        onClick={(e) => handlePlayAudio(item.tagalog, e)}
                        title="השמע"
                      >
                        <Volume2 size={16} />
                      </button>
                    </td>
                    <td className="td-tagalog">{item.tagalog}</td>
                    <td className="td-phonetic">{item.phoneticHebrew}</td>
                    <td className="td-hebrew">{item.hebrew}</td>
                    <td className="td-category">
                      <span className="table-cat-badge">{item.category || 'כללי'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Empty Results Fallback */
        <div className="no-results-card glass-panel">
          <HelpCircle size={48} className="no-res-icon" />
          <h3>לא נמצאו מילים התואמות את החיפוש "{searchTerm}"</h3>
          <p>נסו לחפש מילה אחרת בטגלוג, בעברית או בתעתיק, או אופסו את החיפוש.</p>
          <button className="reset-btn" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
            איפוס חיפוש
          </button>
        </div>
      )}
    </div>
  );
};

export default DictionaryView;
