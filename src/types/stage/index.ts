import { ADD_STAGE, DELETE_STAGE, GET_STAGES } from 'src/store/board/action';
import { ITask } from '..';

export interface IStage {
    id: string;
    name: string;
    color: string;
    listPosition: number;
    tasks: ITask[];
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

export interface IAddStagePayload {
    name: string;
    color: string;
    boardId: string;
    listPosition: number;
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
