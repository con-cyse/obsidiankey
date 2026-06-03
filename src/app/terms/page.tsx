import React from "react";
import fs from "fs";
import path from "path";
import Link from "next/link";
import Copyright from "@/components/Copyright";

export default function TermsPage() {
  let termsText = "";
  
  try {
    const filePath = path.join(process.cwd(), "docs", "terms-of-service.txt");
    termsText = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    termsText = "Terms of Service content is temporarily unavailable. Please contact the administrator.";
  }

  // Helper to split text into readable paragraphs and sections
  const sections = termsText.split(/\n\s*\n/).filter(p => p.trim().length > 0);

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

      <main className="ok-main ok-fade-in" style={{ maxWidth: "800px", paddingTop: "120px" }}>
        <article className="ok-card" style={{ padding: "40px", lineHeight: "1.7" }}>
          <div style={{ borderBottom: "1px solid var(--card-border)", paddingBottom: "20px", marginBottom: "30px" }}>
            <span style={{ fontSize: "0.8em", background: "var(--primary-light)", color: "var(--primary)", padding: "4px 10px", borderRadius: "6px", fontWeight: "700" }}>
              LEGAL CONTRACT
            </span>
            <h1 style={{ fontSize: "2.5rem", marginTop: "8px", marginBottom: "4px" }}>Terms of Service</h1>
            <p style={{ margin: 0, fontSize: "0.95em", color: "var(--text-muted)" }}>Personalized Course Matching System (MVP)</p>
          </div>

          <div className="terms-content">
            {sections.map((section, index) => {
              const trimmed = section.trim();
              
              // Render titles as subheadings
              if (trimmed.startsWith("1.") || 
                  trimmed.startsWith("2.") || 
                  trimmed.startsWith("3.") || 
                  trimmed.startsWith("4.") || 
                  trimmed.startsWith("5.") || 
                  trimmed.startsWith("6.") || 
                  trimmed.startsWith("7.") || 
                  trimmed.startsWith("8.") || 
                  trimmed.startsWith("9.") || 
                  trimmed.startsWith("10.") || 
                  trimmed.startsWith("11.") || 
                  trimmed.startsWith("12.") || 
                  trimmed.startsWith("13.")) {
                return (
                  <h2 key={index} style={{ fontSize: "1.6rem", marginTop: "32px", marginBottom: "12px", borderBottom: "1px dashed var(--card-border)", paddingBottom: "6px" }}>
                    {trimmed}
                  </h2>
                );
              }

              // Render standard text
              return (
                <p key={index} style={{ marginBottom: "16px", color: "var(--text-main)" }}>
                  {trimmed}
                </p>
              );
            })}
          </div>
        </article>
      </main>

      <Copyright />
    </>
  );
}
