import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "./Dashboard.css";
import API from "../api/apiClient";

export default function Dashboard() {
  const [vitals, setVitals] = useState({
    heartRate: 102,
    bp: "120/80 mmHg",
    calories: 0,
    steps: 0,
  });

  const [appointments, setAppointments] = useState([
    { id: 1, text: "🦷 Dentist — 8:00 AM" },
    { id: 2, text: "🧠 Neurologist — 9:30 AM" },
    { id: 3, text: "🩻 Digital X-ray — 6:00 PM" },
  ]);

  const [newAppointment, setNewAppointment] = useState("");

  // Fetch live steps + calories from backend
  useEffect(() => {
    API.get("/steps")
      .then((res) => {
        setVitals((prev) => ({
          ...prev,
          steps: res.data.steps,
          calories: res.data.calories,
        }));
      })
      .catch((err) => console.error("⚠️ Failed to fetch steps:", err));
  }, []);

  const handleVitalChange = (e) => {
    const { name, value } = e.target;
    setVitals((prev) => ({ ...prev, [name]: value }));
  };

  const addAppointment = (e) => {
    e.preventDefault();
    if (!newAppointment.trim()) return;
    const newItem = {
      id: Date.now(),
      text: newAppointment,
    };
    setAppointments([...appointments, newItem]);
    setNewAppointment("");
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  return (
    <div className="dashboard">
      <Topbar />
      <main className="dash-content">
        <h2>Dashboard Overview</h2>

        <div className="dash-grid">
          {/* Heart Rate */}
          <div className="dash-card teal">
            <h3>Heart Rate</h3>
            <input
              type="number"
              name="heartRate"
              value={vitals.heartRate}
              onChange={handleVitalChange}
              className="vital-input"
            />
            <p>bpm</p>
          </div>

          {/* Blood Pressure */}
          <div className="dash-card light">
            <h3>Blood Pressure</h3>
            <input
              type="text"
              name="bp"
              value={vitals.bp}
              onChange={handleVitalChange}
              className="vital-input"
            />
          </div>

          {/* Calories */}
          <div className="dash-card teal">
            <h3>Calories Burned</h3>
            <p>{vitals.calories} kcal</p>
          </div>

          {/* Steps */}
          <div className="dash-card light">
            <h3>Steps Walked</h3>
            <p>{vitals.steps} steps</p>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="extra-section">
          <div className="dash-card full">
            <h3>Upcoming Appointments</h3>
            <ul>
              {appointments.map((appt) => (
                <li key={appt.id}>
                  {appt.text}
                  <button
                    className="delete-btn"
                    onClick={() => deleteAppointment(appt.id)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

            <form onSubmit={addAppointment} className="appt-form">
              <input
                type="text"
                placeholder="Add new appointment..."
                value={newAppointment}
                onChange={(e) => setNewAppointment(e.target.value)}
              />
              <button type="submit">Add</button>
            </form>
          </div>

          <div className="dash-card full teal">
            <h3>Weekly Activity</h3>
            <p>📈 Chart placeholder (connect Chart.js later)</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
