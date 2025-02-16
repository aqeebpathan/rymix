import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
