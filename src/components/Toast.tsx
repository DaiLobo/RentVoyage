import { toast } from 'sonner';
import { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

const getToastStyle = (type: ToastType) => {
    switch (type) {
        case 'success':
            return 'bg-emerald-400 text-white';
        case 'error':
            return 'bg-red-600 text-white';
        case 'info':
            return 'bg-blue-500 text-white';
        default:
            return '';
    }
};

export const showToast = (type: ToastType, message: ReactNode) => {
    toast.custom((t) => (
        <div className={`${getToastStyle(type)} p-2 rounded-lg text-sm`}>
            {message}
        </div>
    ));
};