import type { ApiResponse } from "@/types/api-response";
import { asyncHandler } from "@/utils/async-handler";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_API_URL_LOCAL;


export interface IndexCourseResponse {
    
}

export const indexCourses = asyncHandler(
    async (token: string): Promise<ApiResponse<any>> => {
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
        const res = await axios.get(`${baseUrl}/course/all`, { headers });

        const response = res.data as ApiResponse<any>;

        return response; 
    }
);



