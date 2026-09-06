import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X, Smartphone, Check } from 'lucide-react';
import './IOSInstallPrompt.css';

export const IOSInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // זיהוי מכשירי Apple iOS (iPhone/iPad/iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // בדיקה אם האפליקציה כבר מורצת כ-Standalone באייפון
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (iosDevice && !isStandalone) {
      setIsIOS(true);
      // בדיקה אם המשתמש כבר סגר את ההודעה בעבר
      const dismissed = localStorage.getItem('th_ios_prompt_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('th_ios_prompt_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="ios-install-banner glass-panel animate-fade-in" dir="rtl">
      <button className="close-prompt-btn" onClick={handleDismiss}>
        <X size={18} />
      </button>

      <div className="prompt-content">
        <div className="prompt-header">
          <span className="app-icon-badge">🇵🇭</span>
          <div>
            <h4>התקנת האפליקציה באייפון!📱</h4>
            <p>הוסיפו את TagalogHebrew למסך הבית לגישה מהירה ועבודה אופליין.</p>
          </div>
        </div>

        <div className="ios-steps-list">
          <div className="step-item">
            <span className="step-num">1</span>
            <span>לחצו על כפתור השיתוף בתחתית דפדפן Safari:</span>
            <Share size={18} className="share-icon" />
          </div>
          <div className="step-item">
            <span className="step-num">2</span>
            <span>גללו מטה ובחרו <strong>"הוסף למסך הבית"</strong>:</span>
            <PlusSquare size={18} className="add-icon" />
          </div>
          <div className="step-item">
            <span className="step-num">3</span>
            <span>לחצו על <strong>"הוסף"</strong> בפינה העליונה!</span>
            <Check size={18} className="check-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
