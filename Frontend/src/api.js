// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://florida-backend.onrender.com/api", // ✅ apne backend ka deployed link daalo
  withCredentials: false, // agar cookies/credentials chahiye to true karo
});

export default api;
