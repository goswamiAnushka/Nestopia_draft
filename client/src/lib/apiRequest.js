import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://nestopia-draft-api2.vercel.app/", // Adjust as per your server setup
  withCredentials: true,
});

export default apiRequest;
