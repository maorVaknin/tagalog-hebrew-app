import React, { useState } from 'react';
import { X, LogIn, UserPlus, ShieldCheck, Mail, Lock, User, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';
import { registerUser, loginUser, logoutUser } from '../utils/firebase';
import './AuthModal.css';

export function AuthModal({ isOpen, onClose, activeUser, onUserChange }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('אנא הזן כתובת אימייל וסיסמה');
      return;
    }

    setLoading(true);
    const res = await loginUser(email, password);
    setLoading(false);

    if (res.success) {
      setSuccess('התחברת בהצלחה! מסנכרן נתונים מהענן...');
      onUserChange(res.user);
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1200);
    } else {
      setError(res.error || 'התחברות נכשלה. בדוק את הפרטים ונסה שוב.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password || !displayName) {
      setError('אנא מלא את כל השדות (שם מלא, אימייל וסיסמה)');
      return;
    }

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setLoading(true);
    const res = await registerUser(email, password, displayName);
    setLoading(false);

    if (res.success) {
      setSuccess('החשבון נוצר בהצלחה! נתוני ה-XP וההתקדמות מסונכרנים ב-DB בענן.');
      onUserChange(res.user);
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);
    } else {
      setError(res.error || 'הרשמה נכשלה. נסה שוב.');
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    onUserChange(null);
    setSuccess('התנתקת בהצלחה!');
    setTimeout(() => {
      onClose();
      setSuccess('');
    }, 1000);
  };

  return (
    <div className="auth-modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="auth-modal-card glass-panel animate-scale-up" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {activeUser ? (
          /* תצוגת משתמש מחובר */
          <div className="auth-logged-in-view">
            <div className="auth-user-avatar">{activeUser.avatar || '🐋'}</div>
            <h2>שלום, {activeUser.displayName || activeUser.email}!</h2>
            <div className="auth-cloud-badge">
              <Cloud size={16} /> נתונים מסונכרנים ב-Firebase DB בענן
            </div>

            <div className="auth-stats-summary">
              <div className="auth-stat-box">
                <span className="auth-stat-val">{activeUser.xp || 10}</span>
                <span className="auth-stat-lbl">נקודות XP</span>
              </div>
              <div className="auth-stat-box">
                <span className="auth-stat-val">🔥 {activeUser.streak || 1}</span>
                <span className="auth-stat-lbl">ימי רצף</span>
              </div>
            </div>

            <button className="auth-logout-btn" onClick={handleLogout}>
              התנתק מהחשבון
            </button>
          </div>
        ) : (
          /* תצוגת טופס הרשמה והתחברות */
          <>
            <div className="auth-header">
              <span className="auth-cloud-icon">☁️</span>
              <h3>חשבון משתמש וסנכרון ענן</h3>
              <p>התחבר כדי לשמור ולשלוף את ה-XP וההתקדמות שלך מכל מכשיר!</p>
            </div>

            {/* מתג כרטיסיות */}
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
                onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
              >
                <LogIn size={16} /> התחברות
              </button>
              <button 
                className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
                onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
              >
                <UserPlus size={16} /> הרשמה חדשה
              </button>
            </div>

            {error && <div className="auth-alert error">{error}</div>}
            {success && (
              <div className="auth-alert success">
                <CheckCircle2 size={18} /> {success}
              </div>
            )}

            <form onSubmit={tab === 'login' ? handleLogin : handleRegister} className="auth-form">
              {tab === 'register' && (
                <div className="auth-input-group">
                  <User className="input-icon" size={18} />
                  <input
                    type="text"
                    placeholder="שם מלא / שם משתמש"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="auth-input-group">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  placeholder="כתובת אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-group">
                <Lock className="input-icon" size={18} />
                <input
                  type="password"
                  placeholder="סיסמה (לפחות 6 תווים)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'מעבד נתונים...' : (tab === 'login' ? 'התחבר למערכת 🚀' : 'צור חשבון חדש ✨')}
              </button>
            </form>

            <div className="auth-guest-divider">
              <span>או</span>
            </div>

            <button className="auth-guest-btn" onClick={onClose}>
              המשך כאורח (שמירה בדפדפן המקומי)
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
