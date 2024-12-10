import { toast, ToastOptions } from "react-toastify";

const defaultConfig: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const showToast = {
  success: (message: string) => toast.success(message, defaultConfig),
  error: (message: string) => toast.error(message, defaultConfig),
  info: (message: string) => toast.info(message, defaultConfig),
};
