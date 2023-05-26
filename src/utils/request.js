import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.43.145:5000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 2000,
});
API.interceptors.request.use((config) => {
  let Authorization = localStorage.getItem("Authorization");
  if (Authorization) {
    config.headers["Authorization"] = Authorization;
  }
  return config;
});

export default API;
