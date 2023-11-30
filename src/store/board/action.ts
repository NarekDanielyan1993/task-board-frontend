import { promiseActionFactory } from '@teroneko/redux-saga-promise';
import {
    IAddCommentAction,
    IAddCommentPayload,
    IAddStageAction,
    IAddStagePayload,
    IAddSubTaskAction,
    IAddSubTaskPayload,
    IAddTaskAction,
    IAddTaskPayload,
    IDeleteCommentPayload,
    IDeleteStageAction,
    IDeleteStagePayload,
    IDeleteSubTaskAction,
    IDeleteSubTaskPayload,
    IDeleteTaskAction,
    IDeleteTaskPayload,
    IEditCommentPayload,
    IEditTaskAction,
    IEditTaskPayload,
    IGetBoardAction,
    IGetBoardPayload,
    IGetPrioritiesAction,
    IGetPrioritiesPayload,
    IGetStagesAction,
    IGetStagesPayload,
    IGetSubCommentAction,
    IGetSubCommentPayload,
    ISeachTasksAction,
    ISearchTasksPayload,
    ISwitchStageTaskAction,
    ISwitchStageTaskPayload,
} from 'src/types';

export const GET_PRIORITIES = 'GET_PRIORITIES';

export const GET_BOARD = 'GET_BOARD';

export const GET_STAGES = 'GET_STAGES';
export const ADD_STAGE = 'ADD_STAGE';
export const DELETE_STAGE = 'DELETE_STAGE';

export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_PROMISE = 'ADD_TASK_PROMISE';
export const EDIT_TASK_PROMISE = 'EDIT_TASK_PROMISE';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SWITCH_STAGE_TASK = 'SWITCH_STAGE_TASK';
export const ADD_SUB_TASK = 'ADD_SUB_TASK';
export const DELETE_SUB_TASK = 'DELETE_SUB_TASK';
export const SEARCH_TASKS = 'SEARCH_TASKS';

export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_PROMISE = 'ADD_COMMENT_PROMISE';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_SUB_COMMENT = 'GET_SUB_COMMENT';
export const GET_SUB_COMMENT_PROMISE = 'GET_SUB_COMMENT_PROMISE';

export const addTaskPromise =
    promiseActionFactory<void>().create<IAddTaskPayload>(ADD_TASK_PROMISE);

export const editTaskPromise =
    promiseActionFactory<void>().create<IEditTaskPayload>(EDIT_TASK_PROMISE);

export const getSubCommentsPromise =
    promiseActionFactory<void>().create<IGetSubCommentPayload>(
        GET_SUB_COMMENT_PROMISE
    );

export const addCommentPromise =
    promiseActionFactory<void>().create<IAddCommentPayload>(
        ADD_COMMENT_PROMISE
    );

export const editCommentPromise =
    promiseActionFactory<void>().create<IEditCommentPayload>(EDIT_COMMENT);

export const deleteCommentPromise =
    promiseActionFactory<void>().create<IDeleteCommentPayload>(DELETE_COMMENT);

export const getStages = (data: IGetStagesPayload): IGetStagesAction => {
    return {
        type: GET_STAGES,
        payload: data,
    };
};

export const addStage = (data: IAddStagePayload): IAddStageAction => {
    return {
        type: ADD_STAGE,
        payload: data,
    };
};

export const deleteStage = (data: IDeleteStagePayload): IDeleteStageAction => {
    return {
        type: DELETE_STAGE,
        payload: data,
    };
};

export const getBoard = (data: IGetBoardPayload): IGetBoardAction => {
    return {
        type: GET_BOARD,
        payload: data,
    };
};

export const getPriorities = (
    data: IGetPrioritiesPayload
): IGetPrioritiesAction => {
    return {
        type: GET_PRIORITIES,
        payload: data,
    };
};

export const addTask = (data: IAddTaskPayload): IAddTaskAction => {
    return {
        type: ADD_TASK,
        payload: data,
    };
};

export const searchTasks = (data: ISearchTasksPayload): ISeachTasksAction => {
    return {
        type: SEARCH_TASKS,
        payload: data,
    };
};

export const switchStageTask = (
    data: ISwitchStageTaskPayload
): ISwitchStageTaskAction => {
    return {
        type: SWITCH_STAGE_TASK,
        payload: data,
    };
};

export const addSubTask = (data: IAddSubTaskPayload): IAddSubTaskAction => {
    return {
        type: ADD_SUB_TASK,
        payload: data,
    };
};

export const editTask = (data: IEditTaskPayload): IEditTaskAction => {
    return {
        type: EDIT_TASK,
        payload: data,
    };
};

export const deleteTask = (data: IDeleteTaskPayload): IDeleteTaskAction => {
    return {
        type: DELETE_TASK,
        payload: data,
    };
};

export const deleteSubTask = (
    data: IDeleteSubTaskPayload
): IDeleteSubTaskAction => {
    return {
        type: DELETE_SUB_TASK,
        payload: data,
    };
};

export const addComment = (data: IAddCommentPayload): IAddCommentAction => {
    return {
        type: ADD_COMMENT,
        payload: data,
    };
};

export const getSubComment = (
    data: IGetSubCommentPayload
): IGetSubCommentAction => {
    return {
        type: GET_SUB_COMMENT,
        payload: data,
    };
};
