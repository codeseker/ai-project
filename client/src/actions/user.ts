import type { LoginSchema } from "@/components/login-form";
import type { ApiResponse } from "@/types/api-response";
import { asyncHandler } from "@/utils/async-handler";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL_LOCAL;


export interface LoginResponse {
    id: string;
    name: string;
    email: string;
    refreshToken: string;
    token: string;
}

export const login = asyncHandler(
    async (data: LoginSchema): Promise<ApiResponse<LoginResponse>> => {
        const res = await axios.post(`${baseUrl}/auth/login`, data);

        const response = res.data as ApiResponse<LoginResponse>;

        return response; 
    }
);

