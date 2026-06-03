"use client";

import React from "react";

interface MatcherProps {
  strengths: string[];
  hobbies: string[];
  workPreferences: string[];
  onToggleStrength: (id: string) => void;
  onToggleHobby: (id: string) => void;
  onToggleWork: (id: string) => void;
  onClearAll: () => void;
}

export default function Matcher({
  strengths,
  hobbies,
  workPreferences,
  onToggleStrength,
  onToggleHobby,
  onToggleWork,
  onClearAll,
}: MatcherProps) {

  const ALL_STRENGTHS = [
    { id: "analytical", label: "Analytical & Logical" },
    { id: "creative", label: "Creative & Artistic" },
    { id: "communication", label: "Communication & Media" },
    { id: "leadership", label: "Leadership & Strategy" },
    { id: "empathy", label: "Empathy & Compassion" },
    { id: "technical", label: "Technical & Systems" },
    { id: "science", label: "Scientific Inquiry" },
    { id: "problem-solving", label: "Critical Problem-Solving" },
    { id: "logical", label: "Logical Reasoning" }
  ];

  const ALL_HOBBIES = [
    { id: "coding", label: "Coding & Software" },
    { id: "gaming", label: "Gaming & Game Design" },
    { id: "drawing", label: "Drawing & Art" },
    { id: "writing", label: "Writing & Blogs" },
    { id: "building", label: "Building & DIY" },
    { id: "sports", label: "Sports & Outdoors" },
    { id: "music", label: "Music & Singing" },
    { id: "volunteering", label: "Volunteering" },
    { id: "investing", label: "Finance & Investing" },
    { id: "reading", label: "Reading & Research" },
    { id: "cooking", label: "Cooking & Baking" }
  ];

  const ALL_WORK = [
    { id: "building software", label: "Building Software" },
    { id: "helping people", label: "Helping & Counseling" },
    { id: "designing visuals", label: "Designing Visuals" },
    { id: "managing business", label: "Managing Teams" },
    { id: "analyzing data", label: "Analyzing Numbers" },
    { id: "scientific research", label: "Scientific Research" },
    { id: "teaching", label: "Teaching & Explaining" },
    { id: "creating content", label: "Creating Content" },
    { id: "diagnosing health", label: "Diagnosing Illnesses" },
    { id: "planning structures", label: "Planning Buildings" }
  ];

  const totalSelections = strengths.length + hobbies.length + workPreferences.length;

  return (
    <div className="ok-card ok-fade-in" style={{ padding: "28px" }}>
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "24px",
          borderBottom: "1px solid var(--card-border)",
          paddingBottom: "16px"
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.75em", marginBottom: "4px" }}>Visual Matcher Board</h2>
          <p style={{ margin: 0, fontSize: "0.9em" }}>Toggle your characteristics below. We calculate degree recommendations in real-time!</p>
        </div>
        {totalSelections > 0 && (
          <button className="ok-btn ok-btn-secondary" onClick={onClearAll} style={{ padding: "8px 16px", fontSize: "0.85em" }}>
            🧹 Clear Selections
          </button>
        )}
      </div>

      <div className="matcher-grid">
        {/* Column 1: Strengths */}
        <div className="matcher-col">
          <h3 className="matcher-col-title">💪 Stated Strengths</h3>
          <p className="matcher-col-desc">What areas do you excel at or perform naturally?</p>
          <div className="ok-pill-group">
            {ALL_STRENGTHS.map((tag) => {
              const isSelected = strengths.includes(tag.id);
              return (
                <div
                  key={tag.id}
                  className={`ok-pill-tag ${isSelected ? "selected" : ""}`}
                  onClick={() => onToggleStrength(tag.id)}
                >
                  {tag.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Hobbies */}
        <div className="matcher-col">
          <h3 className="matcher-col-title">🎨 Free-time Hobbies</h3>
          <p className="matcher-col-desc">What activities capture your attention when offline?</p>
          <div className="ok-pill-group">
            {ALL_HOBBIES.map((tag) => {
              const isSelected = hobbies.includes(tag.id);
              return (
                <div
                  key={tag.id}
                  className={`ok-pill-tag ${isSelected ? "selected" : ""}`}
                  onClick={() => onToggleHobby(tag.id)}
                >
                  {tag.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Wanted Work */}
        <div className="matcher-col">
          <h3 className="matcher-col-title">💼 Wanted Careers</h3>
          <p className="matcher-col-desc">What impact or tasks do you wish to perform daily?</p>
          <div className="ok-pill-group">
            {ALL_WORK.map((tag) => {
              const isSelected = workPreferences.includes(tag.id);
              return (
                <div
                  key={tag.id}
                  className={`ok-pill-tag ${isSelected ? "selected" : ""}`}
                  onClick={() => onToggleWork(tag.id)}
                >
                  {tag.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div 
        style={{ 
          marginTop: "20px", 
          padding: "16px", 
          background: "var(--primary-light)", 
          color: "var(--primary)",
          borderRadius: "12px", 
          fontWeight: "600",
          fontSize: "0.95em",
          textAlign: "center",
          border: "1px solid rgba(79, 70, 229, 0.15)"
        }}
      >
        🎯 Active selections: <strong>{totalSelections} parameters</strong>. 
        {totalSelections === 0 ? " Toggle a few tags above to unlock matches instantly!" : " Matches are displayed dynamically below!"}
      </div>

      <style jsx>{`
        .matcher-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .matcher-col {
          display: flex;
          flex-direction: column;
        }
        .matcher-col-title {
          font-size: 1.25rem;
          color: var(--text-main);
          margin-bottom: 4px;
        }
        .matcher-col-desc {
          font-size: 0.8em;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        @media (max-width: 968px) {
          .matcher-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
