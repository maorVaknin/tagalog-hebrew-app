import React from 'react';
import { Moon, Sun, Smartphone, Monitor, User } from 'lucide-react';
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
  onOpenProfile
}) => {
  const avatar = userProfile?.avatar || '🌴';
  const userName = userProfile?.name || 'אורח';

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
            <h1 className="brand-name">
              Tagalog<span className="brand-highlight">Hebrew</span>
            </h1>
            <span className="brand-badge-pro">PRO</span>
          </div>
          <span className="brand-sub">למידת טגלוג אינטראקטיבית בעברית</span>
        </div>
      </div>

      {/* Clean Right Actions with User Profile Button */}
      <div className="navbar-actions">
        {/* User Profile Button */}
        <button 
          className="user-profile-nav-btn"
          onClick={onOpenProfile}
          title="פתח פרופיל משתמש והתקדמות"
        >
          <span className="user-nav-avatar">{avatar}</span>
          <div className="user-nav-info">
            <span className="user-nav-name">{userName}</span>
            <span className="user-nav-xp">{userStats.xp} XP</span>
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
