import React, { useState } from 'react';
import { CheckCircle2, Play, Sparkles, Star, BookOpen, X, Trophy, Award, Lock } from 'lucide-react';
import './SyllabusView.css';

export function SyllabusView({ courseData, completedLessons, onSelectLesson, onSelectQuiz, userStats }) {
  const [activePopoverLesson, setActivePopoverLesson] = useState(null);

  const handleNodeClick = (lesson) => {
    setActivePopoverLesson(lesson);
  };

  const handleClosePopover = () => {
    setActivePopoverLesson(null);
  };

  return (
    <div className="syllabus-container animate-fade-in" dir="rtl">
      {/* Interactive Vertical Learning Path */}
      <div className="duolingo-path-wrapper">
        {courseData.units.map((unit, unitIdx) => {
          // Calculate Unit Completion Progress
          const unitCompletedCount = unit.lessons.filter(l => completedLessons.includes(l.lessonId)).length;
          const unitProgressPercentage = Math.round((unitCompletedCount / unit.lessons.length) * 100);
          const isUnitMastered = unitCompletedCount === unit.lessons.length;

          // Theme color for unit
          const unitColor = unit.color || '#10b981';

          return (
            <div key={unit.unitId} className="duolingo-unit-section">
              {/* Unit Header Banner Card */}
              <div 
                className="unit-banner-card" 
                style={{ 
                  background: `linear-gradient(135deg, ${unitColor}25 0%, ${unitColor}45 100%)`, 
                  borderColor: `${unitColor}77` 
                }}
              >
                <div className="unit-banner-content">
                  <div className="unit-banner-titles">
                    <div className="unit-badge-row">
                      <span className="unit-number-tag">יחידה {unitIdx + 1}</span>
                      {isUnitMastered && (
                        <span className="unit-mastered-tag">
                          <Trophy size={13} /> הושלמה בהצטיינות
                        </span>
                      )}
                    </div>
                    <h2 className="unit-banner-title">{unit.titleHebrew}</h2>
                    <span className="unit-banner-sub">{unit.titleTagalog} • {unit.descriptionHebrew}</span>
                  </div>

                  <div className="unit-banner-icon">{unit.icon}</div>
                </div>

                {/* Unit Progress Bar */}
                <div className="unit-progress-strip">
                  <div className="unit-progress-info">
                    <span>התקדמות יחידה: {unitCompletedCount} מתוך {unit.lessons.length} שיעורים הושלמו</span>
                    <span className="unit-pct" style={{ color: unitColor }}>{unitProgressPercentage}%</span>
                  </div>
                  <div className="unit-progress-track">
                    <div 
                      className="unit-progress-fill" 
                      style={{ width: `${unitProgressPercentage}%`, backgroundColor: unitColor }}
                    />
                  </div>
                </div>
              </div>

              {/* Clean Vertical Spine Path (Straight Column with Generous Spacing) */}
              <div className="vertical-path-container">
                {/* Central Connecting Vertical Spine Line */}
                <div 
                  className="vertical-spine-line" 
                  style={{
                    background: `linear-gradient(180deg, ${unitColor} 0%, rgba(255,255,255,0.15) 100%)`,
                    boxShadow: `0 0 12px ${unitColor}66`
                  }}
                />

                {/* Lesson Nodes List */}
                <div className="vertical-nodes-list">
                  {unit.lessons.map((lesson, lessonIdx) => {
                    const isCompleted = completedLessons.includes(lesson.lessonId);
                    const isCurrent = !isCompleted && (lessonIdx === 0 || completedLessons.includes(unit.lessons[lessonIdx - 1]?.lessonId));

                    return (
                      <div key={lesson.lessonId} className="vertical-node-row">
                        {/* 3D Duolingo Circle Button */}
                        <div className="node-wrapper">
                          <button
                            className={`duolingo-node-btn ${isCompleted ? 'status-completed' : isCurrent ? 'status-current' : 'status-available'}`}
                            style={isCurrent ? { boxShadow: `0 8px 0 ${unitColor}aa, 0 0 25px ${unitColor}77` } : {}}
                            onClick={() => handleNodeClick(lesson)}
                            title={lesson.title}
                          >
                            <span className="node-icon-inner">
                              {isCompleted ? (
                                <CheckCircle2 size={34} className="check-icon" />
                              ) : isCurrent ? (
                                <Star size={34} className="star-icon animate-bounce" />
                              ) : (
                                <span className="lesson-emoji">{lesson.icon}</span>
                              )}
                            </span>

                            {/* Active Pulsing Ring */}
                            {isCurrent && (
                              <span className="active-pulse-ring" style={{ borderColor: unitColor }}></span>
                            )}
                          </button>

                          {/* Spacious Label Card Directly Aligned Below Circle */}
                          <div className="vertical-label-card" onClick={() => handleNodeClick(lesson)}>
                            <div className="label-header">
                              <span className="label-title">{lesson.title}</span>
                              <span className="label-badge">{lesson.vocabulary.length} מילים</span>
                            </div>
                            <span className="label-sub-status">
                              {isCompleted ? '✓ הושלם בהצלחה' : isCurrent ? '⚡ השיעור הנוכחי' : '🔒 שיעור זמין'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Unit Mastery Trophy Checkpoint Node */}
                  <div className="vertical-node-row trophy-checkpoint-row">
                    <div className="node-wrapper">
                      <button
                        className={`duolingo-node-btn trophy-node-btn ${isUnitMastered ? 'status-completed' : 'status-available'}`}
                        onClick={() => {
                          if (unit.lessons.length > 0) {
                            onSelectQuiz(unit.lessons[unit.lessons.length - 1]);
                          }
                        }}
                        title="מבחן מסכם יחידה"
                      >
                        <span className="node-icon-inner">
                          <Trophy size={36} className={isUnitMastered ? 'gold-trophy-icon' : 'trophy-icon'} />
                        </span>
                      </button>

                      <div 
                        className="vertical-label-card trophy-label-card"
                        onClick={() => {
                          if (unit.lessons.length > 0) {
                            onSelectQuiz(unit.lessons[unit.lessons.length - 1]);
                          }
                        }}
                      >
                        <div className="label-header">
                          <span className="label-title">🏆 מבחן מסכם יחידה</span>
                          <span className="label-badge trophy-badge">מבחן</span>
                        </div>
                        <span className="label-sub-status">
                          {isUnitMastered ? '👑 יחידה הושלמה 100%' : 'תרגול ומבחן מסכם'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Duolingo Lesson Popover Modal */}
      {activePopoverLesson && (
        <div className="popover-backdrop animate-fade-in" onClick={handleClosePopover}>
          <div className="popover-card glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="popover-header">
              <div className="popover-icon">{activePopoverLesson.icon}</div>
              <div className="popover-titles">
                <h3 className="popover-title">{activePopoverLesson.title}</h3>
                <p className="popover-desc">{activePopoverLesson.description}</p>
              </div>
              <button className="popover-close-btn" onClick={handleClosePopover}>
                <X size={18} />
              </button>
            </div>

            <div className="popover-meta">
              <div className="meta-item">
                <BookOpen size={16} />
                <span>{activePopoverLesson.vocabulary.length} מילים וביטויים</span>
              </div>
              {activePopoverLesson.quiz && (
                <div className="meta-item">
                  <Sparkles size={16} />
                  <span>{activePopoverLesson.quiz.length} שאלות תרגול ומבחן</span>
                </div>
              )}
            </div>

            <div className="popover-actions">
              <button
                className="popover-btn primary"
                onClick={() => {
                  handleClosePopover();
                  onSelectLesson(activePopoverLesson);
                }}
              >
                <Play size={18} />
                <span>למידה בכרטיסיות</span>
              </button>

              {activePopoverLesson.quiz && (
                <button
                  className="popover-btn secondary"
                  onClick={() => {
                    handleClosePopover();
                    onSelectQuiz(activePopoverLesson);
                  }}
                >
                  <Sparkles size={18} />
                  <span>התחל מבחן</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SyllabusView;
