import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://Nestopia-api.onrender.com",
  withCredentials: true,
});

export default apiRequest;