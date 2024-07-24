// apiRequest.js
import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use environment variable
  withCredentials: true,
});

export default apiRequest;
