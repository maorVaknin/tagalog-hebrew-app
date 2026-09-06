import React, { useState } from 'react';
import { BookOpen, Zap, Volume2, ShieldCheck } from 'lucide-react';
import { speakTagalog } from '../utils/audioTTS';
import './GrammarGuideView.css';

export const GrammarGuideView = () => {
  const [selectedFocus, setSelectedFocus] = useState('actor');

  const handlePlayAudio = (text) => {
    speakTagalog(text);
  };

  const verbExamples = [
    {
      root: "Kain (לאכול)",
      actorTagalog: "Kumain ako ng mangga.",
      actorPhonetic: "כּוּמָאאִין אָקוֹ נְג מַאנְג-גָא.",
      actorHebrew: "אכלתי מנגו. (אני עומד במרכז המשפט)",
      objectTagalog: "Kinain ko ang mangga.",
      objectPhonetic: "כִּינָאאִין כּוֹ אָנְג מַאנְג-גָא.",
      objectHebrew: "המנגו נאכל על ידי. (המנגו הספציפי במרכז)"
    },
    {
      root: "Bili (לקנות)",
      actorTagalog: "Bumili ako ng damit.",
      actorPhonetic: "בּוּמִילִי אָקוֹ נְג דָאמִית.",
      actorHebrew: "קניתי בגד. (אני במרכז)",
      objectTagalog: "Binili ko ang damit.",
      objectPhonetic: "בִּינִילִי כּוֹ אָנְג דָאמִית.",
      objectHebrew: "קניתי את הבגד הזה. (הבגד במרכז)"
    },
    {
      root: "Sulat (לכתוב)",
      actorTagalog: "Sumulat ako ng liham.",
      actorPhonetic: "סוּמוּלָאת אָקוֹ נְג לִיהָאם.",
      actorHebrew: "כתבתי מכתב. (אני במרכז)",
      objectTagalog: "Sinulat ko ang liham.",
      objectPhonetic: "סִינוּלָאת כּוֹ אָנְג לִיהָאם.",
      objectHebrew: "המכתב הזה נכתב על ידי. (המכתב במרכז)"
    }
  ];

  return (
    <div className="grammar-guide-wrapper animate-fade-in">
      <div className="grammar-header">
        <span className="hero-emoji">🧭</span>
        <h2>מדריך הדקדוק הייחודי של טגלוג</h2>
        <p>הסברים פשוטים בעברית להבנת מערכת הפעלים, כינויי הגוף וכללי הנימוס בפיליפינים</p>
      </div>

      <section className="grammar-section glass-panel">
        <div className="section-title-box">
          <Zap className="sec-icon" size={24} />
          <div>
            <h3>1. מערכת הפעלים והטריגרים (Focus System)</h3>
            <p className="sec-sub">הלב של שפת הטגלוג - שינוי הפועל לפי מה שרוצים להדגיש!</p>
          </div>
        </div>

        <div className="focus-toggle-buttons">
          <button 
            className={`focus-tab ${selectedFocus === 'actor' ? 'active' : ''}`}
            onClick={() => setSelectedFocus('actor')}
          >
            🎯 Actor Focus (הדגשת מבצע הפעולה)
          </button>
          <button 
            className={`focus-tab ${selectedFocus === 'object' ? 'active' : ''}`}
            onClick={() => setSelectedFocus('object')}
          >
            📦 Object Focus (הדגשת החפץ/המטרה)
          </button>
        </div>

        <div className="focus-explanation-box">
          {selectedFocus === 'actor' ? (
            <div className="expl-card actor-card">
              <h4>מהו Actor Focus? (תבניות `-um-`, `mag-`)</h4>
              <p>
                משתמשים בדגש זה כשרוצים להדגיש <strong>מי ביצע את הפעולה</strong>. 
                הנושא במשפט הוא האדם (Ako / Ikaw / Siya) והחפץ מקבל את מילת היחס <code>ng</code>.
              </p>
              <div className="formula-badge">נושא (Ako) + פועל (-um-) + ng + חפץ</div>
            </div>
          ) : (
            <div className="expl-card object-card">
              <h4>מהו Object Focus? (תבניות `-in`, `i-`)</h4>
              <p>
                משתמשים בדגש זה כשרוצים להדגיש <strong>חפץ ספציפי</strong> עליו נעשתה הפעולה.
                בפיליפינים, זוהי הדרך הטבעית והנפוצה ביותר לדבר כשמתייחסים לעצם מוגדר!
              </p>
              <div className="formula-badge">פועל (-in) + ko/mo + ang + חפץ ספציפי</div>
            </div>
          )}
        </div>

        <div className="examples-table-wrapper">
          <h4 className="table-heading">השוואת משפטים בפועל:</h4>
          <div className="examples-table">
            {verbExamples.map((ex, idx) => (
              <div key={idx} className="table-row-card">
                <div className="row-root">{ex.root}</div>
                
                <div className="row-content">
                  {selectedFocus === 'actor' ? (
                    <div className="focus-side actor-side">
                      <div className="side-tagalog">{ex.actorTagalog}</div>
                      <div className="side-phonetic">🗣️ {ex.actorPhonetic}</div>
                      <div className="side-hebrew">"{ex.actorHebrew}"</div>
                      <button className="row-audio-btn" onClick={() => handlePlayAudio(ex.actorTagalog)}>
                        <Volume2 size={16} /> השמע
                      </button>
                    </div>
                  ) : (
                    <div className="focus-side object-side">
                      <div className="side-tagalog">{ex.objectTagalog}</div>
                      <div className="side-phonetic">🗣️ {ex.objectPhonetic}</div>
                      <div className="side-hebrew">"{ex.objectHebrew}"</div>
                      <button className="row-audio-btn" onClick={() => handlePlayAudio(ex.objectTagalog)}>
                        <Volume2 size={16} /> השמע
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grammar-section glass-panel">
        <div className="section-title-box">
          <BookOpen className="sec-icon" size={24} />
          <div>
            <h3>2. כינויי גוף (Pronouns Matrix)</h3>
            <p className="sec-sub">שימו לב: אין הבדל בין זכר לנקבה בטגלוג!</p>
          </div>
        </div>

        <div className="pronouns-grid">
          <div className="p-card">
            <span className="p-tagalog">Ako</span>
            <span className="p-phonetic">אָקוֹ</span>
            <span className="p-hebrew">אני</span>
          </div>
          <div className="p-card">
            <span className="p-tagalog">Ikaw / Ka</span>
            <span className="p-phonetic">אִיכָּאוָוא / כָּה</span>
            <span className="p-hebrew">אתה / את</span>
          </div>
          <div className="p-card highlight">
            <span className="p-tagalog">Siya</span>
            <span className="p-phonetic">שִׁיָה</span>
            <span className="p-hebrew">הוא / היא (שניהם!)</span>
          </div>
          <div className="p-card">
            <span className="p-tagalog">Kami</span>
            <span className="p-phonetic">כָּאמִי</span>
            <span className="p-hebrew">אנחנו (בלעדייך)</span>
          </div>
          <div className="p-card">
            <span className="p-tagalog">Tayo</span>
            <span className="p-phonetic">תָּאיָוֹ</span>
            <span className="p-hebrew">אנחנו (כולנו יחד)</span>
          </div>
          <div className="p-card">
            <span className="p-tagalog">Sila</span>
            <span className="p-phonetic">סִילָא</span>
            <span className="p-hebrew">הם / הן</span>
          </div>
        </div>
      </section>

      <section className="grammar-section glass-panel">
        <div className="section-title-box">
          <ShieldCheck className="sec-icon" size={24} />
          <div>
            <h3>3. כלל הברזל של הנימוס הפיליפיני (Po & Opo)</h3>
            <p className="sec-sub">איך להראות כבוד לכל אדם בפיליפינים</p>
          </div>
        </div>

        <div className="politeness-card">
          <p className="pol-text">
            בפיליפינים, כבוד למבוגרים, לזרים ולנותני שירות הוא ערך עליון. 
            בכל פעם שאתם פונים לנהג, מוכר בשוק או פקיד במלון, הוסיפו את המילה <strong>Po</strong> בסוף המשפט, 
            או השתמשו ב-<strong>Opo</strong> במקום Oo בשביל להגיד "כן".
          </p>
          
          <div className="pol-examples">
            <div className="pol-item">
              <span className="pol-t">Salamat po</span>
              <span className="pol-h">תודה רבה לך (מנומס)</span>
            </div>
            <div className="pol-item">
              <span className="pol-t">Opo, salamat</span>
              <span className="pol-h">כן (בכבוד), תודה</span>
            </div>
            <div className="pol-item">
              <span className="pol-t">Magkano po ito?</span>
              <span className="pol-h">כמה זה עולה בבקשה?</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
