import { promiseActionFactory } from "@teroneko/redux-saga-promise";
import type { IAddBoardAction, IAddBoardPayload, IGetBoardsAction, IGetBoardsSuccessAction, IGetBoardsSuccessPayload, IRemoveBoardAction, IRemoveBoardPayload } from "types/boards";

export const GET_BOARDS = 'GET_BOARDS';
export const GET_BOARDS_INIT = 'GET_BOARDS_INIT';
export const GET_BOARDS_SUCCESS = 'GET_BOARDS_SUCCESS';
export const GET_BOARDS_FAILURE = 'GET_BOARDS_FAILURE';
export const ADD_BOARD = 'ADD_BOARD';
export const REMOVE_BOARD = 'REMOVE_BOARD';

export const getBoards = (): IGetBoardsAction => ({
    type: GET_BOARDS,
});

export const addBoardPromise =
    promiseActionFactory<IAddBoardAction>().create<IAddBoardPayload>(ADD_BOARD);

export const removeBoard = (data: IRemoveBoardPayload): IRemoveBoardAction => ({
    type: REMOVE_BOARD,
    payload: data,
});

export const getBoardsSuccess = (
    data: IGetBoardsSuccessPayload
): IGetBoardsSuccessAction => ({
    type: GET_BOARDS_SUCCESS,
    payload: data,
});
