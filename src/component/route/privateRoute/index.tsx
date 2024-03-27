import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Loader from 'src/component/loader';
import { AUTH_ROUTES } from 'src/constant';
import useCookie from 'src/hooks/useCookie';
import authSelector from 'src/store/auth/selector';
import { useAppSelector } from 'src/store/createStore';

function PrivateRoute() {
    const {
        accessToken,
        refreshToken: { isLoading },
    } = useAppSelector(authSelector);
    const location = useLocation();
    const { getCookie } = useCookie();
    const isLoggedIn = getCookie('isLoggedIn');
    const [isAuth, setIsAuth] = useState(true);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoggedIn || accessToken) {
            setIsAuth(true);
        }
        setLoading(false);
    }, []);

    if (isLoading || loading) {
        return <Loader />;
    }

    if (!isLoggedIn || !accessToken) {
        return (
            <Navigate
                replace
                state={{ from: location.pathname }}
                to={AUTH_ROUTES.LOGIN}
            />
        );
    }

    // useEffect(() => {
    //     if (!isLoggedIn || !accessToken) {
    //         setIsAuth(false);
    //     }
    // }, []);

    // if (!isLoading && isLoggedIn && !accessToken) {
    //     dispatch(refreshToken());
    //     return null;
    // }

    // if (!isAuth) {
    //     return (
    //         <Navigate
    //             replace
    //             state={{ from: location.pathname }}
    //             to={AUTH_ROUTES.LOGIN}
    //         />
    //     );
    // }

    return <Outlet />;
}

export default PrivateRoute;
