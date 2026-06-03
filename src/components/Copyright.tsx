"use client";

import React from "react";
import Link from "next/link";

export default function Copyright() {
  const year = new Date().getFullYear();

  return (
    <footer className="ok-footer-area">
      <nav className="ok-footer-links">
        <Link href="/terms">Terms of Service</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link href="/policy">Privacy Policy</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link href="/support">Support</Link>
      </nav>
      <div className="ok-footer-copyright">
        <span>&copy;&nbsp;</span>
        <span>{year}</span>
        <span>&nbsp;Pathra. All rights reserved.</span>
      </div>
    </footer>
  );
}
