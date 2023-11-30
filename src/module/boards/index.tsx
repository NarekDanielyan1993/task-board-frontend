import { Button, Flex } from '@chakra-ui/react';
import Loader from 'src/component/loader';
import useToggle from 'src/hooks/useToggle';
import { useBoardsContext } from 'src/pages/boards/context';
import BoardCreateDialog from './boardCreateDialog';
import BoardList from './boardList';
import StyledBoardsContainer from './style';

function Boards() {
    const { value, toggle } = useToggle(false);
    const { cards, isBoardsLoading } = useBoardsContext();
    return (
        <>
            {isBoardsLoading && <Loader />}
            <Flex display="flex" justify="center" mb={8}>
                {value && (
                    <BoardCreateDialog
                        isOpen={value}
                        onClose={() => toggle()}
                        title="Create Board"
                    />
                )}
                <Button onClick={() => toggle()} variant="primary">
                    create
                </Button>
            </Flex>
            <StyledBoardsContainer>
                <BoardList cards={cards} />
            </StyledBoardsContainer>
        </>
    );
}

export default Boards;
