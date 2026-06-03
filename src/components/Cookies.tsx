"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Cookies() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Read the allowCookies cookie on mount
    const checkCookiesCookie = () => {
      const match = document.cookie.match(/(^| )allowCookies=([^;]+)/);
      if (!match || match[2] !== "true") {
        setShowBanner(true);
      }
    };
    checkCookiesCookie();
  }, []);

  const handleAccept = () => {
    // Set cookie valid for 1 day
    const maxAge = 60 * 60 * 24;
    document.cookie = `allowCookies=true; path=/; max-age=${maxAge}; SameSite=None; Secure`;
    setShowBanner(false);
  };

  const handleClose = () => {
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div id="okCookieModal" className="ok-cookie-modal" onClick={handleClose}></div>
      <div id="okCookieBox" className="ok-cookie-box">
        <span id="okCookieX" className="ok-cookie-x" onClick={handleClose}>
          ✕
        </span>
        <div className="ok-cookie-header">Cookies and Privacy</div>
        <div className="ok-cookie-message">
          We use cookies to ensure you get the best experience on our website, including personalized course matches.
        </div>
        <div className="ok-cookie-actions">
          <Link href="/policy" className="ok-cookie-link" target="_blank">
            <div className="ok-cookie-action ok-cookie-more">Read more</div>
          </Link>
          <div
            id="okCookieOK"
            className="ok-cookie-action ok-cookie-ok"
            onClick={handleAccept}
          >
            Accept all
          </div>
        </div>
      </div>
    </>
  );
}
