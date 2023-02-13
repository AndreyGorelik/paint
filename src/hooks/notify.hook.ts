import { toast } from 'react-toastify';

const useNotify = () => {
    const notifySuccess = (text: string) => toast(text);
    const notifyError = (text: string) => toast.error(text);
    return {
        notifyError,
        notifySuccess
    }
}

export default useNotify;