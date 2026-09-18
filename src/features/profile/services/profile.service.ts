import api from "../../../services/api";
import type { AdminProfile } from "../types/profile.types";

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
}

// GET current admin profile
export const getAdminProfile = async (): Promise<AdminProfile> => {
  const response = await api.get("/admin/auth/me");

  return response.data.data;
};

// PATCH admin profile
export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await api.patch("/admin/auth/profile", data);

  return response.data;
};

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const changePassword = async (data: ChangePasswordPayload) => {
  const response = await api.patch(
    "/admin/auth/change-password",
    data
  );

  return response.data;
};