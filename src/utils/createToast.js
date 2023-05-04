import { toast } from 'react-toastify';

export const createToast = (message, messageType) => {
  toast[messageType](message, {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  });
};
