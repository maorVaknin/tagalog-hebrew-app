import React, { useState, useMemo } from 'react';
import { Volume2, Hash, ShoppingBag, Info, Search, X, Sparkles, VolumeX, Play } from 'lucide-react';
import { speakTagalog } from '../utils/audioTTS';
import { convertAnyNumber } from '../utils/numberConverter';
import './NumbersView.css';

export const NumbersView = ({ onActivity }) => {
  const [activeCategory, setActiveCategory] = useState('native'); // 'native', 'filipino_daily', 'money'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModalData, setSelectedModalData] = useState(null); // חלון תצוגה צף פשוט וקומפקטי
  const [modalMode, setModalMode] = useState('native'); // 'native' או 'daily' בחלון

  const handlePlayAudio = (text) => {
    speakTagalog(text);
    if (onActivity) onActivity();
  };

  // 1. מספרים בטגלוג מקורית (Native Tagalog Numbers)
  const nativeTagalogNumbers = [
    { num: 1, tagalog: "Isa", phonetic: "אִיסָא", hebrew: "אחת" },
    { num: 2, tagalog: "Dalawa", phonetic: "דָאלָאוָוא", hebrew: "שתיים" },
    { num: 3, tagalog: "Tatlo", phonetic: "תָּאטְלוֹ", hebrew: "שלוש" },
    { num: 4, tagalog: "Apat", phonetic: "אָאָפָּאת", hebrew: "ארבע" },
    { num: 5, tagalog: "Lima", phonetic: "לִימָא", hebrew: "חמש" },
    { num: 6, tagalog: "Anim", phonetic: "אָאנִים", hebrew: "שש" },
    { num: 7, tagalog: "Pito", phonetic: "פִּיתוֹ", hebrew: "שבע" },
    { num: 8, tagalog: "Walo", phonetic: "וָואלוֹ", hebrew: "שמונה" },
    { num: 9, tagalog: "Siyam", phonetic: "שִׁיאָאם", hebrew: "תשע" },
    { num: 10, tagalog: "Sampu", phonetic: "סָאמְפּוּ", hebrew: "עשר" },
    { num: 11, tagalog: "Labing-isa", phonetic: "לָאבִּילִימָא", hebrew: "אחת עשרה" },
    { num: 12, tagalog: "Labindalawa", phonetic: "לָאבִּין-דָאלָאוָוא", hebrew: "שתים עשרה" },
    { num: 15, tagalog: "Labing-lima", phonetic: "לָאבִּילִימָא", hebrew: "חמש עשרה" },
    { num: 20, tagalog: "Dalawampu", phonetic: "דָאלָאוָואמְפּוּ", hebrew: "עשרים" },
    { num: 25, tagalog: "Dalawampu't lima", phonetic: "דָאלָאוָואמְפּוּת לִימָא", hebrew: "עשרים וחמש" },
    { num: 50, tagalog: "Limangpu", phonetic: "לִימָאנְג-פּוּ", hebrew: "חמישים" },
    { num: 100, tagalog: "Isang daan", phonetic: "אִיסָאנְג דָאאַאן", hebrew: "מאה" },
    { num: 250, tagalog: "Dalawang daan at limangpu", phonetic: "דָאלָאוָואנְג דָאאַאן אָאת לִימָאנְג-פּוּ", hebrew: "מאתיים וחמישים" },
    { num: 500, tagalog: "Limang daan", phonetic: "לִימָאנְג דָאאַאן", hebrew: "חמש מאות" },
    { num: 1000, tagalog: "Isang libo", phonetic: "אִיסָאנְג לִיבּוֹ", hebrew: "אלף" }
  ];

  // 2. המספרים היומיומיים בפיליפינים (Filipino Everyday Numbers)
  const filipinoDailyNumbers = [
    { num: 1, tagalog: "Uno", phonetic: "אוּנוֹ", hebrew: "אחת" },
    { num: 2, tagalog: "Dos", phonetic: "דוֹס", hebrew: "שתיים" },
    { num: 3, tagalog: "Tres", phonetic: "תְּרֶס", hebrew: "שלוש" },
    { num: 4, tagalog: "Kuwatro", phonetic: "כּוּואָתְרוֹ", hebrew: "ארבע" },
    { num: 5, tagalog: "Singko", phonetic: "סִין-כּוֹ", hebrew: "חמש" },
    { num: 6, tagalog: "Sais", phonetic: "סָאאִיס", hebrew: "שש" },
    { num: 7, tagalog: "Siyete", phonetic: "שִׁייֶתֶה", hebrew: "שבע" },
    { num: 8, tagalog: "Otsyo", phonetic: "אוֹצְ'יוֹ", hebrew: "שמונה" },
    { num: 9, tagalog: "Niyebe", phonetic: "נִייֶבֶּה", hebrew: "תשע" },
    { num: 10, tagalog: "Diyes", phonetic: "דִייֶס", hebrew: "עשר" },
    { num: 15, tagalog: "Kinse", phonetic: "כִּין-סֶה", hebrew: "חמש עשרה" },
    { num: 20, tagalog: "Bente", phonetic: "בֶּנְתֶה", hebrew: "עשרים" },
    { num: 25, tagalog: "Bente singko", phonetic: "בֶּנְתֶה סִין-כּוֹ", hebrew: "עשרים וחמש" },
    { num: 50, tagalog: "Singkuwenta", phonetic: "סִין-כּוּוֶנְתָּה", hebrew: "חמישים" },
    { num: 100, tagalog: "Ciento", phonetic: "סִייֶנְתוֹ", hebrew: "מאה" },
    { num: 500, tagalog: "Quinientos", phonetic: "כִּינִיֶינְתוֹס", hebrew: "חמש מאות" },
    { num: 1000, tagalog: "Mil", phonetic: "מִיל", hebrew: "אלף" }
  ];

  // 3. מחירי קניות ופסו בשילוב פיליפיני יומיומי
  const travelPrices = [
    { price: 10, tagalog: "Diyes piso", phonetic: "דִייֶס פִּיסוֹ", hebrew: "10 פסו (נסיעה קצרה)" },
    { price: 20, tagalog: "Bente piso", phonetic: "בֶּנְתֶה פִּיסוֹ", hebrew: "20 פסו (ג'יפני)" },
    { price: 50, tagalog: "Singkuwenta piso", phonetic: "סִין-כּוּוֶנְתָּה פִּיסוֹ", hebrew: "50 פסו (שיפוד / שתייה)" },
    { price: 100, tagalog: "Isang daang piso", phonetic: "אִיסָאנְג דָאאַנְג פִּיסוֹ", hebrew: "100 פסו (ארוחת צהריים)" },
    { price: 250, tagalog: "Dalawang daan at limangpung piso", phonetic: "דָאלָאוָואנְג דָאאַאן אָאת לִימָאנְג-פּוּנְג פִּיסוֹ", hebrew: "250 פסו (נסיעת טריקסי)" },
    { price: 500, tagalog: "Limang daang piso", phonetic: "לִימָאנְג דָאאַנְג פִּיסוֹ", hebrew: "500 פסו (השכרת אופנוע)" },
    { price: 1000, tagalog: "Isang libong piso", phonetic: "אִיסָאנְג לִיבּוֹנְג פִּיסוֹ", hebrew: "1000 פסו (סיור בסירה)" }
  ];

  // המרה אוטומטית חופשית
  const customConvertedNumber = useMemo(() => {
    const cleanNum = searchQuery.trim().replace(/,/g, '');
    if (/^\d+$/.test(cleanNum)) {
      return convertAnyNumber(cleanNum);
    }
    return null;
  }, [searchQuery]);

  // סינון דינמי לפי ספרות
  const filteredSearchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    const matchedNative = nativeTagalogNumbers.filter(
      item => item.num.toString().includes(q) || item.tagalog.toLowerCase().includes(q) || item.hebrew.includes(q)
    );

    const matchedDaily = filipinoDailyNumbers.filter(
      item => item.num.toString().includes(q) || item.tagalog.toLowerCase().includes(q) || item.hebrew.includes(q)
    );

    const matchedPrices = travelPrices.filter(
      item => item.price.toString().includes(q) || item.tagalog.toLowerCase().includes(q) || item.hebrew.includes(q)
    );

    return {
      native: matchedNative,
      daily: matchedDaily,
      prices: matchedPrices,
      totalCount: matchedNative.length + matchedDaily.length + matchedPrices.length
    };
  }, [searchQuery]);

  const openNumberModal = (numValue) => {
    const data = convertAnyNumber(numValue);
    if (data) {
      setSelectedModalData(data);
      setModalMode('native');
      handlePlayAudio(data.native.tagalog); // השמעה אוטומטית בעת פתיחה
    }
  };

  const activeModalItem = selectedModalData ? (modalMode === 'native' ? selectedModalData.native : selectedModalData.daily) : null;

  return (
    <div className="numbers-wrapper animate-fade-in" dir="rtl">
      <div className="numbers-header">
        <span className="hero-emoji">🔢</span>
        <h2>מחולל מספרים ומחירי פסו בטגלוג</h2>
        <p>חפש או הקלד <strong>כל מספר שתבחר</strong> לקבלת כתיבה, תעתיק עברי והשמעה קולית בלחיצה!</p>
      </div>

      {/* סרגל הקלדת/חיפוש מספרים חופשי */}
      <div className="clean-search-bar glass-panel">
        <Search className="search-bar-icon" size={20} />
        <input
          type="text"
          className="clean-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="הקלד כל מספר חופשי (למשל: 7, 25, 145, 1500)..."
        />
        {searchQuery && (
          <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* באנר קליל ופשוט למספר מוקלד */}
      {customConvertedNumber && (
        <div className="simple-custom-banner glass-panel animate-scale-up" onClick={() => openNumberModal(customConvertedNumber.num)}>
          <div className="banner-num-badge">#{customConvertedNumber.formattedNum}</div>
          <div className="banner-info">
            <span className="banner-tagalog">{customConvertedNumber.native.tagalog}</span>
            <span className="banner-phonetic">🗣️ {customConvertedNumber.native.phonetic}</span>
          </div>
          <button className="banner-listen-btn">
            <Volume2 size={20} /> לחץ להשמעה בחלון
          </button>
        </div>
      )}

      {/* הסבר בלשני קצר (מוצג כשהחיפוש ריק) */}
      {!searchQuery && (
        <div className="info-box-note glass-panel">
          <Info size={20} className="info-icon" />
          <div>
            <strong>💡 איך פיליפינים סופרים ביום-יום?</strong>
            <p>
              עבור עצמים ואנשים סופרים בטגלוג מקורית (<em>Isa, Dalawa...</em>).
              במחירים ושעות משתמשים במספרים היומיומיים (<em>Singko, Diyes, Bente...</em>).
            </p>
          </div>
        </div>
      )}

      {/* 3 הלשוניות המקוריות כברירת מחדל */}
      {!searchQuery && (
        <div className="numbers-tabs glass-panel">
          <button 
            className={`num-tab ${activeCategory === 'native' ? 'active' : ''}`}
            onClick={() => setActiveCategory('native')}
          >
            <Hash size={16} /> מספרים בטגלוג מקורית (Isa...)
          </button>
          <button 
            className={`num-tab ${activeCategory === 'filipino_daily' ? 'active' : ''}`}
            onClick={() => setActiveCategory('filipino_daily')}
          >
            מספרים יומיומיים (Bente...)
          </button>
          <button 
            className={`num-tab ${activeCategory === 'money' ? 'active' : ''}`}
            onClick={() => setActiveCategory('money')}
          >
            <ShoppingBag size={16} /> מחירי פסו (PHP ₱)
          </button>
        </div>
      )}

      {/* תוצאות חיפוש ממוקדות */}
      {searchQuery && filteredSearchResults ? (
        <div className="search-results-section animate-fade-in">
          <div className="results-count-bar">
            תוצאות מאגר עבור הספרות "{searchQuery}"
          </div>

          <div className="numbers-grid">
            {filteredSearchResults.native.map((item, idx) => (
              <div key={`n-${idx}`} className="number-card glass-panel" onClick={() => openNumberModal(item.num)}>
                <div className="num-badge">{item.num}</div>
                <div className="num-info">
                  <span className="system-type-badge">טגלוג מקורית</span>
                  <h3 className="num-tagalog">{item.tagalog}</h3>
                  <div className="num-phonetic">🗣️ {item.phonetic}</div>
                </div>
                <button className="num-audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(item.tagalog); }}>
                  <Volume2 size={20} />
                </button>
              </div>
            ))}

            {filteredSearchResults.daily.map((item, idx) => (
              <div key={`d-${idx}`} className="number-card glass-panel" onClick={() => openNumberModal(item.num)}>
                <div className="num-badge daily-badge">{item.num}</div>
                <div className="num-info">
                  <span className="system-type-badge daily">יומיומי</span>
                  <h3 className="num-tagalog">{item.tagalog}</h3>
                  <div className="num-phonetic">🗣️ {item.phonetic}</div>
                </div>
                <button className="num-audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(item.tagalog); }}>
                  <Volume2 size={20} />
                </button>
              </div>
            ))}

            {filteredSearchResults.prices.map((item, idx) => (
              <div key={`p-${idx}`} className="price-card glass-panel" onClick={() => openNumberModal(item.price)}>
                <div className="price-amount">₱{item.price}</div>
                <div className="price-info">
                  <h3 className="price-tagalog">{item.tagalog}</h3>
                  <div className="price-phonetic">🗣️ {item.phonetic}</div>
                </div>
                <button className="num-audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(item.tagalog); }}>
                  <Volume2 size={22} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* תצוגת כרטיסיות המספרים המקוריות */
        activeCategory !== 'money' ? (
          <div className="numbers-grid">
            {(activeCategory === 'native' ? nativeTagalogNumbers : filipinoDailyNumbers).map((item, idx) => (
              <div key={idx} className="number-card glass-panel" onClick={() => openNumberModal(item.num)}>
                <div className="num-badge">{item.num}</div>
                
                <div className="num-info">
                  <h3 className="num-tagalog">{item.tagalog}</h3>
                  <div className="num-phonetic">🗣️ {item.phonetic}</div>
                  <div className="num-hebrew">"{item.hebrew}"</div>
                </div>

                <button className="num-audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(item.tagalog); }}>
                  <Volume2 size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="prices-grid">
            {travelPrices.map((item, idx) => (
              <div key={idx} className="price-card glass-panel" onClick={() => openNumberModal(item.price)}>
                <div className="price-amount">₱{item.price}</div>
                <div className="price-info">
                  <h3 className="price-tagalog">{item.tagalog}</h3>
                  <div className="price-phonetic">🗣️ {item.phonetic}</div>
                  <div className="price-hebrew">💡 {item.hebrew}</div>
                </div>
                <button className="num-audio-btn" onClick={(e) => { e.stopPropagation(); handlePlayAudio(item.tagalog); }}>
                  <Volume2 size={22} /> השמע
                </button>
              </div>
            ))}
          </div>
        )
      )}

      {/* חלון צף קומפקטי, פשוט וידידותי ביותר למשתמש */}
      {selectedModalData && activeModalItem && (
        <div className="compact-modal-backdrop animate-fade-in" onClick={() => setSelectedModalData(null)}>
          <div className="compact-modal-card glass-panel animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <button className="compact-close-btn" onClick={() => setSelectedModalData(null)}>
              <X size={20} />
            </button>

            <div className="compact-num-badge">#{selectedModalData.formattedNum}</div>

            {/* מתג קטן למעבר בין טגלוג מקורית ליומיומית */}
            <div className="compact-mode-switcher">
              <button 
                className={`compact-mode-btn ${modalMode === 'native' ? 'active' : ''}`}
                onClick={() => { setModalMode('native'); handlePlayAudio(selectedModalData.native.tagalog); }}
              >
                טגלוג מקורית
              </button>
              <button 
                className={`compact-mode-btn ${modalMode === 'daily' ? 'active' : ''}`}
                onClick={() => { setModalMode('daily'); handlePlayAudio(selectedModalData.daily.tagalog); }}
              >
                פיליפינית יומיומית
              </button>
            </div>

            <div className="compact-content">
              <h2 className="compact-tagalog">{activeModalItem.tagalog}</h2>
              <div className="compact-phonetic">🗣️ {activeModalItem.phonetic}</div>
              <div className="compact-hebrew">💡 {activeModalItem.hebrew}</div>
            </div>

            <button 
              className="compact-play-audio-btn"
              onClick={() => handlePlayAudio(activeModalItem.tagalog)}
            >
              <Volume2 size={24} /> 🔊 לחץ להשמעה בקול
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumbersView;
