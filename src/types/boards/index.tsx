import {
    ADD_BOARD,
    GET_BOARDS,
    GET_BOARDS_FAILURE,
    GET_BOARDS_INIT,
    GET_BOARDS_SUCCESS,
    REMOVE_BOARD,
} from 'src/store/boards/action';
import type { IBoard } from 'src/types/board';

export interface IBoardsState {
    boards: {
        isLoading: boolean;
        isFetched: boolean;
        data: IBoard[];
    };
    isLoading: boolean;
}

export interface IBoardCreate {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

// Store
export type GET_BOARDS_TYPE = typeof GET_BOARDS;
export type GET_BOARDS_INIT_TYPE = typeof GET_BOARDS_INIT;
export type GET_BOARDS_SUCCESS_TYPE = typeof GET_BOARDS_SUCCESS;
export type GET_BOARDS_FAILURE_TYPE = typeof GET_BOARDS_FAILURE;
export type ADD_BOARD_TYPES = typeof ADD_BOARD;
export type REMOVE_BOARD_TYPE = typeof REMOVE_BOARD;

export interface IAddBoardPayload {
    name: string;
}

export interface IAddBoardAction {
    type: ADD_BOARD_TYPES;
    payload: IAddBoardPayload;
}

export interface IGetBoardsAction {
    type: GET_BOARDS_TYPE;
}

export interface IGetBoardsInitAction {
    type: GET_BOARDS_INIT_TYPE;
}

export interface IGetBoardsSuccessPayload {
    board: IBoard[];
}

export interface IGetBoardsSuccessAction {
    type: GET_BOARDS_SUCCESS_TYPE;
    payload: IGetBoardsSuccessPayload;
}

export interface IRemoveBoardPayload {
    id: string;
}

export interface IRemoveBoardAction {
    type: REMOVE_BOARD_TYPE;
    payload: IRemoveBoardPayload;
}
