import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nestopia-draft-8.onrender.com/api", // Adjusted to your deployed backend URL
  withCredentials: true,
});

export default apiRequest;
