import React from 'react';
import { BookOpen, Search, Hash, MessageSquare, Compass } from 'lucide-react';
import './BottomNav.css';

export const BottomNav = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: 'syllabus', label: 'סילבוס', icon: BookOpen },
    { id: 'dictionary', label: 'מילון', icon: Search },
    { id: 'numbers', label: 'מספרים', icon: Hash },
    { id: 'roleplay', label: 'שיחה', icon: MessageSquare },
    { id: 'grammar', label: 'דקדוק', icon: Compass }
  ];

  return (
    <nav className="bottom-nav-container">
      <div className="bottom-nav-glass">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id || 
            (tab.id === 'syllabus' && (currentTab === 'flashcards' || currentTab === 'quiz'));

          return (
            <button
              key={tab.id}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab.id)}
            >
              <div className="icon-wrapper">
                <Icon size={20} />
              </div>
              <span className="bottom-nav-label">{tab.label}</span>
              {isActive && <div className="active-dot-indicator"></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
