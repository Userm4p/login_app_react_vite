import axios from "axios";
import { envs } from "../config/envs";
import { removeLoginInfoInLocalStorage } from "../helpers/localstorage";

const apiClient = axios.create({
  baseURL: envs.VITE_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeLoginInfoInLocalStorage();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
