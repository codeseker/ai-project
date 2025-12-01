// api-exception.ts
export class ApiException extends Error {
    statusCode: number;
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
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        Object.setPrototypeOf(this, ApiException.prototype);
    }
}
