import axios from "axios";

const apiRequest = axios.create({
  baseURL: '${window.location.origin}/api',
  withCredentials: true,
});

export default apiRequest;