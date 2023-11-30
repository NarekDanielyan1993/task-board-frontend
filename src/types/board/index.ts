/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET_BOARD, GET_PRIORITIES, GET_STAGES } from 'src/store/board/action';
import { ISelectProps, IStage } from '..';

export interface IBoard {
    id: string;
    name: string;
}

export interface IPriority {
    id: string;
    name: string;
}

// STORE

export type GET_BOARD_TYPE = typeof GET_BOARD;

export type GET_STAGES_TYPE = typeof GET_STAGES;

export type GET_PRIORITIES_TYPE = typeof GET_PRIORITIES;

export interface IGetBoardPayload {
    id: string;
}

export interface IGetBoardAction {
    type: GET_BOARD_TYPE;
    payload: IGetBoardPayload;
}

export interface IGetPrioritiesPayload {
    id: string;
}

export interface IGetPrioritiesAction {
    type: GET_PRIORITIES_TYPE;
    payload: IGetPrioritiesPayload;
}

export interface IBoardState {
    isLoading: boolean;
    isSubtaskLoading: boolean;
    isStageLoading: boolean;
    isCommentLoading: boolean;
    isSearchTaskSLoading: boolean;
    board: {
        isLoading: boolean;
        isFetched: boolean;
        data: IBoard;
    };
    stages: {
        isLoading: boolean;
        isFetched: boolean;
        data: IStage[];
    };
    stagesSelect: ISelectProps[];
    priorities: {
        isLoading: boolean;
        isFetched: boolean;
        data: ISelectProps[];
    };
}
