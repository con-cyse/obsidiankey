"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Copyright from "@/components/Copyright";

export default function LoginPage() {
  const router = useRouter();
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    // Check if already logged in
    const match = document.cookie.match(/(^| )accessToken=([^;]+)/);
    if (match && match[2]) {
      router.push("/");
    }
  }, [router]);

  const setCookie = (name: string, value: string) => {
    const maxAge = 60 * 60 * 24; // 1 day
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=None; Secure`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorText("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formUsername,
          password: formPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to log in.");
      }

      const resolvedToken = data.accessToken || data.token || "";
      if (!resolvedToken) {
        throw new Error("Invalid login response.");
      }

      // Save cookies
      setCookie("username", data.username || formUsername);
      setCookie("accessToken", resolvedToken);
      setCookie("userLevel", String(data.userLevel ?? 0));
      setCookie("fullName", data.fullName || "");

      setFullName(data.fullName || data.username || formUsername);
      setShowSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      setErrorText(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="ok-navbar">
        <div className="ok-nav-left">
          <div className="ok-nav-home">
            <img src="/logo.png" width={24} height={24} className="ok-nav-logo" alt="Logo" />
              <span>Pathuro</span>
          </div>
        </div>
      </header>

      <main className="ok-main ok-login-main ok-fade-in">
        <section className="ok-login-card" aria-labelledby="okLoginTitle">
          <h1 id="okLoginTitle" className="ok-login-title">Welcome back</h1>
          <p className="ok-login-subtitle">Sign in to continue to Pathuro Course Matcher.</p>

          {!showSuccess ? (
            <form className="ok-login-form" onSubmit={handleLogin}>
              <div style={{ marginBottom: "16px" }}>
                <label className="ok-login-label" htmlFor="okUsername">
                  Username
                </label>
                <input
                  id="okUsername"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  className="ok-login-input ok-input"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="e.g. student or admin"
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label className="ok-login-label" htmlFor="okPassword">
                  Password
                </label>
                <input
                  id="okPassword"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="ok-login-input ok-input"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="e.g. student or admin"
                />
              </div>

              <button
                className="ok-login-submit ok-btn ok-btn-primary"
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%", padding: "12px" }}
              >
                {isSubmitting ? "Signing in..." : "Log in"}
              </button>

              {errorText && <p className="ok-login-error">{errorText}</p>}

              <div 
                style={{ 
                  marginTop: "20px", 
                  padding: "12px", 
                  background: "#f1f5f9", 
                  borderRadius: "8px", 
                  fontSize: "0.85em",
                  color: "#64748b",
                  border: "1px solid #e2e8f0"
                }}
              >
                💡 <strong>Demo Accounts Available:</strong>
                <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                  <li>Student access: use <strong>student</strong> / <strong>student</strong></li>
                  <li>Admin access: use <strong>admin</strong> / <strong>admin</strong></li>
                </ul>
              </div>
            </form>
          ) : (
            <div className="ok-login-success ok-fade-in">
              <h2 className="ok-success-title">Welcome, {fullName}!</h2>
              <p className="ok-success-message">✓ You have successfully logged in</p>
              <div className="ok-user-data">
                <p><strong>Username:</strong> {formUsername}</p>
                <p className="ok-redirect-notice">Redirecting to course matcher...</p>
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Copyright />

      <style jsx>{`
        .ok-login-main {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 120px;
        }
        .ok-login-card {
          width: min(420px, 100%);
          padding: 32px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid var(--card-border);
          box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.1);
        }
        .ok-login-title {
          font-size: 2rem;
          line-height: 1.2;
          font-family: var(--font-heading);
          color: var(--text-main);
          margin-bottom: 6px;
        }
        .ok-login-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        .ok-login-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: #334155;
          margin-bottom: 6px;
        }
        .ok-login-input {
          width: 100%;
        }
        .ok-login-error {
          margin-top: 14px;
          color: var(--danger);
          font-size: 0.9rem;
          font-weight: 500;
          background: var(--danger-light);
          padding: 10px;
          border-radius: 8px;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .ok-login-success {
          padding: 10px 0;
          text-align: center;
        }
        .ok-success-title {
          font-size: 1.8rem;
          font-family: var(--font-heading);
          color: var(--success);
          margin-bottom: 8px;
        }
        .ok-success-message {
          font-weight: 600;
          color: var(--success);
          margin-bottom: 20px;
        }
        .ok-user-data {
          background: #f8fafc;
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 16px;
          text-align: left;
        }
        .ok-user-data p {
          margin-bottom: 8px;
        }
        .ok-redirect-notice {
          margin-top: 12px;
          font-size: 0.85em;
          color: var(--primary);
          font-style: italic;
        }
      `}</style>
    </>
  );
}
