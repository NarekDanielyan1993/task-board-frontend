import { Outlet } from 'react-router-dom';
import { boardSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import MainHeader from './header';
import { StyledLayout, StyledMain } from './style';

function Layout() {
    const { data } = useAppSelector(boardSelector);
    const pageTitle = data.name || 'boards';
    return (
        <StyledLayout>
            {/* <Helmet title="projects" /> */}
            <MainHeader title={pageTitle} />
            <StyledMain>
                <Outlet />
            </StyledMain>
        </StyledLayout>
    );
}

export default Layout;
