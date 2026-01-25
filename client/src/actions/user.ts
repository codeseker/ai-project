import type { LoginSchema } from "@/components/login-form";
import type { ApiResponse } from "@/types/api-response";
import { api } from "@/api/axios";

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  refreshToken: string;
  accessToken: string;
}

export async function login(
  data: LoginSchema,
): Promise<ApiResponse<LoginResponse>> {
  const res = await api.post("/auth/login", data);
  return res.data;
}

export interface RefreshUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    refreshToken: string;
  };
  accessToken: string;
}

export async function refreshUser(
  refreshToken: string | null | undefined,
): Promise<ApiResponse<RefreshUserResponse>> {
  const res = await api.post(
    "/auth/refresh",
    { refreshToken },
    {
      withCredentials: true,
    },
  );
  return res.data;
}
