import { useNavigate, useParams } from 'react-router-dom';
import withReduxDataFetching from 'src/component/hoc/widthReduxDataFetch';
import BOARD_ROUTES from 'src/constant/route';
import SingleBoard from 'src/module/singleBoard';
import { getBoard, getPriorities, getStages } from 'src/store/board/action';
import {
    boardSelector,
    boardSelectorState,
    prioritiesSelector,
    stagesSelector,
} from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { BoardProvider } from './context';

function BoardPage() {
    return (
        <BoardProvider>
            <SingleBoard />
        </BoardProvider>
    );
}

export default () => {
    const { id } = useParams() as { id: string };
    const { board } = useAppSelector(boardSelectorState);
    const navigate = useNavigate();
    if (!id) {
        navigate(BOARD_ROUTES.boards);
    }

    let fetchArr = [
        {
            action: () => getBoard({ id }),
            selector: boardSelector,
        },
        {
            action: () => getStages({ id }),
            selector: stagesSelector,
        },
        {
            action: () => getPriorities({ id }),
            selector: prioritiesSelector,
        },
    ];
    if (board.data.id === id) {
        fetchArr = [];
    }
    return withReduxDataFetching(fetchArr, true)(BoardPage);
};
