import axios from "axios";
import { envs } from "../config/envs";

const apiClient = axios.create({
  baseURL: envs.VITE_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
