import axios from "axios";
import { AUTH_TOKEN, AUTH_USER } from "../consts";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(AUTH_USER);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
