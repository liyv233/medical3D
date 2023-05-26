import axios from "axios";
const file = axios.create({
  baseURL: "http://192.168.43.145:5000",
  timeout: 2000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default file;
