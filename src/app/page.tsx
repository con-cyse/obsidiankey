"use client";

import React, { useState, useEffect } from "react";
import { Course, DEFAULT_COURSES } from "@/data/courses";
import NavBar from "@/components/NavBar";
import Copyright from "@/components/Copyright";
import Cookies from "@/components/Cookies";
import Quiz from "@/components/Quiz";
import Matcher from "@/components/Matcher";
import AdminPanel from "@/components/AdminPanel";

export default function HomePage() {
  // Session state is optional; the page works without cookies.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [userLevel, setUserLevel] = useState(1);

  // Tab State
  const [activeTab, setActiveTab] = useState("dashboard");

  // Course Database State
  const [courses, setCourses] = useState<Course[]>([]);

  // Selection/Profile States (Strengths, Hobbies, Wanted Work)
  const [strengths, setStrengths] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [workPreferences, setWorkPreferences] = useState<string[]>([]);
  const [studyStyle, setStudyStyle] = useState("Hands-on / Practical");
  const [userEmail, setUserEmail] = useState("");

  // Saved Bookmarked Matches State (courseId -> notes)
  const [savedMatches, setSavedMatches] = useState<Record<string, string>>({});

  // Accordion details active course ID
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Profile status update alerts
  const [profileAlert, setProfileAlert] = useState("");

  // Load Session Cookies & Local Storage on mount
  useEffect(() => {
    const cookies = document.cookie;
    const userMatch = cookies.match(/(^| )username=([^;]+)/);
    const nameMatch = cookies.match(/(^| )fullName=([^;]+)/);
    const levelMatch = cookies.match(/(^| )userLevel=([^;]+)/);

    setUsername(userMatch ? decodeURIComponent(userMatch[2]) : "guest");
    setFullName(nameMatch ? decodeURIComponent(nameMatch[2]) : "Guest User");
    setUserLevel(levelMatch ? Number(levelMatch[2]) : 0);
    setIsAuthenticated(true);
    setIsLoadingAuth(false);
  }, []);

  // Load Courses and Bookmarks from localStorage on mount after auth succeeds
  useEffect(() => {
    if (!isAuthenticated) return;

    // Load custom courses
    const storedCourses = localStorage.getItem("ok_custom_courses");
    if (storedCourses) {
      try {
        setCourses(JSON.parse(storedCourses));
      } catch (e) {
        setCourses(DEFAULT_COURSES);
      }
    } else {
      setCourses(DEFAULT_COURSES);
      localStorage.setItem("ok_custom_courses", JSON.stringify(DEFAULT_COURSES));
    }

    // Load saved bookmarks
    const storedSaved = localStorage.getItem("ok_saved_matches");
    if (storedSaved) {
      try {
        setSavedMatches(JSON.parse(storedSaved));
      } catch (e) {
        setSavedMatches({});
      }
    }

    // Load user profile preferences
    const storedEmail = localStorage.getItem(`ok_profile_email_${username}`);
    const storedStyle = localStorage.getItem(`ok_profile_style_${username}`);
    const storedTraits = localStorage.getItem(`ok_profile_traits_${username}`);

    if (storedEmail) setUserEmail(storedEmail);
    if (storedStyle) setStudyStyle(storedStyle);
    if (storedTraits) {
      try {
        const parsed = JSON.parse(storedTraits);
        setStrengths(parsed.strengths || []);
        setHobbies(parsed.hobbies || []);
        setWorkPreferences(parsed.workPreferences || []);
      } catch (e) {
        // use empty arrays
      }
    }
  }, [isAuthenticated, username]);

  // Save profile to localStorage helper
  const saveTraitsToLocalStorage = (s: string[], h: string[], w: string[]) => {
    localStorage.setItem(
      `ok_profile_traits_${username}`,
      JSON.stringify({ strengths: s, hobbies: h, workPreferences: w })
    );
  };

  // Trait toggle managers
  const handleToggleStrength = (id: string) => {
    const next = strengths.includes(id) ? strengths.filter(x => x !== id) : [...strengths, id];
    setStrengths(next);
    saveTraitsToLocalStorage(next, hobbies, workPreferences);
  };

  const handleToggleHobby = (id: string) => {
    const next = hobbies.includes(id) ? hobbies.filter(x => x !== id) : [...hobbies, id];
    setHobbies(next);
    saveTraitsToLocalStorage(strengths, next, workPreferences);
  };

  const handleToggleWork = (id: string) => {
    const next = workPreferences.includes(id) ? workPreferences.filter(x => x !== id) : [...workPreferences, id];
    setWorkPreferences(next);
    saveTraitsToLocalStorage(strengths, hobbies, next);
  };

  const handleClearAllTraits = () => {
    setStrengths([]);
    setHobbies([]);
    setWorkPreferences([]);
    saveTraitsToLocalStorage([], [], []);
  };

  // Quiz Complete Handler
  const handleQuizComplete = (selections: {
    strengths: string[];
    hobbies: string[];
    workPreferences: string[];
  }) => {
    setStrengths(selections.strengths);
    setHobbies(selections.hobbies);
    setWorkPreferences(selections.workPreferences);
    saveTraitsToLocalStorage(selections.strengths, selections.hobbies, selections.workPreferences);
    setActiveTab("matcher"); // switch tab to show matches
  };

  // Bookmark Toggle
  const handleToggleBookmark = (courseId: string) => {
    const next = { ...savedMatches };
    if (courseId in next) {
      delete next[courseId];
    } else {
      next[courseId] = ""; // initialize empty note
    }
    setSavedMatches(next);
    localStorage.setItem("ok_saved_matches", JSON.stringify(next));
  };

  // Update Bookmark Note
  const handleUpdateBookmarkNote = (courseId: string, note: string) => {
    const next = { ...savedMatches, [courseId]: note };
    setSavedMatches(next);
    localStorage.setItem("ok_saved_matches", JSON.stringify(next));
  };

  // CRUD Admins course management operations
  const handleAddCourse = (newCourse: Course) => {
    const next = [newCourse, ...courses];
    setCourses(next);
    localStorage.setItem("ok_custom_courses", JSON.stringify(next));
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    const next = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    setCourses(next);
    localStorage.setItem("ok_custom_courses", JSON.stringify(next));
  };

  const handleDeleteCourse = (id: string) => {
    const next = courses.filter((c) => c.id !== id);
    setCourses(next);
    localStorage.setItem("ok_custom_courses", JSON.stringify(next));
    
    // Also delete any existing bookmarks for it
    if (id in savedMatches) {
      const nextSaved = { ...savedMatches };
      delete nextSaved[id];
      setSavedMatches(nextSaved);
      localStorage.setItem("ok_saved_matches", JSON.stringify(nextSaved));
    }
  };

  // Update profile details
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(`ok_profile_email_${username}`, userEmail);
    localStorage.setItem(`ok_profile_style_${username}`, studyStyle);
    setProfileAlert("✓ Profile settings updated successfully!");
    setTimeout(() => setProfileAlert(""), 3000);
  };

  // Logout trigger
  const handleLogout = () => {
    // Delete authentication cookies
    document.cookie = "username=; path=/; max-age=0; SameSite=None; Secure";
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=None; Secure";
    document.cookie = "userLevel=; path=/; max-age=0; SameSite=None; Secure";
    document.cookie = "fullName=; path=/; max-age=0; SameSite=None; Secure";
    setActiveTab("dashboard");
    setUsername("guest");
    setFullName("Guest User");
    setUserLevel(0);
  };

  // CORE MATCHING ENGINE MATH LOGIC
  const calculateMatches = () => {
    const activeFiltersCount = strengths.length + hobbies.length + workPreferences.length;

    return courses.map((course) => {
      if (activeFiltersCount === 0) {
        return { course, score: 0, matchedStrengths: [], matchedHobbies: [], matchedWork: [] };
      }

      const matchedStrengths = course.strengths.filter((s) => strengths.includes(s));
      const matchedHobbies = course.hobbies.filter((h) => hobbies.includes(h));
      const matchedWork = course.workPreferences.filter((w) => workPreferences.includes(w));

      const matchedCriteriaCount = matchedStrengths.length + matchedHobbies.length + matchedWork.length;
      
      // Calculate basic percentage
      let score = Math.round((matchedCriteriaCount / activeFiltersCount) * 100);

      // Boost score if we matched traits in multiple dimensions (high cohesion boost)
      let dimensionsMatched = 0;
      if (matchedStrengths.length > 0) dimensionsMatched++;
      if (matchedHobbies.length > 0) dimensionsMatched++;
      if (matchedWork.length > 0) dimensionsMatched++;

      if (dimensionsMatched === 3) score = Math.min(100, score + 10); // multi-discipline synergy boost
      else if (dimensionsMatched === 2) score = Math.min(100, score + 5);

      return {
        course,
        score,
        matchedStrengths,
        matchedHobbies,
        matchedWork,
      };
    });
  };

  const allMatches = calculateMatches();
  
  // Sort courses: if any trait selected, order by match score % descending and filter out 0% matches
  const sortedMatches = strengths.length + hobbies.length + workPreferences.length > 0
    ? allMatches
        .filter(m => m.score > 0)
        .sort((a, b) => b.score - a.score)
    : allMatches.map(m => ({ ...m, score: 0 })); // show all with 0% if nothing is toggled

  const bookmarkedCourses = courses.filter((c) => c.id in savedMatches);

  if (isLoadingAuth) {
    return (
      <div 
        style={{ 
          height: "100vh", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          background: "var(--bg-main)",
          color: "var(--primary)"
        }}
      >
        <div className="spinner"></div>
        <p style={{ marginTop: "16px", fontWeight: "600", fontSize: "1.1rem" }}>Loading your workspace...</p>
        <style jsx>{`
          .spinner {
            border: 4px solid rgba(79, 70, 229, 0.1);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border-left-color: var(--primary);
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <NavBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userLevel={userLevel}
        fullName={fullName}
        onLogout={handleLogout}
      />

      <main className="ok-main">
        {/* Dynamic Section Rendering based on activeTab state */}

        {/* 1. DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="ok-fade-in" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Elegant Premium Welcome Banner */}
            <div className="dashboard-welcome-banner">
              <div className="banner-details">
                <span className="banner-badge">💎 personalized recommendations</span>
                <h1 className="banner-title">Welcome back, {fullName}!</h1>
                <p className="banner-subtitle">
                  Discover degrees and academic pathways tailored to your unique psychological strengths, leisure hobbies, and career goals.
                </p>
                <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                  <button className="ok-btn ok-btn-primary" onClick={() => setActiveTab("quiz")}>
                    ⚡ Take Quiz Assessment
                  </button>
                  <button className="ok-btn ok-btn-secondary" onClick={() => setActiveTab("matcher")} style={{ background: "rgba(255,255,255,0.2)", color: "#ffffff", borderColor: "rgba(255,255,255,0.4)" }}>
                    🎯 Explore Matcher
                  </button>
                </div>
              </div>
              <div className="banner-avatar">🔮</div>
            </div>

            {/* Profile Completeness & Quick Stats Grid */}
            <div className="dashboard-grid">
              <div className="ok-card flex-card">
                <h3>📊 Matching Diagnostics</h3>
                <p style={{ fontSize: "0.9em", marginBottom: "20px" }}>Your current matching filter configuration. Keep adjusting to refine course scores!</p>
                
                <div className="stat-circle-row">
                  <div className="stat-box">
                    <span className="stat-num color-indigo">{strengths.length}</span>
                    <span className="stat-lbl">Strengths</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-num color-teal">{hobbies.length}</span>
                    <span className="stat-lbl">Hobbies</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-num color-pink">{workPreferences.length}</span>
                    <span className="stat-lbl">Work Prefs</span>
                  </div>
                </div>

                <div style={{ marginTop: "20px", borderTop: "1px solid var(--card-border)", paddingTop: "16px" }}>
                  <p style={{ margin: 0, fontSize: "0.9em", display: "flex", justifyContent: "space-between" }}>
                    <span>Profile Trait Completion:</span>
                    <strong>{Math.min(100, Math.round(((strengths.length + hobbies.length + workPreferences.length) / 10) * 100))}%</strong>
                  </p>
                </div>
              </div>

              <div className="ok-card flex-card">
                <h3>⭐ Saved Bookmarks</h3>
                <p style={{ fontSize: "0.9em", marginBottom: "16px" }}>Quick look at your favorite degrees. Review notes or browse matched curriculums.</p>
                
                {bookmarkedCourses.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {bookmarkedCourses.slice(0, 3).map(c => (
                      <div 
                        key={c.id} 
                        className="bookmark-shortcut"
                        onClick={() => {
                          setActiveTab("saved");
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: "0.9em" }}>{c.title}</span>
                        <span style={{ fontSize: "0.75em", color: "var(--primary)" }}>view notes &rarr;</span>
                      </div>
                    ))}
                    {bookmarkedCourses.length > 3 && (
                      <span 
                        style={{ alignSelf: "flex-end", fontSize: "0.85em", color: "var(--primary)", fontWeight: "600", cursor: "pointer" }}
                        onClick={() => setActiveTab("saved")}
                      >
                        And {bookmarkedCourses.length - 3} more...
                      </span>
                    )}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", padding: "20px 0", color: "#94a3b8" }}>
                    <span style={{ fontSize: "2rem" }}>📂</span>
                    <p style={{ margin: "8px 0 0", fontSize: "0.85em" }}>No courses bookmarked yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Walkthrough Accordion */}
            <div className="ok-card" style={{ padding: "24px" }}>
              <h3>🔍 How Pathuro Works</h3>
              <div className="instructions-steps" style={{ marginTop: "16px" }}>
                <div className="instr-step">
                  <div className="step-badge">1</div>
                  <div className="step-text">
                    <strong>State Your Traits:</strong> Head to the <strong>Assessment Quiz</strong> or manual <strong>Course Matcher</strong> to input your psychological strengths, free-time hobbies, and wanted work.
                  </div>
                </div>
                <div className="instr-step">
                  <div className="step-badge">2</div>
                  <div className="step-text">
                    <strong>Interactive Scoring:</strong> Our matching math calculates an intersection percentage, showing you the exact alignment breakdown for each program.
                  </div>
                </div>
                <div className="instr-step">
                  <div className="step-badge">3</div>
                  <div className="step-text">
                    <strong>Save & Plan:</strong> Bookmark degrees of interest, add customized annotations and notes, and manage program parameters to perfect your academic journey!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. ASSESSMENT QUIZ */}
        {activeTab === "quiz" && (
          <div className="ok-fade-in">
            <Quiz onComplete={handleQuizComplete} />
          </div>
        )}

        {/* 3. DYNAMIC COURSE MATCHER */}
        {activeTab === "matcher" && (
          <div className="ok-fade-in" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {/* Tag Selection Board */}
            <Matcher
              strengths={strengths}
              hobbies={hobbies}
              workPreferences={workPreferences}
              onToggleStrength={handleToggleStrength}
              onToggleHobby={handleToggleHobby}
              onToggleWork={handleToggleWork}
              onClearAll={handleClearAllTraits}
            />

            {/* Recommended Matches List */}
            <div className="ok-card" style={{ padding: "28px" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>🎯 Matched Recommendations</span>
                <span style={{ fontSize: "0.6em", background: "#f1f5f9", padding: "6px 12px", borderRadius: "8px", color: "var(--text-muted)", fontWeight: "normal" }}>
                  Showing {sortedMatches.length} results
                </span>
              </h3>

              {sortedMatches.length > 0 ? (
                <div className="course-list">
                  {sortedMatches.map(({ course, score, matchedStrengths, matchedHobbies, matchedWork }) => {
                    const isExpanded = expandedCourseId === course.id;
                    const isSaved = course.id in savedMatches;

                    return (
                      <div key={course.id} className="ok-course-card">
                        <div 
                          className="ok-course-card-header"
                          onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                        >
                          <div>
                            <span className="course-cat-label">{course.category}</span>
                            <h4 style={{ fontSize: "1.3em", margin: "4px 0" }}>{course.title}</h4>
                            <div style={{ display: "flex", gap: "12px", fontSize: "0.8em", color: "var(--text-muted)" }}>
                              <span>⏱️ {course.duration}</span>
                              <span>💰 {course.salary}</span>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            {/* Match Percentage Display */}
                            {strengths.length + hobbies.length + workPreferences.length > 0 ? (
                              <div className="match-score-badge">
                                <span className="score-num">{score}%</span>
                                <span className="score-lbl">Match</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: "0.8em", color: "#94a3b8" }}>Ready</span>
                            )}

                            {/* Bookmark Star */}
                            <button 
                              className={`bookmark-btn ${isSaved ? "saved" : ""}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleBookmark(course.id);
                              }}
                              aria-label={isSaved ? "Remove bookmark" : "Add bookmark"}
                            >
                              {isSaved ? "★" : "☆"}
                            </button>

                            <span style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: "#64748b" }}>▼</span>
                          </div>
                        </div>

                        {/* Accordion Expand Body */}
                        {isExpanded && (
                          <div className="ok-course-card-body">
                            <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "0.95em" }}>{course.description}</p>
                            
                            {/* Why it matches breakdown */}
                            {(matchedStrengths.length > 0 || matchedHobbies.length > 0 || matchedWork.length > 0) && (
                              <div className="match-explanation">
                                <strong>🔮 Alignment Analysis:</strong>
                                <ul style={{ paddingLeft: "16px", fontSize: "0.85em", marginTop: "4px" }}>
                                  {matchedStrengths.length > 0 && (
                                    <li>Matches your strength in: <span className="highlight-tag">{matchedStrengths.join(", ")}</span></li>
                                  )}
                                  {matchedHobbies.length > 0 && (
                                    <li>Matches your leisure interest in: <span className="highlight-tag">{matchedHobbies.join(", ")}</span></li>
                                  )}
                                  {matchedWork.length > 0 && (
                                    <li>Matches your wanted career path: <span className="highlight-tag">{matchedWork.join(", ")}</span></li>
                                  )}
                                </ul>
                              </div>
                            )}

                            <div className="course-spec-grid" style={{ marginTop: "16px" }}>
                              <div>
                                <strong>📚 Core Subjects:</strong>
                                <ul style={{ paddingLeft: "16px", fontSize: "0.85em", marginTop: "6px" }}>
                                  {course.curriculum.map((sub, idx) => (
                                    <li key={idx}>{sub}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <strong>🚀 Career Outlets:</strong>
                                <ul style={{ paddingLeft: "16px", fontSize: "0.85em", marginTop: "6px" }}>
                                  {course.careers.map((car, idx) => (
                                    <li key={idx}>{car}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
                  <span style={{ fontSize: "3rem" }}>🧩</span>
                  <h4 style={{ margin: "16px 0 6px" }}>No Matches Found</h4>
                  <p style={{ fontSize: "0.9em", maxWidth: "450px", margin: "0 auto" }}>
                    We couldn't find any courses matching your selected tags. Try selecting more strengths or hobbies, or reset and take the Quiz Assessment!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. BROWSE ALL COURSES DIRECTORY */}
        {activeTab === "courses" && (
          <div className="ok-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="ok-card" style={{ padding: "28px" }}>
              <h2 style={{ fontSize: "1.75em", marginBottom: "4px" }}>Degree & Course Directory</h2>
              <p style={{ marginBottom: "20px" }}>Browse the full academic options catalog. Search by program name, salary outputs, or curriculum subjects.</p>
              
              <div className="course-list">
                {courses.map((course) => {
                  const isExpanded = expandedCourseId === course.id;
                  const isSaved = course.id in savedMatches;

                  return (
                    <div key={course.id} className="ok-course-card">
                      <div 
                        className="ok-course-card-header"
                        onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                      >
                        <div>
                          <span className="course-cat-label">{course.category}</span>
                          <h4 style={{ fontSize: "1.3em", margin: "4px 0" }}>{course.title}</h4>
                          <div style={{ display: "flex", gap: "12px", fontSize: "0.8em", color: "var(--text-muted)" }}>
                            <span>⏱️ {course.duration}</span>
                            <span>💰 {course.salary}</span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <button 
                            className={`bookmark-btn ${isSaved ? "saved" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBookmark(course.id);
                            }}
                          >
                            {isSaved ? "★" : "☆"}
                          </button>
                          <span style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", color: "#64748b" }}>▼</span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="ok-course-card-body">
                          <p style={{ marginTop: "10px", fontStyle: "italic", fontSize: "0.95em" }}>{course.description}</p>

                          <div 
                            style={{ 
                              marginTop: "12px", 
                              padding: "10px", 
                              background: "#ffffff", 
                              borderRadius: "8px", 
                              fontSize: "0.8em",
                              border: "1px solid var(--card-border)"
                            }}
                          >
                            🏷️ <strong>Criteria Tags:</strong>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                              {course.strengths.map(s => <span key={s} className="mini-tag strength">{s}</span>)}
                              {course.hobbies.map(h => <span key={h} className="mini-tag hobby">{h}</span>)}
                              {course.workPreferences.map(w => <span key={w} className="mini-tag work">{w}</span>)}
                            </div>
                          </div>

                          <div className="course-spec-grid" style={{ marginTop: "16px" }}>
                            <div>
                              <strong>📚 Curriculum:</strong>
                              <ul style={{ paddingLeft: "16px", fontSize: "0.85em", marginTop: "6px" }}>
                                {course.curriculum.map((sub, idx) => (
                                  <li key={idx}>{sub}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <strong>🚀 Careers:</strong>
                              <ul style={{ paddingLeft: "16px", fontSize: "0.85em", marginTop: "6px" }}>
                                {course.careers.map((car, idx) => (
                                  <li key={idx}>{car}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5. SAVED MATCHES & NOTES */}
        {activeTab === "saved" && (
          <div className="ok-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div className="ok-card" style={{ padding: "28px" }}>
              <h2 style={{ fontSize: "1.75em", marginBottom: "4px" }}>Saved Academic Pathways</h2>
              <p style={{ marginBottom: "20px" }}>Review programs you have bookmarked. Write custom planning notes or keep logs of potential universities.</p>

              {bookmarkedCourses.length > 0 ? (
                <div className="course-list">
                  {bookmarkedCourses.map((course) => {
                    const noteValue = savedMatches[course.id] || "";
                    return (
                      <div key={course.id} className="saved-course-row ok-course-card" style={{ cursor: "default" }}>
                        <div style={{ padding: "20px", borderBottom: "1px solid #f1f5f9" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                              <span className="course-cat-label">{course.category}</span>
                              <h4 style={{ fontSize: "1.3em", margin: "4px 0" }}>{course.title}</h4>
                              <div style={{ display: "flex", gap: "12px", fontSize: "0.8em", color: "var(--text-muted)" }}>
                                <span>⏱️ {course.duration}</span>
                                <span>💰 {course.salary}</span>
                              </div>
                            </div>
                            <button 
                              className="ok-btn ok-btn-danger"
                              onClick={() => handleToggleBookmark(course.id)}
                              style={{ padding: "6px 12px", fontSize: "0.8em" }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Annotation Notes Section */}
                        <div style={{ padding: "20px", background: "#f8fafc" }}>
                          <label style={{ display: "block", fontSize: "0.85em", fontWeight: 700, color: "#334155", marginBottom: "6px" }}>
                            ✍️ Custom Planning Notes & Reflection:
                          </label>
                          <textarea
                            className="ok-input"
                            style={{ minHeight: "80px", resize: "vertical", fontFamily: "inherit", fontSize: "0.9em" }}
                            placeholder="Type notes here (e.g. University options, scholarships available, prerequisite subjects, etc.)..."
                            value={noteValue}
                            onChange={(e) => handleUpdateBookmarkNote(course.id, e.target.value)}
                          />
                          <span style={{ fontSize: "0.75em", color: "#94a3b8", display: "block", marginTop: "4px", textAlign: "right" }}>
                            💾 Saves automatically in your browser profile.
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
                  <span style={{ fontSize: "3.5rem" }}>📂</span>
                  <h4 style={{ margin: "16px 0 6px" }}>No Bookmarked Courses</h4>
                  <p style={{ fontSize: "0.9em", maxWidth: "450px", margin: "0 auto", marginBottom: "20px" }}>
                    You haven't bookmarked any degrees yet. Head to the recommendations list and click the star icon to save!
                  </p>
                  <button className="ok-btn ok-btn-primary" onClick={() => setActiveTab("matcher")}>
                    Find Matched Recommendations
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. PROFILE SETTINGS */}
        {activeTab === "profile" && (
          <div className="ok-fade-in" style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div className="ok-card" style={{ padding: "28px" }}>
              <h2 style={{ fontSize: "1.75em", marginBottom: "4px", borderBottom: "1px solid var(--card-border)", paddingBottom: "16px" }}>
                👤 Your Student Profile
              </h2>

              <form onSubmit={handleSaveProfile} style={{ marginTop: "20px" }}>
                {profileAlert && (
                  <div 
                    style={{ 
                      padding: "12px", 
                      background: "var(--success-light)", 
                      color: "var(--success)", 
                      borderRadius: "8px", 
                      fontSize: "0.9em", 
                      fontWeight: 600,
                      marginBottom: "16px",
                      border: "1px solid rgba(16, 185, 129, 0.2)"
                    }}
                  >
                    {profileAlert}
                  </div>
                )}

                <div style={{ marginBottom: "16px" }}>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "6px" }}>Full Name</label>
                  <input
                    type="text"
                    className="ok-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "6px" }}>Contact Email Address</label>
                  <input
                    type="email"
                    className="ok-input"
                    placeholder="e.g. cyril@pathuro.edu"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label className="form-label" style={{ fontWeight: 700, display: "block", marginBottom: "6px" }}>Preferred Study Method</label>
                  <select
                    className="ok-input"
                    style={{ cursor: "pointer" }}
                    value={studyStyle}
                    onChange={(e) => setStudyStyle(e.target.value)}
                  >
                    <option value="Hands-on / Practical">Hands-on / Practical (Labs, Studios, Workshops)</option>
                    <option value="Conceptual / Theoretical">Conceptual / Theoretical (Mathematics, Philosophy, Research)</option>
                    <option value="Humanitarian / Clinical">Humanitarian / Clinical (Patient care, counseling, mentoring)</option>
                    <option value="Managerial / Strategic">Managerial / Strategic (Business organization, entrepreneurship)</option>
                  </select>
                </div>

                <div 
                  style={{ 
                    padding: "16px", 
                    background: "#f8fafc", 
                    borderRadius: "12px", 
                    border: "1px solid var(--card-border)",
                    marginBottom: "24px"
                  }}
                >
                  <strong>🔑 Credentials Summary:</strong>
                  <ul style={{ paddingLeft: "16px", fontSize: "0.85em", marginTop: "4px", color: "var(--text-muted)" }}>
                    <li>Username: <strong>{username}</strong></li>
                    <li>Security Level: <strong>Level {userLevel} ({userLevel >= 2 ? "Administrator" : "Student"})</strong></li>
                  </ul>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button type="submit" className="ok-btn ok-btn-primary">
                    💾 Save Profile Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 7. ADMIN DASHBOARD */}
        {activeTab === "admin" && userLevel >= 2 && (
          <div className="ok-fade-in">
            <AdminPanel
              courses={courses}
              onAddCourse={handleAddCourse}
              onUpdateCourse={handleUpdateCourse}
              onDeleteCourse={handleDeleteCourse}
            />
          </div>
        )}
      </main>

      <Cookies />
      <Copyright />

      {/* Embedded page-specific styled components */}
      <style jsx global>{`
        /* Welcome Banner style */
        .dashboard-welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
          border-radius: 20px;
          padding: 36px 40px;
          color: #ffffff;
          box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.3);
          position: relative;
          overflow: hidden;
        }
        .dashboard-welcome-banner::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
          right: -50px;
          top: -50px;
          z-index: 0;
        }
        .banner-details {
          max-width: 60%;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .banner-badge {
          background: rgba(255, 255, 255, 0.15);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.75em;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .banner-title {
          font-size: 2.25rem;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 8px;
        }
        .banner-subtitle {
          color: #e2e8f0;
          font-size: 1rem;
          line-height: 1.4;
          margin-bottom: 20px;
        }
        .banner-avatar {
          font-size: 5rem;
          user-select: none;
          z-index: 1;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }

        /* Dashboard Stat layout */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .flex-card {
          display: flex;
          flex-direction: column;
        }
        .stat-circle-row {
          display: flex;
          justify-content: space-around;
          margin-top: 16px;
          gap: 12px;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #f8fafc;
          padding: 16px;
          border-radius: 16px;
          min-width: 90px;
          border: 1px solid var(--card-border);
        }
        .stat-num {
          font-size: 2rem;
          font-weight: 800;
        }
        .stat-num.color-indigo { color: var(--primary); }
        .stat-num.color-teal { color: var(--success); }
        .stat-num.color-pink { color: #ec4899; }
        .stat-lbl {
          font-size: 0.75em;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .bookmark-shortcut {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8fafc;
          border-radius: 10px;
          border: 1px solid var(--card-border);
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .bookmark-shortcut:hover {
          background: var(--primary-light);
          border-color: rgba(79, 70, 229, 0.2);
        }

        /* Dynamic matching explanation style */
        .match-explanation {
          background: var(--primary-light);
          padding: 12px 16px;
          border-radius: 10px;
          color: var(--primary);
          margin-top: 12px;
          border: 1px solid rgba(79, 70, 229, 0.1);
        }
        .highlight-tag {
          font-weight: 700;
          background: rgba(255, 255, 255, 0.85);
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: 2px;
          text-transform: capitalize;
          display: inline-block;
        }

        /* Matched tags tags indicators */
        .mini-tag {
          font-size: 0.7em;
          padding: 2px 8px;
          border-radius: 6px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .mini-tag.strength { background: #fee2e2; color: #b91c1c; }
        .mini-tag.hobby { background: #d1fae5; color: #047857; }
        .mini-tag.work { background: #e0e7ff; color: #4338ca; }

        /* General layout additions */
        .course-cat-label {
          background: #f1f5f9;
          color: #475569;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.75em;
          font-weight: 700;
          text-transform: uppercase;
        }
        .bookmark-btn {
          border: 0;
          background: transparent;
          font-size: 1.5rem;
          cursor: pointer;
          color: #cbd5e1;
          transition: var(--transition-smooth);
          line-height: 1;
        }
        .bookmark-btn:hover {
          color: #f59e0b;
          transform: scale(1.1);
        }
        .bookmark-btn.saved {
          color: #f59e0b;
        }
        .match-score-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: linear-gradient(135deg, var(--success) 0%, #059669 100%);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 10px;
          min-width: 60px;
          box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
        }
        .score-num {
          font-size: 1.1rem;
          font-weight: 800;
          line-height: 1;
        }
        .score-lbl {
          font-size: 0.6em;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .course-spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .instructions-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .instr-step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .step-badge {
          background: var(--primary-light);
          color: var(--primary);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9em;
          flex-shrink: 0;
        }
        .step-text {
          font-size: 0.9em;
          color: var(--text-muted);
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .dashboard-welcome-banner {
            padding: 24px 20px;
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
          .banner-details {
            max-width: 100%;
            align-items: center;
          }
          .banner-title {
            font-size: 1.6rem;
          }
          .banner-subtitle {
            font-size: 0.85rem;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .stat-circle-row {
            flex-wrap: wrap;
          }
          .course-spec-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
}
