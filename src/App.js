import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Medication from "./pages/Medication";
import Symptom from "./pages/Symptom";
import Habits from "./pages/Habits";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* Dashboard and other main pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medication" element={<Medication />} />
        <Route path="/symptom" element={<Symptom />} />
        <Route path="/habits" element={<Habits />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<h1 style={{ textAlign: "center", marginTop: "50px" }}>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
