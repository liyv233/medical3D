import axios from "axios";

const API = axios.create({
  baseURL: "http://10.33.86.40:5000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 2000,
});

API.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});
export default API;
