import axios from "axios";
import Cookies from "js-cookie";
import { setTokenCookies } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_ENDPOINT}/users/refresh_token`,
            {},
            { headers: { Authorization: `Bearer ${refreshToken}` } }
          );
          const newAccessToken = refreshResponse.data.result.access_token;

          setTokenCookies(newAccessToken, refreshToken);
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          window.location.reload();
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api; 