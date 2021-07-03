import { toast } from "react-toastify";

// date
const months = {0: 'January',1: 'February',2: 'March',3: 'April',4: 'May',5: 'June',6: 'July',7: 'August',8: 'September',9: 'October',10: 'November',11: 'December'}
const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

export const getTimeandData = () => {
    const date = new Date();
    const day = date.getDate()
    const dayName = days[date.getDay()];
    const monthName = months[date.getMonth()]
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`
}

// verify email regex
export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// react-toastify callbacks
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