import { toast } from "react-toastify";

export const successToast = (message) => {
  return toast.success(message, {
    className: "bg-green-600 text-white rounded",
    position: "top-right",
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
    className: "bg-blue-500 text-white p-4 rounded",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
};

export const errorToast = (message) => {
  return toast.warning(message, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
  });
};