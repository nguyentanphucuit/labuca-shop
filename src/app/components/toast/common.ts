import { Bounce, toast } from 'react-toastify';

export const notifySuccess = () =>
  toast.success('Success', {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
