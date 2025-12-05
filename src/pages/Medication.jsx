import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import API from "../api/apiClient";
import "./medication.css";

export default function Medication() {
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState({ name: "", dosage: "", time: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Fetch existing meds on load
  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const res = await API.get("/medication");
        setMeds(res.data);
      } catch (err) {
        console.error("❌ Fetch failed:", err);
      }
    };
    fetchMeds();
  }, []);

  // Add new medication
  const addMed = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    try {
      const res = await API.post("/medication", form);
      setMeds([...meds, res.data]);
      setForm({ name: "", dosage: "", time: "" });
    } catch (err) {
      console.error("❌ Add medication failed:", err);
      alert("Failed to add medication. Check backend connection.");
    }
  };

  // Toggle 'taken' status
  const toggleTaken = async (id, index) => {
    try {
      const updated = [...meds];
      updated[index].taken = !updated[index].taken;
      setMeds(updated);
      await API.put(`/medication/${id}`, { taken: updated[index].taken });
    } catch (err) {
      console.error("❌ Toggle failed:", err);
    }
  };

  return (
    <div className="med-page">
      <Topbar />
      <main className="med-content">
        <h2>Medication & Monitoring</h2>

        <form onSubmit={addMed} className="med-form">
          <input
            name="name"
            value={form.name}
            placeholder="Medication Name"
            onChange={handleChange}
          />
          <input
            name="dosage"
            value={form.dosage}
            placeholder="Dosage"
            onChange={handleChange}
          />
          <input
            name="time"
            value={form.time}
            placeholder="Time (e.g. 8 AM)"
            onChange={handleChange}
          />
          <button type="submit">Add</button>
        </form>

        <div className="med-list">
          {meds.map((m, i) => (
            <div key={m.id || i} className={`med-card ${m.taken ? "taken" : ""}`}>
              <h4>{m.name}</h4>
              <p>
                {m.dosage} – {m.time}
              </p>
              <label>
                <input
                  type="checkbox"
                  checked={m.taken}
                  onChange={() => toggleTaken(m.id, i)}
                />{" "}
                Taken
              </label>
            </div>
          ))}

          {meds.length === 0 && <p className="empty">No medications added yet.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
