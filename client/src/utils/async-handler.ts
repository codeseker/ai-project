// utils/asyncHandler.ts
import { errorToast } from "./toaster";

export function asyncHandler<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
    try {
      return await fn(...args);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong";

      errorToast(msg);
      console.error("Async Error:", err);

      return null; // always predictable
    }
  };
}
