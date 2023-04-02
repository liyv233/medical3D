import axios from "axios";

const API = axios.create({
  baseURL: "http://10.33.21.244:5000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 2000,
});
export default API;
