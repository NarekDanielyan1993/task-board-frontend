import { Navigate, Outlet, useLocation } from 'react-router-dom';
import BOARD_ROUTES from 'src/constant/route';
import useCookie from 'src/hooks/useCookie';
import authSelector from 'src/store/auth/selector';
import { useAppSelector } from 'src/store/createStore';

function PublicRoute() {
    const { getCookie } = useCookie();
    const isLoggedIn = getCookie('isLoggedIn');
    const { accessToken } = useAppSelector(authSelector);
    const location = useLocation();
    if (isLoggedIn || accessToken) {
        return (
            <Navigate
                replace
                to={location.state?.from?.pathname || BOARD_ROUTES.boards}
            />
        );
    }

    return <Outlet />;
}

export default PublicRoute;
