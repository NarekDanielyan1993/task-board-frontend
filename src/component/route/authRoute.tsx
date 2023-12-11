import { Route, Routes } from 'react-router-dom';
import { AUTH_ROUTES } from 'src/constant';
import CompletionSignUp from 'src/pages/auth/completion';
import LogInPage from 'src/pages/auth/logIn';
import ResetPasswordPage from 'src/pages/auth/resetPassword';
import SignUpPage from 'src/pages/auth/signup';
import PublicRoute from './publicRoute';

function AuthRoute() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route element={<SignUpPage />} path={AUTH_ROUTES.SIGN_UP} />
                <Route element={<LogInPage />} path={AUTH_ROUTES.LOGIN} />
            </Route>
            <Route
                element={<CompletionSignUp />}
                path={AUTH_ROUTES.COMPLETION}
            />
            <Route
                element={<ResetPasswordPage />}
                path={AUTH_ROUTES.RESET_PASSWORD}
            />
        </Routes>
    );
}

export default AuthRoute;
