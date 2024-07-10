import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nestopia-api-backend.onrender.com", // Adjust as per your server setup
  withCredentials: true,
});

export default apiRequest;
