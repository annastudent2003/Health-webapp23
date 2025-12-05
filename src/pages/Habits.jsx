import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "./habits.css";
import API from "../api/apiClient";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    API.get("/habits")
      .then((res) => setHabits(res.data))
      .catch(() => console.log("⚠️ Could not load habits"));
  }, []);

  const addHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    try {
      const res = await API.post("/habits", { name: newHabit });
      setHabits([...habits, res.data]);
      setNewHabit("");
    } catch (err) {
      console.error("❌ Failed to add habit", err);
    }
  };

  const incrementStreak = async (index) => {
    const habit = habits[index];
    try {
      await API.put(`/habits/${habit.id}/checkin`);
      const updated = [...habits];
      updated[index].streak += 1;
      setHabits(updated);
    } catch (err) {
      console.error("❌ Streak update failed", err);
    }
  };

  return (
    <div className="habits-page">
      <Topbar />
      <main className="habits-content">
        <h2>Habit Tracker</h2>

        <form onSubmit={addHabit} className="habit-form">
          <input
            type="text"
            value={newHabit}
            placeholder="Enter new habit..."
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="habit-list">
          {habits.map((habit, i) => (
            <div key={i} className="habit-card">
              <h4>{habit.name}</h4>
              <p>🔥 Streak: {habit.streak}</p>
              <button onClick={() => incrementStreak(i)}>Check In</button>
            </div>
          ))}
          {habits.length === 0 && <p className="empty">No habits added yet.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
