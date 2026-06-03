"use client";

import React, { useState } from "react";

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userLevel: number;
  fullName: string;
  onLogout: () => void;
}

export default function NavBar({
  activeTab,
  setActiveTab,
  userLevel,
  fullName,
  onLogout,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = userLevel >= 2;

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`ok-navbar ${isAdmin ? "ok-nav-admin-mode" : ""}`}>
      <nav className="ok-nav-left">
        <button
          onClick={() => handleTabClick("dashboard")}
          className="ok-nav-home"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img src="/logo.png" width={24} height={24} className="ok-nav-logo" alt="Logo" />
          <span>Pathuro</span>
        </button>
      </nav>

      {/* Hamburger Menu for Mobile */}
      <button 
        className="ok-nav-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          cursor: "pointer",
          color: "#334155"
        }}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <nav className={`ok-nav-right ${mobileMenuOpen ? "ok-mobile-open" : ""}`}>
        <ul>
          <li>
            <button
              onClick={() => handleTabClick("dashboard")}
              className={`ok-nav-link ${activeTab === "dashboard" ? "ok-active" : ""}`}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick("quiz")}
              className={`ok-nav-link ${activeTab === "quiz" ? "ok-active" : ""}`}
            >
              Assessment Quiz
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick("matcher")}
              className={`ok-nav-link ${activeTab === "matcher" ? "ok-active" : ""}`}
            >
              Course Matcher
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick("courses")}
              className={`ok-nav-link ${activeTab === "courses" ? "ok-active" : ""}`}
            >
              Browse Courses
            </button>
          </li>
          <li>
            <button
              onClick={() => handleTabClick("saved")}
              className={`ok-nav-link ${activeTab === "saved" ? "ok-active" : ""}`}
            >
              Saved Matches
            </button>
          </li>
          {isAdmin && (
            <li>
              <button
                onClick={() => handleTabClick("admin")}
                className={`ok-nav-link ${activeTab === "admin" ? "ok-active" : ""}`}
                style={{ border: "1px dashed var(--primary)" }}
              >
                Admin Panel
              </button>
            </li>
          )}
          <li>
            <button
              onClick={() => handleTabClick("profile")}
              className={`ok-nav-link ${activeTab === "profile" ? "ok-active" : ""}`}
              style={{ fontWeight: 600, color: "var(--primary)" }}
            >
              👤 {fullName.split(" ")[0] || "Profile"}
            </button>
          </li>
          {userLevel > 0 && (
            <li>
              <button onClick={onLogout} className="ok-nav-link ok-logout">
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>

      <style jsx>{`
        @media (max-width: 968px) {
          .ok-nav-toggle {
            display: block !important;
          }
          .ok-nav-right {
            display: ${mobileMenuOpen ? "flex" : "none"} !important;
            position: absolute;
            top: 64px;
            left: 0;
            width: 100%;
            background: #ffffff;
            border-bottom: 1px solid var(--card-border);
            padding: 20px;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);
            flex-direction: column;
            align-items: stretch;
          }
          .ok-nav-right ul {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
            gap: 12px;
          }
          .ok-nav-link {
            display: block;
            width: 100%;
            text-align: left;
          }
        }
      `}</style>
    </header>
  );
}
