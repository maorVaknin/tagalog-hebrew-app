import React, { useState } from 'react';
import { MessageSquare, MapPin, Volume2, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { speakTagalog } from '../utils/audioTTS';
import './RolePlaySimulator.css';

export const RolePlaySimulator = ({ scenarios, onAddXp }) => {
  const [activeScenario, setActiveScenario] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalScenarioXp, setTotalScenarioXp] = useState(0);

  const startScenario = (scenario) => {
    setActiveScenario(scenario);
    setIsCompleted(false);
    setTotalScenarioXp(0);
    
    const initialBubble = {
      sender: 'bot',
      tagalog: scenario.initialMessageTagalog,
      hebrew: scenario.initialMessageHebrew,
      phonetic: scenario.initialMessagePhonetic
    };
    
    setChatHistory([initialBubble]);
    setAvailableOptions(scenario.userOptions);
  };

  const handlePlayAudio = (text) => {
    speakTagalog(text);
  };

  const handleUserSelect = (option) => {
    const userBubble = {
      sender: 'user',
      tagalog: option.textTagalog,
      hebrew: option.textHebrew,
      phonetic: option.textPhonetic
    };

    const botBubble = {
      sender: 'bot',
      tagalog: option.botResponseTagalog,
      hebrew: option.botResponseHebrew,
      phonetic: option.botResponsePhonetic
    };

    const newHistory = [...chatHistory, userBubble, botBubble];
    setChatHistory(newHistory);
    setTotalScenarioXp(prev => prev + option.xpReward);

    setTimeout(() => handlePlayAudio(option.botResponseTagalog), 200);

    setAvailableOptions([]);
    setIsCompleted(true);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    onAddXp(option.xpReward);
  };

  if (!activeScenario) {
    return (
      <div className="roleplay-select-container animate-fade-in">
        <div className="roleplay-hero">
          <span className="hero-emoji">💬</span>
          <h2>סימולטור שיחות תרחישי טיולים בפיליפינים</h2>
          <p>תרגלו שיחות אמיתיות בשוק, בנסיעות, במלונות, השכרת אופנועים ומפגש עם מקומיים!</p>
        </div>

        <div className="scenarios-grid">
          {scenarios.map(sc => (
            <div key={sc.id} className="scenario-card glass-panel" onClick={() => startScenario(sc)}>
              <div className="sc-header">
                <span className="sc-icon">{sc.icon}</span>
                <span className="sc-location"><MapPin size={14} /> {sc.locationTagalog}</span>
              </div>
              <h3 className="sc-title">{sc.titleHebrew}</h3>
              <p className="sc-desc">{sc.descriptionHebrew}</p>
              
              <button className="sc-start-btn">
                התחל שיחה <Send size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="roleplay-chat-container animate-fade-in">
      <div className="chat-topbar glass-panel">
        <button className="back-btn" onClick={() => setActiveScenario(null)}>
          ← חזרה לתרחישים
        </button>
        <div className="chat-header-info">
          <h3>{activeScenario.icon} {activeScenario.titleHebrew}</h3>
          <span className="chat-location">{activeScenario.locationTagalog}</span>
        </div>
      </div>

      <div className="chat-messages-area">
        {chatHistory.map((msg, idx) => (
          <div key={idx} className={`chat-bubble-wrapper ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
            <div className="chat-bubble">
              <div className="msg-tagalog">{msg.tagalog}</div>
              <div className="msg-phonetic">🗣️ {msg.phonetic}</div>
              <div className="msg-hebrew">"{msg.hebrew}"</div>

              <button className="msg-audio-btn" onClick={() => handlePlayAudio(msg.tagalog)}>
                <Volume2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area glass-panel">
        {!isCompleted ? (
          <div className="options-selector">
            <span className="opt-title">בחר תגובה לענות למקומי:</span>
            <div className="chat-options-grid">
              {availableOptions.map((opt, idx) => (
                <button key={idx} className="chat-option-btn" onClick={() => handleUserSelect(opt)}>
                  <div className="opt-tagalog">{opt.textTagalog}</div>
                  <div className="opt-phonetic">{opt.textPhonetic}</div>
                  <div className="opt-hebrew">"{opt.textHebrew}"</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="scenario-completed-box">
            <CheckCircle2 size={32} className="icon-success" />
            <div className="comp-info">
              <h4>כל הכבוד! השיחה הסתיימה בהצלחה!</h4>
              <p>צברת +{totalScenarioXp} XP בשיחה זו.</p>
            </div>
            <button className="reset-sc-btn" onClick={() => startScenario(activeScenario)}>
              תרגל שיחה זו שוב <RefreshCw size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
