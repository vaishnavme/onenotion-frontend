import { toast } from "react-toastify";

export const successToast = (message) => {
  return toast.success(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    style: {
      color: "#ffffff",
      backgroundColor: "#28a745",
    },
  });
};
export const successRemoveToast = (message) => {
  return toast.info(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
};

export const errorToast = (message) => {
  return toast.warning(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
};