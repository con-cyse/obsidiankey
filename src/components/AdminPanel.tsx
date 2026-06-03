"use client";

import React, { useState } from "react";
import { Course } from "@/data/courses";

interface AdminPanelProps {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onUpdateCourse: (course: Course) => void;
  onDeleteCourse: (id: string) => void;
}

export default function AdminPanel({
  courses,
  onAddCourse,
  onUpdateCourse,
  onDeleteCourse,
}: AdminPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // Form States
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState("Engineering & Technology");
  const [formDescription, setFormDescription] = useState("");
  const [formSalary, setFormSalary] = useState("$60,000 - $90,000");
  const [formDuration, setFormDuration] = useState("4 Years");
  const [formCurriculum, setFormCurriculum] = useState("");
  const [formCareers, setFormCareers] = useState("");

  const [formStrengths, setFormStrengths] = useState<string[]>([]);
  const [formHobbies, setFormHobbies] = useState<string[]>([]);
  const [formWork, setFormWork] = useState<string[]>([]);

  // Selection definitions
  const STRENGTHS = ["analytical", "creative", "communication", "leadership", "empathy", "technical", "science", "problem-solving", "logical"];
  const HOBBIES = ["coding", "gaming", "drawing", "writing", "building", "sports", "music", "volunteering", "investing", "reading", "cooking"];
  const WORK_PREFS = ["building software", "helping people", "designing visuals", "managing business", "analyzing data", "scientific research", "teaching", "creating content", "diagnosing health", "planning structures"];

  const handleToggle = (id: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(id)) {
      setList(list.filter((x) => x !== id));
    } else {
      setList([...list, id]);
    }
  };

  const handleResetForm = () => {
    setFormTitle("");
    setFormCategory("Engineering & Technology");
    setFormDescription("");
    setFormSalary("$60,000 - $90,000");
    setFormDuration("4 Years");
    setFormCurriculum("");
    setFormCareers("");
    setFormStrengths([]);
    setFormHobbies([]);
    setFormWork([]);
    setEditId(null);
    setIsEditing(false);
  };

  const handleStartAdd = () => {
    handleResetForm();
    setIsEditing(true);
  };

  const handleStartEdit = (course: Course) => {
    setEditId(course.id);
    setFormTitle(course.title);
    setFormCategory(course.category);
    setFormDescription(course.description);
    setFormSalary(course.salary);
    setFormDuration(course.duration);
    setFormCurriculum(course.curriculum.join(", "));
    setFormCareers(course.careers.join(", "));
    setFormStrengths(course.strengths);
    setFormHobbies(course.hobbies);
    setFormWork(course.workPreferences);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formTitle.trim() || !formDescription.trim()) {
      alert("Title and Description are required!");
      return;
    }

    const curriculumArray = formCurriculum
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const careersArray = formCareers
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const courseData: Course = {
      id: editId || `custom-${Date.now()}`,
      title: formTitle,
      category: formCategory,
      description: formDescription,
      salary: formSalary,
      duration: formDuration,
      curriculum: curriculumArray.length > 0 ? curriculumArray : ["General Foundations"],
      careers: careersArray.length > 0 ? careersArray : ["Industry Professional"],
      strengths: formStrengths,
      hobbies: formHobbies,
      workPreferences: formWork,
    };

    if (editId) {
      onUpdateCourse(courseData);
    } else {
      onAddCourse(courseData);
    }

    handleResetForm();
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you absolutely sure you want to delete the course "${title}"?`)) {
      onDeleteCourse(id);
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ok-fade-in">
      {!isEditing ? (
        <div className="ok-card" style={{ padding: "28px" }}>
          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              marginBottom: "24px",
              borderBottom: "1px solid var(--card-border)",
              paddingBottom: "16px",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.75em", marginBottom: "4px" }}>Admin Course Management</h2>
              <p style={{ margin: 0, fontSize: "0.9em" }}>Add, edit, or delete degrees and courses in the matching database. Changes persist locally.</p>
            </div>
            <button className="ok-btn ok-btn-primary" onClick={handleStartAdd}>
              ➕ Add New Course
            </button>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              className="ok-input"
              placeholder="🔍 Search courses by title or discipline..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Degree / Course Title</th>
                  <th>Discipline Category</th>
                  <th>Salary Range</th>
                  <th>Duration</th>
                  <th>Mapping Params</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600 }}>{c.title}</td>
                      <td>
                        <span className="admin-cat-badge">{c.category}</span>
                      </td>
                      <td>{c.salary}</td>
                      <td>{c.duration}</td>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "0.75em" }}>
                          <span>💪 {c.strengths.length} strengths</span>
                          <span>🎨 {c.hobbies.length} hobbies</span>
                          <span>💼 {c.workPreferences.length} careers</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                          <button
                            className="ok-btn ok-btn-secondary"
                            onClick={() => handleStartEdit(c)}
                            style={{ padding: "6px 12px", fontSize: "0.8em" }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className="ok-btn ok-btn-danger"
                            onClick={() => handleDelete(c.id, c.title)}
                            style={{ padding: "6px 12px", fontSize: "0.8em" }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                      No courses found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="ok-card" style={{ padding: "28px" }}>
          <h2 style={{ fontSize: "1.75em", marginBottom: "4px", borderBottom: "1px solid var(--card-border)", paddingBottom: "16px" }}>
            {editId ? "✏️ Edit Course Profile" : "➕ Add New Course to Matcher"}
          </h2>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Degree Title *</label>
                <input
                  type="text"
                  className="ok-input"
                  required
                  placeholder="e.g. Bachelor of Science in Data Science"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Discipline Category</label>
                <select
                  className="ok-input"
                  style={{ cursor: "pointer" }}
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  <option value="Engineering & Technology">Engineering & Technology</option>
                  <option value="Business & Finance">Business & Finance</option>
                  <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
                  <option value="Health & Medical">Health & Medical</option>
                  <option value="Creative Arts">Creative Arts</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label className="form-label">Description *</label>
                <textarea
                  className="ok-input"
                  style={{ minHeight: "80px", resize: "vertical", fontFamily: "inherit" }}
                  required
                  placeholder="Provide an overview of the course goals and details..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Average Starting Salary Range</label>
                <input
                  type="text"
                  className="ok-input"
                  placeholder="e.g. $65,000 - $100,000"
                  value={formSalary}
                  onChange={(e) => setFormSalary(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Duration of Program</label>
                <input
                  type="text"
                  className="ok-input"
                  placeholder="e.g. 4 Years"
                  value={formDuration}
                  onChange={(e) => setFormDuration(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label className="form-label">Core Curriculum Subjects (comma-separated)</label>
                <input
                  type="text"
                  className="ok-input"
                  placeholder="Subject A, Subject B, Subject C"
                  value={formCurriculum}
                  onChange={(e) => setFormCurriculum(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ gridColumn: "span 2" }}>
                <label className="form-label">Potential Careers (comma-separated)</label>
                <input
                  type="text"
                  className="ok-input"
                  placeholder="Career A, Career B, Career C"
                  value={formCareers}
                  onChange={(e) => setFormCareers(e.target.value)}
                />
              </div>
            </div>

            {/* Mappings */}
            <div style={{ marginTop: "24px", borderTop: "1px dashed var(--card-border)", paddingTop: "20px" }}>
              <h3 style={{ fontSize: "1.25em", marginBottom: "12px" }}>Mapping Criteria (Click to Toggle)</h3>

              <div style={{ marginBottom: "16px" }}>
                <strong style={{ fontSize: "0.9em", color: "#334155" }}>💪 Strengths Associated:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                  {STRENGTHS.map(s => {
                    const isSelected = formStrengths.includes(s);
                    return (
                      <span 
                        key={s} 
                        className={`ok-pill-tag ${isSelected ? "selected" : ""}`}
                        onClick={() => handleToggle(s, formStrengths, setFormStrengths)}
                      >
                        {s}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <strong style={{ fontSize: "0.9em", color: "#334155" }}>🎨 Hobbies Associated:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                  {HOBBIES.map(h => {
                    const isSelected = formHobbies.includes(h);
                    return (
                      <span 
                        key={h} 
                        className={`ok-pill-tag ${isSelected ? "selected" : ""}`}
                        onClick={() => handleToggle(h, formHobbies, setFormHobbies)}
                      >
                        {h}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div>
                <strong style={{ fontSize: "0.9em", color: "#334155" }}>💼 Career Desires Associated:</strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                  {WORK_PREFS.map(w => {
                    const isSelected = formWork.includes(w);
                    return (
                      <span 
                        key={w} 
                        className={`ok-pill-tag ${isSelected ? "selected" : ""}`}
                        onClick={() => handleToggle(w, formWork, setFormWork)}
                      >
                        {w}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div 
              style={{ 
                marginTop: "30px", 
                borderTop: "1px solid var(--card-border)", 
                paddingTop: "20px", 
                display: "flex", 
                justifyContent: "flex-end", 
                gap: "12px" 
              }}
            >
              <button type="button" className="ok-btn ok-btn-secondary" onClick={handleResetForm}>
                Cancel
              </button>
              <button type="submit" className="ok-btn ok-btn-primary">
                {editId ? "💾 Save Changes" : "💾 Add Course"}
              </button>
            </div>
          </form>
        </div>
      )}

      <style jsx>{`
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.95em;
          margin-top: 10px;
        }
        .admin-table th, .admin-table td {
          padding: 16px;
          border-bottom: 1px solid #f1f5f9;
        }
        .admin-table th {
          font-weight: 700;
          color: #334155;
          background: #f8fafc;
        }
        .admin-table tr:hover {
          background: #f8fafc;
        }
        .admin-cat-badge {
          background: var(--primary-light);
          color: var(--primary);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.8em;
          font-weight: 600;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .form-group {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
