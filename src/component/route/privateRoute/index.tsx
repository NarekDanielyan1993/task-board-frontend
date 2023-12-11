import { Outlet } from 'react-router-dom';
import Loader from 'src/component/loader';
// import useCookie from 'src/hooks/useCookie';
import { refreshToken } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';

function PrivateRoute() {
    const {
        accessToken,
        refreshToken: { isLoading },
    } = useAppSelector(authSelector);
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <Loader />;
    }

    if (!accessToken) {
        dispatch(refreshToken());
        return null;
    }

    return <Outlet />;
}

export default PrivateRoute;
