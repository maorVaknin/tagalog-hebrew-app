import React, { useState, useEffect } from 'react';
import './MobileSimulator.css';

export default function MobileSimulator({ children, isSimulated, onToggleSimulator }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isSimulated) {
    return <>{children}</>;
  }

  return (
    <div className="mobile-simulator-wrapper">
      {/* Simulator Toolbar Control */}
      <div className="simulator-header-bar">
        <div className="simulator-badge">
          <span className="live-dot"></span>
          <span>📱 סימולטור iPhone 16 Pro (מצב תצוגת מובייל במחשב)</span>
        </div>
        <button 
          className="simulator-exit-btn" 
          onClick={onToggleSimulator}
          title="חזור לתצוגת דסקטופ רגילה"
        >
          💻 תצוגת מחשב מלאה
        </button>
      </div>

      {/* Device Frame */}
      <div className="iphone-frame">
        {/* Physical Side Buttons */}
        <div className="phone-button volume-up"></div>
        <div className="phone-button volume-down"></div>
        <div className="phone-button power"></div>

        {/* Screen Area */}
        <div className="phone-screen">
          {/* Status Bar */}
          <div className="iphone-status-bar">
            <span className="status-time">{currentTime || '09:41'}</span>
            
            {/* Dynamic Island */}
            <div className="dynamic-island">
              <span className="camera-lens"></span>
              <span className="sensor-lens"></span>
            </div>

            <div className="status-icons">
              <span className="status-signal">📶</span>
              <span className="status-wifi">📶</span>
              <span className="status-battery">🔋</span>
            </div>
          </div>

          {/* App Content inside Phone Screen */}
          <div className="phone-content-scroll">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="ios-home-bar-wrapper">
            <div className="ios-home-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
