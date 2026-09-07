import React, { useState, useEffect } from 'react';
import { courseData } from './data/courseData';
import { Navbar } from './components/Navbar';
import { SyllabusView } from './components/SyllabusView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';
import { RolePlaySimulator } from './components/RolePlaySimulator';
import { GrammarGuideView } from './components/GrammarGuideView';
import { NumbersView } from './components/NumbersView';
import { DictionaryView } from './components/DictionaryView';
import { IOSInstallPrompt } from './components/IOSInstallPrompt';
import { BottomNav } from './components/BottomNav';
import MobileSimulator from './components/MobileSimulator';
import UserProfileModal from './components/UserProfileModal';
import WelcomeSplash from './components/WelcomeSplash';
import AuthModal from './components/AuthModal';
import { getActiveUser, saveUserDataToCloud } from './utils/firebase';

export function App() {
  const [currentTab, setCurrentTab] = useState('syllabus');
  const [activeLesson, setActiveLesson] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Cloud Auth & DB User State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeCloudUser, setActiveCloudUser] = useState(() => getActiveUser());

  // User Profile State & Modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('th_user_profile');
    return saved ? JSON.parse(saved) : { name: 'לומד טגלוג', email: '', avatar: '🐋', isLoggedIn: false };
  });

  // Floating Toast Notification for +10 XP & Streaks
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // User Stats & Daily Streak Engine
  const [userStats, setUserStats] = useState(() => {
    const saved = localStorage.getItem('th_user_stats');
    return saved ? JSON.parse(saved) : { streak: 1, xp: 100, lastActiveDate: '' };
  });

  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('th_completed_lessons');
    return saved ? JSON.parse(saved) : ['u1_l1'];
  });

  // סנכרון ה-XP והסטטיסטיקות לענן במידה ומשתמש מחובר
  useEffect(() => {
    localStorage.setItem('th_user_stats', JSON.stringify(userStats));
    if (activeCloudUser?.uid) {
      saveUserDataToCloud(activeCloudUser.uid, {
        xp: userStats.xp,
        streak: userStats.streak,
        lastActiveDate: userStats.lastActiveDate,
        displayName: userProfile.name
      });
    }
  }, [userStats, activeCloudUser]);

  useEffect(() => {
    localStorage.setItem('th_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
  }, [theme]);

  // Service Worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration skipped or failed:', err);
      });
    }
  }, []);

  const handleCloudUserChange = (user) => {
    setActiveCloudUser(user);
    if (user) {
      setUserProfile(prev => ({
        ...prev,
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        isLoggedIn: true
      }));
      if (user.xp) {
        setUserStats(prev => ({ ...prev, xp: user.xp, streak: user.streak || prev.streak }));
      }
    } else {
      setUserProfile(prev => ({ ...prev, isLoggedIn: false }));
    }
  };

  /**
   * Central Activity Recorder:
   * Adds +10 XP for any successful learning action
   * Updates Daily Streak automatically if first action today
   */
  const handleRecordActivity = (xpAwarded = 10, customNotice = '') => {
    const todayStr = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
    
    setUserStats(prev => {
      let currentStreak = prev.streak || 1;
      let newStreakNotice = '';

      if (prev.lastActiveDate !== todayStr) {
        if (prev.lastActiveDate) {
          const lastDate = new Date(prev.lastActiveDate);
          const todayDate = new Date(todayStr);
          const diffDays = Math.round((todayDate - lastDate) / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            currentStreak += 1;
            newStreakNotice = ` 🔥 רצף ימי למידה נשמר! ${currentStreak} ימים`;
          } else if (diffDays > 1) {
            currentStreak = 1;
            newStreakNotice = ` 🔥 רצף ימי למידה חודש! יום 1`;
          }
        } else {
          currentStreak = 1;
          newStreakNotice = ` 🔥 רצף ימי למידה הותחל! יום 1`;
        }
      }

      const updatedXP = (prev.xp || 0) + xpAwarded;
      
      const toastText = customNotice || `+${xpAwarded} XP ⭐${newStreakNotice}`;
      showToast(toastText);

      return {
        ...prev,
        xp: updatedXP,
        streak: currentStreak,
        lastActiveDate: todayStr
      };
    });
  };

  const handleCompleteLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
    handleRecordActivity(10, '🎉 שיעור הושלם בהצלחה! +10 XP');
  };

  const handleCompleteQuiz = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
    handleRecordActivity(10, '🏆 מבחן הושלם בהצלחה! +10 XP');
  };

  const startLessonFlashcards = (lesson) => {
    setActiveLesson(lesson);
    setCurrentTab('flashcards');
  };

  const startLessonQuiz = (lesson) => {
    setActiveLesson(lesson);
    setCurrentTab('quiz');
  };

  const handleToggleSimulator = () => {
    setIsSimulated(prev => !prev);
  };

  const mainAppContent = (
    <div className={`app-main-wrapper ${isSimulated ? 'is-simulator-active' : ''}`} dir="rtl">
      {/* Floating XP & Streak Toast */}
      {toastMessage && (
        <div className="activity-toast-badge animate-fade-in">
          {toastMessage}
        </div>
      )}

      {showSplash && (
        <WelcomeSplash onEnterApp={() => setShowSplash(false)} />
      )}

      <Navbar 
        userStats={userStats}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        isSimulated={isSimulated}
        onToggleSimulator={handleToggleSimulator}
        userProfile={userProfile}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        activeCloudUser={activeCloudUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      <main className="app-content-area">
        {currentTab === 'syllabus' && (
          <SyllabusView 
            courseData={courseData}
            completedLessons={completedLessons}
            onSelectLesson={startLessonFlashcards}
            onSelectQuiz={startLessonQuiz}
            userStats={userStats}
          />
        )}

        {currentTab === 'dictionary' && (
          <DictionaryView 
            courseData={courseData}
            onSelectLesson={startLessonFlashcards}
            onActivity={() => handleRecordActivity(10)}
          />
        )}

        {currentTab === 'numbers' && (
          <NumbersView onActivity={() => handleRecordActivity(10)} />
        )}

        {currentTab === 'flashcards' && activeLesson && (
          <FlashcardsView 
            lesson={activeLesson}
            onCompleteLesson={handleCompleteLesson}
            onBackToSyllabus={() => setCurrentTab('syllabus')}
            onStartQuiz={startLessonQuiz}
            onActivity={() => handleRecordActivity(10)}
          />
        )}

        {currentTab === 'quiz' && activeLesson && (
          <QuizView 
            lesson={activeLesson}
            onCompleteQuiz={handleCompleteQuiz}
            onBackToSyllabus={() => setCurrentTab('syllabus')}
            onActivity={() => handleRecordActivity(10)}
          />
        )}

        {currentTab === 'roleplay' && (
          <RolePlaySimulator 
            scenarios={courseData.scenarios}
            onAddXp={() => handleRecordActivity(10)}
          />
        )}

        {currentTab === 'grammar' && (
          <GrammarGuideView />
        )}
      </main>

      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <IOSInstallPrompt />

      {/* User Profile Modal */}
      <UserProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userStats={userStats}
        completedLessonsCount={completedLessons.length}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
      />

      {/* Cloud Auth & DB Sync Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        activeUser={activeCloudUser}
        onUserChange={handleCloudUserChange}
      />
    </div>
  );

  return (
    <MobileSimulator isSimulated={isSimulated} onToggleSimulator={handleToggleSimulator}>
      {mainAppContent}
    </MobileSimulator>
  );
}

export default App;
