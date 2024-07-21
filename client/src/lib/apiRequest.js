import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nestopia-api-backend.onrender.com/api", // Adjust as per your server setup
  withCredentials: true,
});

export default apiRequest;