import React, { useState } from 'react';
import { Play, Sparkles, ShieldCheck, UserPlus, LogIn, User, Lock, LogOut, Award, Flame } from 'lucide-react';
import appLogo from '../assets/app-logo.png';
import './WelcomeSplash.css';

export function WelcomeSplash({ activeCloudUser, onEnterApp, onRegister, onLogin, onGuestContinue, onLogout }) {
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanUsername = username.trim();
    if (!cleanUsername || !password.trim()) {
      setErrorMessage('אנא הזן שם משתמש וסיסמה');
      return;
    }
    if (password.length < 3) {
      setErrorMessage('הסיסמה חייבת להכיל לפחות 3 תווים');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'register') {
        const res = await onRegister(cleanUsername, password.trim());
        if (!res.success) {
          setErrorMessage(res.error || 'שגיאה ביצירת החשבון');
        } else {
          onEnterApp();
        }
      } else {
        const res = await onLogin(cleanUsername, password.trim());
        if (!res.success) {
          setErrorMessage(res.error || 'שם משתמש או סיסמה שגויים');
        } else {
          onEnterApp();
        }
      }
    } catch (err) {
      setErrorMessage('אירעה שגיאה. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

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
            <img src={appLogo} alt="TagalogHebrew Whale Shark Logo" className="splash-logo-img" />
            <span className="splash-ring"></span>
          </div>
          <div className="splash-brand-titles">
            <h1 className="splash-main-title" dir="ltr">
              Taga<span className="splash-highlight">lingo</span>
            </h1>
            <span className="splash-sub-title">האפליקציה האינטראקטיבית ללימוד טגלוג בעברית</span>
          </div>
        </div>

        {/* Dynamic State: Returning User vs New User Onboarding */}
        {activeCloudUser ? (
          /* Returning User Card */
          <div className="splash-returning-user-card animate-fade-in">
            <div className="welcome-user-avatar">{activeCloudUser.avatar || '🐋'}</div>
            <div className="welcome-user-info">
              <span className="welcome-user-greeting">ברוך השב,</span>
              <h2 className="welcome-user-name">{activeCloudUser.displayName || activeCloudUser.username || 'לומד טגלוג'}</h2>
              <div className="welcome-user-stats">
                <span className="user-stat-chip xp-chip"><Award size={14} /> {activeCloudUser.xp || 100} XP</span>
                <span className="user-stat-chip streak-chip"><Flame size={14} /> {activeCloudUser.streak || 1} ימי רצף</span>
              </div>
            </div>

            <button className="splash-enter-btn" onClick={onEnterApp}>
              <div className="btn-glow-effect"></div>
              <Play size={22} className="btn-play-icon" />
              <span>המשך בלמידה 🚀</span>
            </button>

            {onLogout && (
              <button className="splash-switch-account-btn" onClick={onLogout}>
                <LogOut size={14} />
                <span>להתחברות בחשבון אחר</span>
              </button>
            )}
          </div>
        ) : (
          /* First-Time User Onboarding Form */
          <div className="splash-onboarding-card animate-fade-in">
            {/* Mode Switch Tabs */}
            <div className="splash-auth-tabs">
              <button 
                type="button"
                className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => { setAuthMode('register'); setErrorMessage(''); }}
              >
                <UserPlus size={16} />
                <span>הרשמה חדשה</span>
              </button>
              <button 
                type="button"
                className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => { setAuthMode('login'); setErrorMessage(''); }}
              >
                <LogIn size={16} />
                <span>התחברות</span>
              </button>
            </div>

            <form className="splash-auth-form" onSubmit={handleSubmit}>
              <div className="splash-input-group">
                <User size={18} className="input-icon" />
                <input 
                  type="text" 
                  placeholder="שם משתמש / כינוי (למשל: maor)" 
                  value={username} 
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="splash-input-group">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  placeholder="סיסמה" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {errorMessage && (
                <div className="splash-auth-error animate-fade-in">
                  ⚠️ {errorMessage}
                </div>
              )}

              <button type="submit" className="splash-enter-btn" disabled={loading}>
                <div className="btn-glow-effect"></div>
                {loading ? (
                  <span>מתחבר...</span>
                ) : (
                  <>
                    <Play size={20} className="btn-play-icon" />
                    <span>{authMode === 'register' ? 'הרשמה וכניסה למערכת 🚀' : 'התחברות וכניסה 🔑'}</span>
                  </>
                )}
              </button>
            </form>

            <button 
              type="button" 
              className="splash-guest-btn" 
              onClick={onGuestContinue}
            >
              <span>המשך כאורח ללא הרשמה 👤</span>
            </button>
          </div>
        )}

        <span className="splash-footer-note">
          <ShieldCheck size={14} /> הנתונים שלך נשמרים מאובטחים ללא צורך באימייל
        </span>
      </div>
    </div>
  );
}

export default WelcomeSplash;
