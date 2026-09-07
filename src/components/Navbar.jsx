import React from 'react';
import { Moon, Sun, Smartphone, Monitor, Globe } from 'lucide-react';
import appLogo from '../assets/app-logo.png';
import './Navbar.css';

export const Navbar = ({ 
  userStats, 
  currentTab, 
  setCurrentTab, 
  theme, 
  setTheme, 
  isSimulated,
  onToggleSimulator,
  userProfile,
  onOpenProfile,
  activeCloudUser,
  onOpenTranslator
}) => {
  const avatar = activeCloudUser?.avatar || userProfile?.avatar || '🐋';
  const userName = activeCloudUser?.displayName || activeCloudUser?.username || userProfile?.name || 'אורח';

  return (
    <header className="navbar-container glass-panel luxury-header">
      {/* Brand Title Section */}
      <div className="navbar-brand" onClick={() => setCurrentTab('syllabus')}>
        <div className="brand-logo-wrapper">
          <img src={appLogo} alt="TagalogHebrew Whale Shark Logo" className="brand-logo-img" />
          <span className="brand-shine"></span>
        </div>
        <div className="brand-titles">
          <div className="brand-title-row">
            <h1 className="brand-name" dir="ltr">
              Taga<span className="brand-highlight">lingo</span>
            </h1>
          </div>
          <span className="brand-sub">למידת טגלוג אינטראקטיבית בעברית</span>
        </div>
      </div>

      {/* Clean Right Actions with Prominent User Greeting & Translator Button */}
      <div className="navbar-actions">
        {/* Live Free Text Translator Button */}
        <button 
          className="live-translator-nav-btn"
          onClick={onOpenTranslator}
          title="מתרגם חופשי בלייב (עברית ⇄ טגלוג)"
        >
          <Globe size={16} />
          <span>תרגום חופשי</span>
        </button>

        {/* User Profile & Greeting Button */}
        <button 
          className="user-profile-nav-btn"
          onClick={onOpenProfile}
          title="פתח פרופיל משתמש והתקדמות"
        >
          <span className="user-nav-avatar">{avatar}</span>
          <div className="user-nav-info">
            <span className="user-nav-greeting">שלום, <strong className="user-nav-name">{userName}</strong>!</span>
            <span className="user-nav-xp">⭐ {userStats.xp} XP</span>
          </div>
        </button>

        {/* Mobile / Desktop Simulator Toggle */}
        <button 
          className="simulator-toggle-nav-btn"
          onClick={onToggleSimulator}
          title={isSimulated ? "עבור לתצוגת מחשב מלאה" : "עבור למצב תצוגת מובייל (iPhone 16 Pro)"}
        >
          {isSimulated ? <Monitor size={16} /> : <Smartphone size={16} />}
          <span>{isSimulated ? 'תצוגת מחשב' : 'תצוגת מובייל'}</span>
        </button>

        {/* Theme Toggle Button */}
        <button 
          className="icon-btn theme-toggle-btn" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'מצב בהיר' : 'מצב כהה'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
