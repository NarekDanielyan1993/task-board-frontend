import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { TOAST_SETTINGS } from 'src/constant/notification';
import useNotification from 'src/hooks/useNotification';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import { hideNotification } from 'src/store/notification/reducer';
import { notificationSelector } from 'src/store/notification/selector';

function Notification() {
    const { message, type } = useAppSelector(notificationSelector);
    const { toast } = useNotification();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (message) {
            toast(type, message);
            dispatch(hideNotification());
        }
    }, [message, type]);

    return <ToastContainer {...TOAST_SETTINGS} />;
}

export default Notification;
