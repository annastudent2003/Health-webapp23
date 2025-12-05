import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Simulated login/signup — replace with backend API later
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you’ll make a backend API call (later)
      // Example: const res = await apiRequest("/auth/login", "POST", formData);

      // Temporary simulated success:
      const fakeToken = "sample-jwt-token";
      localStorage.setItem("token", fakeToken);

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      alert("Error logging in. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="main-bg">
      <div className="curved-box">
        <div className="left-section" style={{ backgroundImage: "url(/images/image345.png)" }}>
          <div className="logo-text">HealthTrack+</div>
        </div>

        <div className="right-section">
          <div className="toggle-links">
            <span
              onClick={() => setIsLogin(true)}
              className={isLogin ? "active" : ""}
            >
              Login
            </span>{" "}
            /{" "}
            <span
              onClick={() => setIsLogin(false)}
              className={!isLogin ? "active" : ""}
            >
              Signup
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button className="btn-primary" type="submit">
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
