import axios from "axios";

// ✅ Base URL of backend
const API = axios.create({
  baseURL: "http://localhost:3000/api", // change when deployed
});

// ✅ Attach JWT token (if user logged in)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
