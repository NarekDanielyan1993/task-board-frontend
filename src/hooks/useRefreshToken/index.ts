import { useEffect } from 'react';
import { refreshToken } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import useCookie from '../useCookie';

const useRefreshToken = () => {
    const { accessToken } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const { getCookie } = useCookie();
    const isLoggedIn = getCookie('isLoggedIn');

    useEffect(() => {
        if (!accessToken && isLoggedIn) {
            dispatch(refreshToken());
        }
    }, []);
};

export default useRefreshToken;
