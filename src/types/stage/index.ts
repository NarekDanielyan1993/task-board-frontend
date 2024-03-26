import { ADD_STAGE, DELETE_STAGE, GET_STAGES } from 'src/store/board/action';

export interface IStage {
    _id: string;
    name: string;
    color: string;
    boardId: string;
    listPosition: number;
}

// store

export type GET_STAGES_TYPE = typeof GET_STAGES;
export type ADD_STAGE_TYPE = typeof ADD_STAGE;
export type DELETE_STAGE_TYPE = typeof DELETE_STAGE;

export interface IGetStagesPayload {
    id: string;
}

export interface IGetStagesAction {
    type: GET_STAGES_TYPE;
    payload: IGetStagesPayload;
}

export interface IUpdatedStagePosition {
    id: string;
    position: number;
}

export interface IAddStagePayload {
    name: string;
    color: string;
    boardId: string;
    listPosition: number;
    updatedStagePositions: IUpdatedStagePosition[] | null;
}

export interface IAddStageAction {
    type: ADD_STAGE_TYPE;
    payload: IAddStagePayload;
}

export interface IDeleteStagePayload {
    id: string;
}

export interface IDeleteStageAction {
    type: DELETE_STAGE_TYPE;
    payload: IDeleteStagePayload;
}
