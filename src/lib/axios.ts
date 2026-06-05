import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8080/api"
      : "/api",
  withCredentials: true,
});
export default api;

// Add a request interceptor to include the access token in the Authorization header
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // những api không cần check
    if (
      originalRequest.url.includes("/v2/auth/login") ||
      originalRequest.url.includes("/v1/auth/register") ||
      originalRequest.url.includes("/v1/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = originalRequest._retry || 0;


    if (error.response?.status === 401 && originalRequest._retry < 4) {
      originalRequest._retry += 1;
      console.log('>>>>>> refresh')
      try {
        const res = await api.post(
          "/v1/auth/refresh",
          {},
          { withCredentials: true },
        );
        const newAccessToken = res.data.data.access_token;
        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().clearState();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
