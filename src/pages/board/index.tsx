import { useNavigate, useParams } from 'react-router-dom';
import withReduxDataFetching from 'src/component/hoc/widthReduxDataFetch';
import BOARD_ROUTES from 'src/constant/route';
import SingleBoard from 'src/module/singleBoard';

import {
    getBoard,
    getPriorities,
    getStages,
    getTasks,
} from 'src/store/board/action';
import {
    boardSelector,
    prioritiesSelector,
    stagesSelector,
    tasksSelector,
} from 'src/store/board/selector';
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
    const navigate = useNavigate();
    if (!id) {
        navigate(BOARD_ROUTES.boards);
    }

    const fetchArr = [
        {
            action: () => getBoard({ id }),
            selector: boardSelector,
        },
        {
            action: () => getStages({ id }),
            selector: stagesSelector,
        },
        {
            action: () => getTasks(),
            selector: tasksSelector,
        },
        {
            action: () => getPriorities({ id }),
            selector: prioritiesSelector,
        },
    ];
    return withReduxDataFetching(fetchArr, true)(BoardPage);
};
