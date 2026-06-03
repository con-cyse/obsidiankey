"use client";

import React, { useState } from "react";

interface QuizProps {
  onComplete: (selections: {
    strengths: string[];
    hobbies: string[];
    workPreferences: string[];
  }) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(1);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [selectedWork, setSelectedWork] = useState<string[]>([]);

  // Strength questions
  const STRENGTHS_QUESTIONS = [
    {
      id: "analytical",
      title: "Analytical & Logical",
      description: "You love patterns, data, solving mathematical riddles, and logical reasoning.",
      icon: "📊"
    },
    {
      id: "creative",
      title: "Creative & Artistic",
      description: "You thrive on self-expression, graphic design, writing, music, or cooking.",
      icon: "🎨"
    },
    {
      id: "communication",
      title: "Communication & Media",
      description: "You enjoy writing blogs, public speaking, debating, and presenting concepts.",
      icon: "🗣️"
    },
    {
      id: "leadership",
      title: "Leadership & Strategy",
      description: "You like organizing groups, managing goals, and establishing strategic visions.",
      icon: "👑"
    },
    {
      id: "empathy",
      title: "Empathy & Helping",
      description: "You are highly sensitive to other's feelings and find joy in mentoring or nursing.",
      icon: "❤️"
    },
    {
      id: "technical",
      title: "Technical & Systems",
      description: "You enjoy understanding mechanisms, coding software, and diagnosing technical bugs.",
      icon: "💻"
    },
    {
      id: "science",
      title: "Scientific Inquiry",
      description: "You love deep scientific topics, chemical biology, and running research analyses.",
      icon: "🧪"
    },
    {
      id: "problem-solving",
      title: "Critical Problem-Solving",
      description: "You are the go-to person to resolve arguments and find novel structural solutions.",
      icon: "🧩"
    }
  ];

  // Hobby questions
  const HOBBIES_QUESTIONS = [
    { id: "coding", title: "Coding & Building Software", icon: "🌐" },
    { id: "gaming", title: "Video Games & Interactive Media", icon: "🎮" },
    { id: "drawing", title: "Sketching, Painting, or Designing", icon: "🖌️" },
    { id: "writing", title: "Blogging, Creative Writing, or Reading", icon: "✍️" },
    { id: "building", title: "Repairing Electronics, Woodworking, DIY", icon: "🛠️" },
    { id: "sports", title: "Physical Fitness, Athletics, Outdoor Sports", icon: "⚽" },
    { id: "music", title: "Playing Instruments, Singing, Songwriting", icon: "🎵" },
    { id: "volunteering", title: "Community Service, Tutoring, Activism", icon: "🤝" },
    { id: "investing", title: "Stock Market, Side Hustles, Startup Ideas", icon: "📈" },
    { id: "reading", title: "Scientific Journals, Novels, Philosophy", icon: "📚" },
    { id: "cooking", title: "Baking, Recipe Experimentation, Gastronomy", icon: "🍳" }
  ];

  // Work Preferences questions
  const WORK_QUESTIONS = [
    { id: "building software", title: "Developing Software & Mobile Apps", icon: "🖥️" },
    { id: "helping people", title: "Mentoring, Counseling, & Social Support", icon: "🌟" },
    { id: "designing visuals", title: "Designing Logos, UI/UX, & Graphics", icon: "📐" },
    { id: "managing business", title: "Directing Operations & Leading Teams", icon: "💼" },
    { id: "analyzing data", title: "Extracting Insights from Complex Figures", icon: "📊" },
    { id: "scientific research", title: "Conducting Laboratory Experiments", icon: "🔬" },
    { id: "teaching", title: "Training Students & Explaining Concepts", icon: "🎓" },
    { id: "creating content", title: "Filming Videos, Journalism, Writing", icon: "📸" },
    { id: "diagnosing health", title: "Caring for Patients & Curing Diseases", icon: "🩺" },
    { id: "planning structures", title: "Drafting Blueprint Designs for Buildings", icon: "🏢" }
  ];

  const handleToggle = (id: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(id)) {
      setList(list.filter((x) => x !== id));
    } else {
      setList([...list, id]);
    }
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    onComplete({
      strengths: selectedStrengths,
      hobbies: selectedHobbies,
      workPreferences: selectedWork,
    });
  };

  return (
    <div className="ok-card ok-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Quiz Progress Header */}
      <div className="quiz-progress-wrapper" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: "600", fontSize: "0.9em" }}>
          <span>Step {step} of 4</span>
          <span>{Math.round((step / 4) * 100)}% Complete</span>
        </div>
        <div style={{ height: "6px", width: "100%", background: "#e2e8f0", borderRadius: "3px", overflow: "hidden" }}>
          <div 
            style={{ 
              height: "100%", 
              width: `${(step / 4) * 100}%`, 
              background: "linear-gradient(135deg, var(--primary) 0%, #6366f1 100%)", 
              transition: "width 0.4s ease" 
            }}
          />
        </div>
      </div>

      {/* Step 1: Strengths */}
      {step === 1 && (
        <div className="ok-fade-in">
          <h2 style={{ fontSize: "1.75em", marginBottom: "8px" }}>What are your core strengths?</h2>
          <p style={{ marginBottom: "20px" }}>Select the attributes that define how you think, solve problems, and collaborate with others.</p>
          
          <div className="quiz-cards-grid">
            {STRENGTHS_QUESTIONS.map((q) => {
              const isSelected = selectedStrengths.includes(q.id);
              return (
                <div 
                  key={q.id}
                  className={`quiz-select-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleToggle(q.id, selectedStrengths, setSelectedStrengths)}
                >
                  <span className="quiz-card-icon">{q.icon}</span>
                  <div className="quiz-card-info">
                    <span className="quiz-card-title">{q.title}</span>
                    <span className="quiz-card-desc">{q.description}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="quiz-footer" style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
            <button 
              className="ok-btn ok-btn-primary" 
              onClick={handleNext}
              disabled={selectedStrengths.length === 0}
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Hobbies */}
      {step === 2 && (
        <div className="ok-fade-in">
          <h2 style={{ fontSize: "1.75em", marginBottom: "8px" }}>How do you enjoy spending your free time?</h2>
          <p style={{ marginBottom: "20px" }}>Select the hobbies and interests that excite you outside of school or work.</p>
          
          <div className="quiz-pills-grid">
            {HOBBIES_QUESTIONS.map((q) => {
              const isSelected = selectedHobbies.includes(q.id);
              return (
                <div 
                  key={q.id}
                  className={`quiz-pill-card ${isSelected ? "selected" : ""}`}
                  onClick={() => handleToggle(q.id, selectedHobbies, setSelectedHobbies)}
                >
                  <span>{q.icon}</span>
                  <span>{q.title}</span>
                </div>
              );
            })}
          </div>

          <div className="quiz-footer" style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
            <button className="ok-btn ok-btn-secondary" onClick={handlePrev}>
              &larr; Back
            </button>
            <button 
              className="ok-btn ok-btn-primary" 
              onClick={handleNext}
              disabled={selectedHobbies.length === 0}
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Desired Work */}
      {step === 3 && (
        <div className="ok-fade-in">
          <h2 style={{ fontSize: "1.75em", marginBottom: "8px" }}>What kind of daily work excites you?</h2>
          <p style={{ marginBottom: "20px" }}>Select the actual types of tasks and impacts you want to achieve in your career.</p>
          
          <div className="quiz-cards-grid">
            {WORK_QUESTIONS.map((q) => {
              const isSelected = selectedWork.includes(q.id);
              return (
                <div 
                  key={q.id}
                  className={`quiz-select-card compact ${isSelected ? "selected" : ""}`}
                  onClick={() => handleToggle(q.id, selectedWork, setSelectedWork)}
                >
                  <span className="quiz-card-icon">{q.icon}</span>
                  <div className="quiz-card-info">
                    <span className="quiz-card-title">{q.title}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="quiz-footer" style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
            <button className="ok-btn ok-btn-secondary" onClick={handlePrev}>
              &larr; Back
            </button>
            <button 
              className="ok-btn ok-btn-primary" 
              onClick={handleNext}
              disabled={selectedWork.length === 0}
            >
              Continue &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Summary & Generate */}
      {step === 4 && (
        <div className="ok-fade-in" style={{ textAlign: "center" }}>
          <span style={{ fontSize: "3.5rem" }}>🚀</span>
          <h2 style={{ fontSize: "1.85em", marginTop: "12px", marginBottom: "12px" }}>All Set! Ready to Generate Matches?</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto 24px", color: "var(--text-muted)" }}>
            We will analyze your <strong>{selectedStrengths.length} strengths</strong>, <strong>{selectedHobbies.length} hobbies</strong>, and <strong>{selectedWork.length} wanted work styles</strong> to compute your optimal degree matches.
          </p>

          <div 
            style={{ 
              maxWidth: "500px", 
              margin: "0 auto 30px", 
              background: "#f8fafc", 
              borderRadius: "16px", 
              padding: "20px", 
              border: "1px dashed var(--card-border)",
              textAlign: "left"
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <strong>Selected Strengths:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {selectedStrengths.map(s => <span key={s} className="summary-tag">{s}</span>)}
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <strong>Selected Hobbies:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {selectedHobbies.map(h => <span key={h} className="summary-tag">{h}</span>)}
              </div>
            </div>
            <div>
              <strong>Career Desires:</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                {selectedWork.map(w => <span key={w} className="summary-tag">{w}</span>)}
              </div>
            </div>
          </div>

          <div className="quiz-footer" style={{ display: "flex", justifyContent: "space-between" }}>
            <button className="ok-btn ok-btn-secondary" onClick={handlePrev}>
              &larr; Back
            </button>
            <button className="ok-btn ok-btn-primary" onClick={handleSubmit}>
              🔮 Generate Course Matches!
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .quiz-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 14px;
        }
        .quiz-select-card {
          display: flex;
          align-items: center;
          padding: 16px;
          background: #ffffff;
          border: 1px solid var(--card-border);
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .quiz-select-card:hover {
          transform: translateY(-2px);
          border-color: rgba(79, 70, 229, 0.4);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.05);
        }
        .quiz-select-card.selected {
          border-color: var(--primary);
          background: var(--primary-light);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
        }
        .quiz-select-card.compact {
          padding: 12px 16px;
        }
        .quiz-card-icon {
          font-size: 1.8rem;
          margin-right: 14px;
        }
        .quiz-card-info {
          display: flex;
          flex-direction: column;
        }
        .quiz-card-title {
          font-weight: 700;
          color: var(--text-main);
          font-size: 0.95em;
        }
        .quiz-card-desc {
          font-size: 0.8em;
          color: var(--text-muted);
          margin-top: 2px;
          line-height: 1.3;
        }
        .quiz-pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .quiz-pill-card {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 9999px;
          background: #ffffff;
          border: 1px solid var(--card-border);
          cursor: pointer;
          font-size: 0.9em;
          font-weight: 600;
          transition: var(--transition-smooth);
        }
        .quiz-pill-card:hover {
          border-color: rgba(79, 70, 229, 0.4);
          transform: translateY(-1px);
        }
        .quiz-pill-card.selected {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.2);
        }
        .summary-tag {
          font-size: 0.75em;
          padding: 4px 10px;
          border-radius: 9999px;
          background: var(--primary-light);
          color: var(--primary);
          font-weight: 600;
          text-transform: capitalize;
        }
      `}</style>
    </div>
  );
}
