import { Navigate, Outlet, useLocation } from 'react-router-dom';
import BOARD_ROUTES from 'src/constant/route';
import useCookie from 'src/hooks/useCookie';

function PublicRoute() {
    const { getCookie } = useCookie();
    const isLoggedIn = getCookie('isLoggedIn');
    const location = useLocation();
    console.log(isLoggedIn);
    if (isLoggedIn) {
        return (
            <Navigate
                replace
                state={{ from: location }}
                to={location.state?.from?.pathname || BOARD_ROUTES.boards}
            />
        );
    }

    return <Outlet />;
}

export default PublicRoute;
