import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="inner">
        <div className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#7fb6a4" />
          </svg>
          Health+ Care Tracker
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
}
