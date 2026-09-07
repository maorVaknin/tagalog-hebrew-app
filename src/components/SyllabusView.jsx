import React, { useState } from 'react';
import { CheckCircle2, Play, Sparkles, Star, BookOpen, X, Award, ShieldCheck, Trophy } from 'lucide-react';
import './SyllabusView.css';

export function SyllabusView({ courseData, completedLessons, onSelectLesson, onSelectQuiz, userStats }) {
  const [activePopoverLesson, setActivePopoverLesson] = useState(null);

  const handleNodeClick = (lesson) => {
    setActivePopoverLesson(lesson);
  };

  const handleClosePopover = () => {
    setActivePopoverLesson(null);
  };

  // Helper to generate smooth cubic bezier SVG path between node centers
  const generatePathD = (lessonsCount) => {
    const rowHeight = 125;
    const centerX = 160;
    const offsets = [0, 50, 0, -50]; // Center, Right, Center, Left

    let points = [];
    for (let i = 0; i < lessonsCount; i++) {
      const x = centerX + offsets[i % 4];
      const y = i * rowHeight + 40; // 40px is node center Y offset in row
      points.push({ x, y });
    }

    if (points.length === 0) return { fullPath: '', activePath: '' };

    let fullPath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpY = prev.y + (curr.y - prev.y) * 0.5;
      fullPath += ` C ${prev.x} ${cpY}, ${curr.x} ${cpY}, ${curr.x} ${curr.y}`;
    }

    return fullPath;
  };

  return (
    <div className="syllabus-container animate-fade-in" dir="rtl">
      {/* Duolingo-Style Interactive Learning Path */}
      <div className="duolingo-path-wrapper">
        {courseData.units.map((unit, unitIdx) => {
          // Calculate Unit Completion Progress
          const unitCompletedCount = unit.lessons.filter(l => completedLessons.includes(l.lessonId)).length;
          const unitProgressPercentage = Math.round((unitCompletedCount / unit.lessons.length) * 100);
          const isUnitMastered = unitCompletedCount === unit.lessons.length;

          // Theme color for unit
          const unitColor = unit.color || '#10b981';
          const offsets = [0, 50, 0, -50];
          const fullPathD = generatePathD(unit.lessons.length);

          return (
            <div key={unit.unitId} className="duolingo-unit-section">
              {/* Unit Header Banner */}
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

              {/* Serpentine Curve Path Container */}
              <div className="unit-path-container">
                {/* SVG Connecting Curved Lines */}
                <svg 
                  className="unit-path-svg" 
                  viewBox={`0 0 320 ${unit.lessons.length * 125}`} 
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`grad-${unit.unitId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={unitColor} stopOpacity="0.8" />
                      <stop offset="100%" stopColor={unitColor} stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Thick Outer Glow Path */}
                  <path 
                    d={fullPathD} 
                    className="path-bg-line" 
                  />
                  {/* Active Colored Path */}
                  <path 
                    d={fullPathD} 
                    className="path-active-line" 
                    style={{ stroke: `url(#grad-${unit.unitId})` }} 
                  />
                </svg>

                {/* Nodes List */}
                <div className="unit-nodes-list">
                  {unit.lessons.map((lesson, lessonIdx) => {
                    const isCompleted = completedLessons.includes(lesson.lessonId);
                    const isCurrent = !isCompleted && (lessonIdx === 0 || completedLessons.includes(unit.lessons[lessonIdx - 1]?.lessonId));

                    const offsetX = offsets[lessonIdx % 4];

                    return (
                      <div key={lesson.lessonId} className="node-row-item">
                        {/* Node & Label Unified Capsule */}
                        <div 
                          className="node-capsule" 
                          style={{ transform: `translateX(${offsetX}px)` }}
                        >
                          {/* 3D Duolingo Circle Button */}
                          <button
                            className={`duolingo-node-btn ${isCompleted ? 'status-completed' : isCurrent ? 'status-current' : 'status-available'}`}
                            style={isCurrent ? { boxShadow: `0 8px 0 ${unitColor}aa, 0 0 25px ${unitColor}77` } : {}}
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

                            {/* Active Pulsing Ring */}
                            {isCurrent && (
                              <span className="active-pulse-ring" style={{ borderColor: unitColor }}></span>
                            )}
                          </button>

                          {/* Node Label Box directly below circle */}
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
