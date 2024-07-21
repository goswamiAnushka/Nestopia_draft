import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nestopia-draft-backend.vercel.app/api", // Adjust as per your server setup
  withCredentials: true,
});

export default apiRequest;