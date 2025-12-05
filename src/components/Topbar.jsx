import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./topbar.css";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="topbar">
      <h2 className="logo">HealthTrack+</h2>
      <nav>
        <NavLink to="/dashboard" className="tab">Dashboard</NavLink>
       <NavLink to="/habits" className="tab">Habits</NavLink>
        <NavLink to="/medication" className="tab">Medication</NavLink>
        <NavLink to="/symptom" className="tab">Symptom</NavLink>
      </nav>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}
