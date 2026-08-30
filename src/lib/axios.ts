import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuthRefresh?: boolean;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const url = originalRequest?.url || "";
    const isAuthRoute =
      url.includes("/auth/login") ||
      url.includes("/auth/register") ||
      url.includes("/auth/refresh") ||
      url.includes("/auth/logout");

    if (
      error.response?.status === 401 &&
      !originalRequest?._retry &&
      !originalRequest?._skipAuthRefresh &&
      !isAuthRoute
    ) {
      originalRequest._retry = true;

      try {
        await api.post(
          "/auth/refresh",
          {},
          {
            _skipAuthRefresh: true,
          } as CustomAxiosRequestConfig,
        );

        return api(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
