import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:8800/", // Adjust as per your server setup
  withCredentials: true,
});

export default apiRequest;
