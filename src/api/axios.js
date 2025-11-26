// في src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
,
});

// كل ريكوست هيضيف التوكن لو موجود
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // لأنك مخزّناه كده فعلاً
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Token added to headers:", token);
  } else {
    console.warn("⚠️ No token found in localStorage");
  }
  return config;
});

export default api;
