import React, { useState, useEffect } from 'react';
import { X, Award, Flame, CheckCircle, ShieldCheck, Save, Sparkles } from 'lucide-react';
import './UserProfileModal.css';

const AVATARS = [
  '🐋', '🌴', '🏄‍♂️', '🏄‍♀️', '🇵🇭', '👑', '⚡', '🦜', '🥥', '🎓',
  '🌺', '🦈', '🐬', '🏝️', '🌊', '✈️', '🍍', '🥭', '🦁', '🐯',
  '🐼', '🦊', '🐉', '🦄', '🚀', '💎', '🦸‍♂️', '🦸‍♀️', '🧙‍♂️', '👾',
  '🎯', '🎨', '🎧', '🎮', '🏆', '🔥', '🌟', '🌈', '🕶️', '🐱'
];

export function UserProfileModal({ isOpen, onClose, userStats, completedLessonsCount, userProfile, setUserProfile }) {
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar || '🐋');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setSelectedAvatar(userProfile.avatar || '🐋');
    }
  }, [userProfile]);

  if (!isOpen) return null;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...userProfile,
      avatar: selectedAvatar,
      updatedAt: new Date().toISOString()
    };
    setUserProfile(updated);
    localStorage.setItem('th_user_profile', JSON.stringify(updated));
    
    setIsSavedNotice(true);
    setTimeout(() => {
      setIsSavedNotice(false);
      onClose();
    }, 1200);
  };

  // Calculate User Rank based on XP
  const calculateRank = (xp) => {
    if (xp >= 500) return { title: 'מאסטר טגלוג 👑', color: '#fbbf24' };
    if (xp >= 250) return { title: 'דובר מתקדם ⚡', color: '#38bdf8' };
    if (xp >= 100) return { title: 'לומד מתמיד 🌴', color: '#10b981' };
    return { title: 'מתחיל חדש 🌱', color: '#a7f3d0' };
  };

  const rank = calculateRank(userStats.xp);

  return (
    <div className="modal-backdrop animate-fade-in" onClick={onClose}>
      <div className="profile-modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="profile-modal-header">
          <div className="profile-title-group">
            <span className="profile-modal-avatar-preview">{selectedAvatar}</span>
            <div>
              <h2 className="profile-modal-title">פרופיל משתמש והתקדמות</h2>
              <span className="profile-modal-subtitle">שמירת נתונים, רצפים והישגים</span>
            </div>
          </div>
          <button className="profile-modal-close-btn" onClick={onClose} title="סגור">
            <X size={20} />
          </button>
        </div>

        {/* User Rank Banner */}
        <div className="user-rank-banner" style={{ borderColor: rank.color }}>
          <ShieldCheck size={22} style={{ color: rank.color }} />
          <div className="rank-info">
            <span className="rank-label">דרגת לימוד נוכחית</span>
            <span className="rank-title" style={{ color: rank.color }}>{rank.title}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="profile-stats-grid">
          <div className="profile-stat-card xp-card">
            <Award size={22} className="stat-icon xp-icon" />
            <div className="stat-details">
              <span className="stat-value">{userStats.xp}</span>
              <span className="stat-label">סך הכל XP</span>
            </div>
          </div>

          <div className="profile-stat-card streak-card">
            <Flame size={22} className="stat-icon streak-icon" />
            <div className="stat-details">
              <span className="stat-value">{userStats.streak} ימים</span>
              <span className="stat-label">רצף למידה יומי</span>
            </div>
          </div>

          <div className="profile-stat-card lessons-card">
            <CheckCircle size={22} className="stat-icon lessons-icon" />
            <div className="stat-details">
              <span className="stat-value">{completedLessonsCount}</span>
              <span className="stat-label">שיעורים שהושלמו</span>
            </div>
          </div>
        </div>

        {/* Registration / Avatar Selection Form */}
        <form className="profile-form" onSubmit={handleSaveProfile}>
          <h3 className="form-section-title">
            <Sparkles size={16} className="inline-icon" />
            <span>בחירת אווטאר אישי ({AVATARS.length} אפשרויות)</span>
          </h3>

          {/* Avatar Selector Grid */}
          <div className="avatar-selector-box">
            <div className="avatars-row custom-scrollbar">
              {AVATARS.map((av) => (
                <button
                  type="button"
                  key={av}
                  className={`avatar-option-btn ${selectedAvatar === av ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(av)}
                  title={`בחר אווטאר ${av}`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="profile-form-actions">
            <button type="submit" className="save-profile-btn">
              <Save size={18} />
              <span>שמור אווטאר</span>
            </button>
          </div>

          {isSavedNotice && (
            <div className="saved-notice-badge">
              ✨ האווטאר וההתקדמות נשמרו בהצלחה!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserProfileModal;
