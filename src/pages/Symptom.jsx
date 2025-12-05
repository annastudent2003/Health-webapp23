import React, { useState, useEffect, useRef } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "./symptom.css";
import API from "../api/apiClient";

export default function Symptom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch previous logs (optional; can be removed if not stored)
  useEffect(() => {
    API.get("/symptoms")
      .then((res) => {
        const prev = res.data.map((item) => ({
          from: "user",
          text: item.description || "Previous symptom logged",
        }));
        setMessages(prev);
      })
      .catch((err) => console.error("❌ Fetch failed:", err));
  }, []);

  // Send message handler
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await API.post("/symptoms", { message: input });
      const botReply = { from: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("❌ API error:", err);
      const botReply = {
        from: "bot",
        text: "Sorry, I’m unable to process your symptoms right now. Please try again later.",
      };
      setMessages((prev) => [...prev, botReply]);
    }

    setInput("");
  };

  return (
    <div className="symptom-page">
      <Topbar />
      <main className="symptom-content">
        <h2>Symptom Checker Chat</h2>

        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.from}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={sendMessage} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your symptoms..."
          />
          <button type="submit">Send</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
