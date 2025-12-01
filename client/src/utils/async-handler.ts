import { errorToast } from "./toaster";

/**
 * A type-safe async wrapper that handles errors and forwards arguments.
 */
export function asyncHandler<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options?: {
        defaultError?: string;
        onError?: (err: unknown) => void;
    }
) {
    return async (
        ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>> | void> => {
        try {
            return await fn(...args);
        } catch (err: any) {
            console.error("Async Error:", err);

            if (options?.onError) {
                options.onError(err);
            }

            const msg =
                err?.response?.data?.message ||
                err?.message ||
                options?.defaultError ||
                "Something went wrong";

            errorToast(msg);
        }
    };
}

