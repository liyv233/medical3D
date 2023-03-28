import axios from "axios";

const API = axios.create({
  baseURL: "http://loaclhost:3000",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
  timeout: 2000,
});

export default API;
