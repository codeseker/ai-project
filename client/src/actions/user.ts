import type { LoginSchema } from "@/components/login-form";
import { throwApiException } from "@/utils/api-client";
import { SuccessResponse, type ApiResponse } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL_LOCAL;

export const login = asyncHandler(
    async (data: LoginSchema): Promise<SuccessResponse<{ id: string, name: string, email: string, token: string } | null>> => {
        const res = await axios.post(`${baseUrl}/auth/login`, data);
        const response: ApiResponse<{ id: string, name: string, email: string, token: string }> = res.data;

        if (!response.success) {
            throwApiException({
                statusCode: response.statusCode,
                message: response.message,
                errors: response.errors,
            });
        }

        return new SuccessResponse({
            statusCode: response.statusCode,
            data: response.data,
            message: response.message,
        });
    }
);

