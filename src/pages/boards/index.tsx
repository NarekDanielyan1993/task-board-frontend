import { useCallback } from 'react';
import withReduxDataFetching from 'src/component/hoc/widthReduxDataFetch';
import Boards from 'src/module/boards';
import {
    addBoardPromise,
    getBoards,
    removeBoard,
} from 'src/store/boards/action';
import {
    boardsSelector,
    boardsSelectorBoards,
} from 'src/store/boards/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import { IAddBoardPayload, IRemoveBoardPayload } from 'src/types/boards';
import { BoardsProvider } from './context';

function BoardsPage() {
    const { data: boards } = useAppSelector(boardsSelectorBoards);
    const { isLoading } = useAppSelector(boardsSelector);
    const dispatch = useAppDispatch();

    const deleteBoard = useCallback((data: IRemoveBoardPayload) => {
        dispatch(removeBoard(data));
    }, []);

    const addBoard = useCallback((data: IAddBoardPayload) => {
        return dispatch(addBoardPromise(data));
    }, []);

    return (
        <BoardsProvider
            values={{
                deleteBoard,
                addBoard,
                isBoardsLoading: isLoading,
                cards: boards,
            }}
        >
            <Boards />
        </BoardsProvider>
    );
}

export default () =>
    withReduxDataFetching([
        {
            action: () => getBoards(),
            selector: boardsSelectorBoards,
        },
    ])(BoardsPage);
