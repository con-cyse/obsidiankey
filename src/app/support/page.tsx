"use client";

import React, { useState } from "react";
import Link from "next/link";
import Copyright from "@/components/Copyright";

interface FAQItem {
  q: string;
  a: string;
}

export default function SupportPage() {
  const [formEmail, setFormEmail] = useState("");
  const [formCategory, setFormCategory] = useState("Suggest a Course");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  const FAQS: FAQItem[] = [
    {
      q: "How does the course matching algorithm compute recommendations?",
      a: "Our algorithm calculates an intersection match based on your selected strengths, hobbies, and wanted work. It divides the matched parameters by your total selections to generate a starting percentage. If you match traits across all three dimensions (Strengths, Hobbies, and Desired Careers), the system applies a 'high-synergy' boost of up to +10%!"
    },
    {
      q: "Can I take the Assessment Quiz multiple times?",
      a: "Absolutely! You can take the Assessment Quiz as many times as you like. Every time you complete it, your selections will automatically overwrite your profile traits and recalculate your optimal degree matches in real-time."
    },
    {
      q: "How do I save degrees and write custom reflections?",
      a: "In the 'Course Matcher' or 'Browse Courses' tabs, simply click the star (★) icon on any degree card. This saves it to your 'Saved Matches' tab. There, you will find a dedicated text block for each saved course where you can type personalized reflection logs, pre-requisites, or university application steps. Everything is saved automatically!"
    },
    {
      q: "How do I manage the master course database as an Administrator?",
      a: "If you log in with administrative privileges (e.g. using the demo 'admin' / 'admin' account), a dedicated 'Admin Panel' tab will appear in your top navigation header. There, you can perform full CRUD operations: add new custom degrees (with category mapping tags), edit existing records, or delete outdated programs."
    },
    {
      q: "Are my matched profile inputs and saved notes secure?",
      a: "Yes! All of your psychological profiles, assessment quiz results, custom degrees, and bookmarked notes are saved locally in your own browser's secure 'localStorage' system. They are fully private to your browser and never sold or rented, in compliance with our Privacy Policy."
    }
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formSubject || !formMessage) {
      alert("Please fill out all required fields.");
      return;
    }
    setFormSubmitted(true);
    // Reset form
    setFormEmail("");
    setFormSubject("");
    setFormMessage("");
    setFormCategory("Suggest a Course");
  };

  return (
    <>
      <header className="ok-navbar">
        <div className="ok-nav-left">
          <Link href="/" className="ok-nav-home">
            <img src="/logo.png" width={24} height={24} className="ok-nav-logo" alt="Logo" />
            <span>Pathuro</span>
          </Link>
        </div>
        <nav className="ok-nav-right">
          <ul>
            <li>
              <Link href="/" className="ok-nav-link">
                &larr; Back to Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="ok-main ok-fade-in" style={{ paddingTop: "120px" }}>
        <div className="support-layout">
          {/* Column 1: Contact Form */}
          <div className="ok-card">
            <h2 style={{ fontSize: "1.75em", marginBottom: "4px" }}>Submit Support Ticket</h2>
            <p style={{ marginBottom: "20px", fontSize: "0.9em" }}>Need help with matching? Have a course recommendation suggestion? Contact our support desk!</p>

            {!formSubmitted ? (
              <form onSubmit={handleSubmitTicket} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "4px", fontSize: "0.9em" }}>
                    Your Contact Email Address *
                  </label>
                  <input
                    type="email"
                    className="ok-input"
                    required
                    placeholder="e.g. cyril@pathuro.edu"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "4px", fontSize: "0.9em" }}>
                    Support Category
                  </label>
                  <select
                    className="ok-input"
                    style={{ cursor: "pointer" }}
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Suggest a Course">Suggest a Course / Degree</option>
                    <option value="Matching Engine Bug">Matching Engine Issue</option>
                    <option value="Account & Login Support">Account & Login Support</option>
                    <option value="General Feedback">General Feedback & Ideas</option>
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "4px", fontSize: "0.9em" }}>
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    className="ok-input"
                    required
                    placeholder="e.g. Request to add BS in Biotechnology"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "4px", fontSize: "0.9em" }}>
                    Support Message *
                  </label>
                  <textarea
                    className="ok-input"
                    required
                    style={{ minHeight: "120px", resize: "vertical", fontFamily: "inherit" }}
                    placeholder="Describe your issue or suggestions in detail here..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                  <button type="submit" className="ok-btn ok-btn-primary">
                    📤 Send Support Ticket
                  </button>
                </div>
              </form>
            ) : (
              <div 
                className="ok-fade-in" 
                style={{ 
                  textAlign: "center", 
                  padding: "40px 20px", 
                  background: "var(--success-light)", 
                  borderRadius: "16px",
                  border: "1px solid rgba(16, 185, 129, 0.2)"
                }}
              >
                <span style={{ fontSize: "3rem" }}>✉️</span>
                <h3 style={{ color: "var(--success)", margin: "16px 0 8px" }}>Ticket Received!</h3>
                <p style={{ color: "var(--success)", fontSize: "0.95em", maxWidth: "400px", margin: "0 auto 20px" }}>
                  Thank you! Your ticket has been logged successfully. Our administrators will review your suggestion and respond via email within 24 hours.
                </p>
                <button className="ok-btn ok-btn-primary" onClick={() => setFormSubmitted(false)}>
                  Submit Another Ticket
                </button>
              </div>
            )}
          </div>

          {/* Column 2: FAQ accordion */}
          <div className="ok-card">
            <h2 style={{ fontSize: "1.75em", marginBottom: "4px" }}>Frequently Asked Questions</h2>
            <p style={{ marginBottom: "20px", fontSize: "0.9em" }}>Quick self-help answers regarding matching mathematics, profile resets, and account capabilities.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {FAQS.map((faq, idx) => {
                const isExpanded = expandedFaqIdx === idx;
                return (
                  <div 
                    key={idx} 
                    style={{ 
                      border: "1px solid var(--card-border)", 
                      borderRadius: "12px", 
                      overflow: "hidden",
                      background: "#ffffff"
                    }}
                  >
                    <div 
                      onClick={() => setExpandedFaqIdx(isExpanded ? null : idx)}
                      style={{ 
                        padding: "16px", 
                        cursor: "pointer", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        fontWeight: 600,
                        fontSize: "0.95em",
                        background: isExpanded ? "#f8fafc" : "#ffffff",
                        userSelect: "none"
                      }}
                    >
                      <span>❓ {faq.q}</span>
                      <span style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: "#64748b" }}>▼</span>
                    </div>

                    {isExpanded && (
                      <div 
                        style={{ 
                          padding: "16px", 
                          background: "#f8fafc", 
                          borderTop: "1px solid #f1f5f9", 
                          fontSize: "0.85em",
                          lineHeight: "1.5",
                          color: "var(--text-muted)",
                          animation: "slideDown 0.2s ease-out"
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Copyright />

      <style jsx>{`
        .support-layout {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 30px;
          align-items: start;
        }
        @media (max-width: 968px) {
          .support-layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
}
