import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from 'src/component/loader';
import { AUTH_ROUTES } from 'src/constant';
import useCookie from 'src/hooks/useCookie';
import { refreshToken } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';

function PrivateRoute() {
    const {
        accessToken,
        refreshToken: { isLoading },
    } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { getCookie } = useCookie();
    const isLoggedIn = getCookie('isLoggedIn');

    if (!isLoggedIn) {
        return (
            <Navigate
                replace
                state={{ from: location }}
                to={AUTH_ROUTES.LOGIN}
            />
        );
    }

    if (!isLoading && isLoggedIn && !accessToken) {
        dispatch(refreshToken());
        return null;
    }

    if (isLoading) {
        return <Loader />;
    }
    return <Outlet />;
}

export default PrivateRoute;
