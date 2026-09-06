import React, { useState } from 'react';
import { CheckCircle2, Play, Sparkles, Lock, Star, BookOpen, X, ChevronLeft } from 'lucide-react';
import './SyllabusView.css';

export const SyllabusView = ({ courseData, completedLessons, onSelectLesson, onSelectQuiz, userStats }) => {
  const [activePopoverLesson, setActivePopoverLesson] = useState(null);

  const handleNodeClick = (lesson) => {
    setActivePopoverLesson(lesson);
  };

  const handleClosePopover = () => {
    setActivePopoverLesson(null);
  };

  return (
    <div className="syllabus-container animate-fade-in" dir="rtl">
      {/* Duolingo-Style Interactive Learning Path */}
      <div className="duolingo-path-wrapper">
        {courseData.units.map((unit, unitIdx) => {
          // Calculate Unit Completion Progress
          const unitCompletedCount = unit.lessons.filter(l => completedLessons.includes(l.lessonId)).length;
          const unitProgressPercentage = Math.round((unitCompletedCount / unit.lessons.length) * 100);

          // Theme color for unit
          const unitColor = unit.color || '#10b981';

          return (
            <div key={unit.unitId} className="duolingo-unit-section">
              {/* Unit Header Banner */}
              <div className="unit-banner-card" style={{ background: `linear-gradient(135deg, ${unitColor}22 0%, ${unitColor}44 100%)`, borderColor: `${unitColor}66` }}>
                <div className="unit-banner-content">
                  <div className="unit-banner-titles">
                    <span className="unit-number-tag">יחידה {unitIdx + 1}</span>
                    <h2 className="unit-banner-title">{unit.titleHebrew}</h2>
                    <span className="unit-banner-sub">{unit.titleTagalog} • {unit.descriptionHebrew}</span>
                  </div>

                  <div className="unit-banner-icon">{unit.icon}</div>
                </div>

                {/* Unit Progress Bar */}
                <div className="unit-progress-strip">
                  <div className="unit-progress-info">
                    <span>התקדמות יחידה: {unitCompletedCount} מתוך {unit.lessons.length} שיעורים הושלמו</span>
                    <span className="unit-pct">{unitProgressPercentage}%</span>
                  </div>
                  <div className="unit-progress-track">
                    <div 
                      className="unit-progress-fill" 
                      style={{ width: `${unitProgressPercentage}%`, backgroundColor: unitColor }}
                    />
                  </div>
                </div>
              </div>

              {/* Serpentine Zigzag Path of Lessons */}
              <div className="unit-nodes-path">
                {unit.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = completedLessons.includes(lesson.lessonId);
                  
                  // First uncompleted lesson in the unit is "current active"
                  const isCurrent = !isCompleted && (lessonIdx === 0 || completedLessons.includes(unit.lessons[lessonIdx - 1]?.lessonId));

                  // Zigzag alignment classes: center, right, center, left
                  const alignmentPositions = ['pos-center', 'pos-right', 'pos-center', 'pos-left'];
                  const posClass = alignmentPositions[lessonIdx % 4];

                  return (
                    <div key={lesson.lessonId} className={`node-row ${posClass}`}>
                      {/* Connecting Path Connector Line */}
                      {lessonIdx > 0 && <div className="path-connector-line"></div>}

                      {/* Duolingo 3D Node Button */}
                      <div className="node-button-container">
                        <button
                          className={`duolingo-node-btn ${isCompleted ? 'status-completed' : isCurrent ? 'status-current' : 'status-available'}`}
                          style={isCurrent ? { boxShadow: `0 8px 0 ${unitColor}aa, 0 0 20px ${unitColor}66` } : {}}
                          onClick={() => handleNodeClick(lesson)}
                          title={lesson.title}
                        >
                          <span className="node-icon-inner">
                            {isCompleted ? (
                              <CheckCircle2 size={32} className="check-icon" />
                            ) : isCurrent ? (
                              <Star size={32} className="star-icon animate-bounce" />
                            ) : (
                              <span className="lesson-emoji">{lesson.icon}</span>
                            )}
                          </span>

                          {/* Pulsing Active Ring for Current Lesson */}
                          {isCurrent && (
                            <span className="active-pulse-ring" style={{ borderColor: unitColor }}></span>
                          )}
                        </button>

                        {/* Node Label Below */}
                        <div className="node-label-box" onClick={() => handleNodeClick(lesson)}>
                          <span className="node-label-title">{lesson.title}</span>
                          <span className="node-label-words">{lesson.vocabulary.length} מילים</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
};

export default SyllabusView;
