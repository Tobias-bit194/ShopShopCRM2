export type AdminRole = "SUPER_ADMIN" | "ADMIN";

export interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  role: AdminRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginData {
  admin: Admin;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
}

export interface LoginResponse {
  success: boolean;
  data: LoginData;
}

export interface AdminProfileResponse {
  success: boolean;
  data: Admin;
}