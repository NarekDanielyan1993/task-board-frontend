import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';
import { StyledMainHeader } from './style';

function MainHeader({ title }: { title: string }) {
    return (
        <StyledMainHeader>
            <LeftPanel />
            <RightPanel title={title} />
        </StyledMainHeader>
    );
}

export default MainHeader;
