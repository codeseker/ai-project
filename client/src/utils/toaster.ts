import { toast } from "react-hot-toast";

export const successToast = (message: string) => {
    toast.success(message, {
        position: "top-right",
        duration: 2000,
    });
};

export const errorToast = (message: string) => {
    toast.error(message, {
        position: "top-right",
        duration: 2000,
    });
};