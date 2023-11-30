import { ToastOptions, TypeOptions, toast } from 'react-toastify';

const useNotification = () => {
    const toastify = (type: TypeOptions, message: string) => {
        let msg = '';
        switch (type) {
            case 'success': {
                msg = message || 'Good Job!!';
                break;
            }
            case 'error': {
                msg = message || 'Error accured';
                break;
            }
            default: {
                msg = message || 'Error accured';
            }
        }

        const toastOptions: ToastOptions = {
            type,
        };
        toast(msg, toastOptions);
    };

    return { toast: toastify };
};

export default useNotification;
