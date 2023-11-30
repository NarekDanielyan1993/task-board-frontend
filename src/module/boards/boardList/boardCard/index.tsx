import BOARD_ROUTES from 'src/constant/route';
import { useBoardsContext } from 'src/pages/boards/context';

import IconButton from 'src/component/button/iconButton';
import Link from 'src/component/button/link';
import {
    StyledBoardCard,
    StyledCardActions,
    StyledCardContent,
    StyledCardContentText,
    StyledCardHeader,
} from './style';

function BoardCard({ text, id }: { text: string; id: string }) {
    const { deleteBoard } = useBoardsContext();
    return (
        <StyledBoardCard>
            <StyledCardHeader>
                <IconButton
                    ariaLabel="delete"
                    iconName="delete"
                    onClick={() => deleteBoard({ id })}
                />
            </StyledCardHeader>
            <StyledCardContent>
                <StyledCardContentText>{text}</StyledCardContentText>
            </StyledCardContent>
            <StyledCardActions>
                <Link to={`${BOARD_ROUTES.board}/${id}`} variant="secondary">
                    explore board
                </Link>
            </StyledCardActions>
        </StyledBoardCard>
    );
}

export default BoardCard;
