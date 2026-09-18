import api from "../../../services/api";
import type {
  AdminProfileResponse,
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";

export const login = async (payload: LoginPayload) => {
  const response = await api.post<LoginResponse>(
    "/admin/auth/login",
    payload
  );

  const { accessToken, refreshToken } = response.data.data;

  localStorage.setItem("crmAccessToken", accessToken);
  localStorage.setItem("crmRefreshToken", refreshToken);

  return response.data.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("crmRefreshToken");

  try {
    if (refreshToken) {
      await api.post("/admin/auth/logout", {
        refreshToken,
      });
    }
  } finally {
    localStorage.removeItem("crmAccessToken");
    localStorage.removeItem("crmRefreshToken");
  }
};


export const getAdminProfile = async () => {
  const response = await api.get<AdminProfileResponse>(
    "/admin/auth/me"
  );

  return response.data.data;
};