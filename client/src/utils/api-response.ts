
export interface ApiResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T | null;
    errors?: any[];
}

export class SuccessResponse<T> implements ApiResponse<T> {
    statusCode: number;
    success = true;
    message: string;
    data: T;
    errors?: any[];

    constructor({
        statusCode = 200,
        data,
        message = "Success",
        errors = [],
    }: {
        statusCode?: number;
        data: T;
        message?: string;
        errors?: any[];
    }) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.errors = errors;
    }
}

export class ErrorResponse implements ApiResponse<null> {
    statusCode: number;
    success = false;
    message: string;
    data = null;
    errors: any[];

    constructor({
        statusCode = 500,
        message = "Something went wrong",
        errors = [],
    }: {
        statusCode?: number;
        message?: string;
        errors?: any[];
    }) {
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}
