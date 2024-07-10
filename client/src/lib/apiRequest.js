import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nestopia-backend.onrender.com",
  withCredentials: true,
});

export default apiRequest;