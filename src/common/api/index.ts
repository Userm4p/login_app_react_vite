import axios from "axios";
import { envs } from "../config/envs";
import { removeLoginInfoInLocalStorage } from "../helpers/localstorage";
import { reloadPage } from "../helpers/reloadPage";

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
      reloadPage();
    }
    return Promise.reject(error);
  },
);

export default apiClient;
