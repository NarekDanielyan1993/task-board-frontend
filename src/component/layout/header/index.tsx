import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';
import { StyledMainHeader, StyledTitle } from './style';

function MainHeader({ title }: { title: string }) {
    return (
        <StyledMainHeader>
            <LeftPanel />
            <StyledTitle>{title}</StyledTitle>
            <RightPanel />
        </StyledMainHeader>
    );
}

export default MainHeader;
