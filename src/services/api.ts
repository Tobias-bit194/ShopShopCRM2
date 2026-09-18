import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

/**
 * Отдельный axios instance для refresh.
 *
 * ВАЖНО:
 * здесь нет наших interceptors, иначе при 401 от /refresh
 * можно получить бесконечный цикл.
 */
const refreshApi = axios.create({
  baseURL: BASE_URL,
});

interface RefreshResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: string;
  };
}

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const clearTokens = () => {
  localStorage.removeItem("crmAccessToken");
  localStorage.removeItem("crmRefreshToken");
};

const redirectToLogin = () => {
  clearTokens();

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

/**
 * Добавляем accessToken перед каждым запросом.
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("crmAccessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Promise нужен для ситуации, когда одновременно несколько
 * запросов получили 401.
 *
 * Refresh выполняем только один раз.
 */
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("crmRefreshToken");

  if (!refreshToken) {
    throw new Error("Refresh token not found");
  }

  const response = await refreshApi.post<RefreshResponse>(
    "/admin/auth/refresh",
    {
      refreshToken,
    }
  );

  const {
    accessToken,
    refreshToken: newRefreshToken,
  } = response.data.data;

  localStorage.setItem("crmAccessToken", accessToken);
  localStorage.setItem("crmRefreshToken", newRefreshToken);

  return accessToken;
};

/**
 * Обработка 401.
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryRequestConfig
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest
    ) {
      return Promise.reject(error);
    }

    /**
     * Этот запрос уже повторяли после refresh.
     * Второй раз refresh не запускаем.
     */
    if (originalRequest._retry) {
      redirectToLogin();

      return Promise.reject(error);
    }

    /**
     * На login refresh делать не нужно.
     *
     * Например:
     * неправильный пароль -> 401
     * просто показываем ошибку формы.
     */
    if (originalRequest.url?.includes("/admin/auth/login")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      /**
       * Если refresh уже выполняется —
       * остальные запросы ждут тот же Promise.
       */
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      /**
       * Повторяем первоначальный запрос.
       */
      return api(originalRequest);
    } catch (refreshError) {
      redirectToLogin();

      return Promise.reject(refreshError);
    }
  }
);

export default api;