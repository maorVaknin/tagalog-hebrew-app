import React from 'react';
import { Play, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import './WelcomeSplash.css';

export function WelcomeSplash({ onEnterApp }) {
  return (
    <div className="welcome-splash-wrapper animate-fade-in" dir="rtl">
      {/* Background Image Container */}
      <div className="splash-bg-image"></div>
      <div className="splash-overlay-gradient"></div>

      {/* Glass Content Card */}
      <div className="splash-glass-card">
        {/* Animated Brand Badge */}
        <div className="splash-brand-badge">
          <div className="splash-logo-container">
            <span className="splash-flag">🇵🇭</span>
            <span className="splash-palm">🌴</span>
            <span className="splash-ring"></span>
          </div>
          <div className="splash-brand-titles">
            <h1 className="splash-main-title">
              Tagalog<span className="splash-highlight">Hebrew</span>
              <span className="splash-pro-chip">PRO</span>
            </h1>
            <span className="splash-sub-title">האפליקציה האינטראקטיבית ללימוד טגלוג בעברית</span>
          </div>
        </div>

        {/* Feature Highlights Pills */}
        <div className="splash-features-row">
          <div className="splash-feat-pill">
            <span>🌴</span> 145 מילים ושיחות יום-יום
          </div>
          <div className="splash-feat-pill">
            <span>🎧</span> הקריית שמע טבעית
          </div>
          <div className="splash-feat-pill">
            <span>⭐</span> מסלול לימוד דואולינגו
          </div>
        </div>

        {/* Enter Button */}
        <button className="splash-enter-btn" onClick={onEnterApp}>
          <div className="btn-glow-effect"></div>
          <Play size={22} className="btn-play-icon" />
          <span>כניסה למערכת הלימוד 🌴</span>
        </button>

        <span className="splash-footer-note">
          <ShieldCheck size={14} /> לחץ על כניסה להתחלת הלמידה
        </span>
      </div>
    </div>
  );
}

export default WelcomeSplash;
