import { Route, Routes } from 'react-router-dom';
import { BASE_ROUTE } from 'src/constant';
import BOARD_ROUTES from 'src/constant/route';
import BoardPage from 'src/pages/board';
import BoardsPage from 'src/pages/boards';
import Layout from '../layout';
import PrivateRoute from './privateRoute';

function MainRoute() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<Layout />} path="/">
                    <Route element={<BoardsPage />} index path={BASE_ROUTE} />
                    <Route
                        element={<BoardsPage />}
                        path={BOARD_ROUTES.boards}
                    />
                    <Route
                        element={<BoardPage />}
                        path={`${BOARD_ROUTES.board}/:id`}
                    />
                </Route>
            </Route>
        </Routes>
    );
}

export default MainRoute;
