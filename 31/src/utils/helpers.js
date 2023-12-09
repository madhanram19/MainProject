import { toast } from "react-toastify";

export const toastifyMessage = (status, message) => {
    if (status === "success") {
        toast.success(message);
    }
    if (status === "error") {
        toast.error(message);
    }
};