import { type ApiResponse, SuccessResponse, ErrorResponse } from "./api-response";
import { ApiException } from "./api-exception";

export const successResponse = <T>(data: T, message?: string, statusCode?: number): ApiResponse<T> => {
    return new SuccessResponse({ data, message, statusCode });
};

export const errorResponse = (message?: string, errors?: any[], statusCode?: number): ApiResponse<null> => {
    return new ErrorResponse({ message, errors, statusCode });
};

export const throwApiException = ({ message, statusCode, errors }: { message: string; statusCode?: number; errors?: any[] }) => {
    throw new ApiException({ message, statusCode, errors });
};
