import { useNavigate } from "react-router-dom";
import { errorToast } from "@/utils/toaster";

export function useAsyncHandler() {
  const navigate = useNavigate();

  return function asyncHandler<T extends (...args: any[]) => Promise<any>>(
    fn: T,
  ) {
    return async (
      ...args: Parameters<T>
    ): Promise<Awaited<ReturnType<T>> | null> => {
      try {
        return await fn(...args);
      } catch (err: any) {
        const statusCode = err?.response?.status || 500;
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        if (statusCode === 403) {
          errorToast("You don't have permission to do that.");
          return null;
        }

        if (statusCode === 404) {
          errorToast("Resource not found.");
          return null;
        }

        errorToast(msg);
        console.error("Async Error:", err);
        throw err;
      }
    };
  };
}
