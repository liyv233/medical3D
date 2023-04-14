import axios from "axios";
const file = axios.create({
  baseURL: " http://10.33.116.50:5000",
  timeout: 2000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default file;
