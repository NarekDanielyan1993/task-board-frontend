import { ToastContainerProps } from 'react-toastify';
import { NotificationMessageTypesUnion } from 'src/types';

export const TOAST_SETTINGS: ToastContainerProps = {
    autoClose: 5000,
    position: 'bottom-left',
};

export const NOTIFICATION_TYPES: NotificationMessageTypesUnion =
    'success' || 'error' || 'info' || 'warning';

export const NOTIFICATION_MESSAGES = {
    SIGN_UP_SUCCESS: `A verification link has been sent to your email. 
                Please check your inbox to verify your account.`,
    PASSWORD_RESET_SUCCESS: 'Password has been successfully updated.',
    PASSWORD_RESET_EMAIL_LINK_SUCCESS:
        'Password reset link sent to your email.',
};
