import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from 'src/component/loader';
import { AUTH_ROUTES } from 'src/constant';
import { refreshToken } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';

function AuthWrapper() {
    const {
        accessToken,
        refreshToken: { isLoading },
    } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (!accessToken) {
            dispatch(refreshToken());
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return accessToken ? (
        <Outlet />
    ) : (
        <Navigate replace state={{ from: location }} to={AUTH_ROUTES.LOGIN} />
    );
}

export default AuthWrapper;
