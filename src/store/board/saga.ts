import { PayloadAction } from '@reduxjs/toolkit';
import { implementPromiseAction } from '@teroneko/redux-saga-promise';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import BOARD_API, {
    COMMENT_API,
    PRIORITY_API,
    STAGE_API,
    TASK_API,
} from 'src/constant/api';
import {
    IAddTaskPayload,
    IComment,
    IDeleteStagePayload,
    IDeleteSubTaskPayload,
    IDeleteTaskPayload,
    IGetSubCommentPayload,
    IGetSubCommentResponse,
    ISearchTasksPayload,
    IStage,
    ITask,
} from 'src/types';
import { IBoard, IGetBoardPayload, IPriority } from 'src/types/board';
import { IDropData } from 'src/types/dnd';
import { apiSagaRequest } from 'src/utills/apiRequest';
import {
    ADD_COMMENT,
    ADD_STAGE,
    ADD_SUB_TASK,
    ADD_TASK,
    DELETE_STAGE,
    DELETE_SUB_TASK,
    DELETE_TASK,
    EDIT_TASK,
    GET_BOARD,
    GET_PRIORITIES,
    GET_STAGES,
    GET_SUB_COMMENT,
    GET_TASKS,
    SEARCH_TASKS,
    SWITCH_STAGE_TASK,
    addCommentPromise,
    addTaskPromise,
    deleteCommentPromise,
    editCommentPromise,
    editTaskPromise,
    getSubCommentsPromise,
} from './action';
import {
    addCommentSuccess,
    addStageSuccess,
    addSubTaskSuccess,
    addTaskSuccess,
    deleteCommentSuccess,
    deleteStageSuccess,
    deleteSubTaskSuccess,
    deleteTaskSuccess,
    editCommentSuccess,
    editTaskSuccess,
    getBoardFailure,
    getBoardInit,
    getBoardSuccess,
    getPrioritiesInit,
    getPrioritiesSuccess,
    getStagesInit,
    getStagesSuccess,
    getSubCommentsSuccess,
    getTasksFailure,
    getTasksInit,
    getTasksSuccess,
    isBoardLoading,
    isCommentLoading,
    seIsSubTaskLoading,
    searchTasksSuccess,
    setIsSearchTasksLoading,
    setIsStageLoading,
} from './reducer';

function* getBoardGenerator(action: PayloadAction<IGetBoardPayload>) {
    yield put(getBoardInit());
    try {
        const { id } = action.payload;
        const { data }: AxiosResponse<IBoard> = yield call(
            apiSagaRequest,
            'get',
            BOARD_API.GET_BOARD,
            { params: { boardId: id } },
            { withCredentials: true }
        );
        yield put(getBoardSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(getBoardFailure());
    }
}

function* getStagesGenerator(action: PayloadAction<IGetBoardPayload>) {
    yield put(getStagesInit());
    try {
        const { id } = action.payload;
        const { data }: AxiosResponse<IStage[]> = yield call(
            apiSagaRequest,
            'get',
            STAGE_API.GET_ALL,
            { params: { id } }
        );
        yield put(getStagesSuccess(data));
    } catch (error) {
        console.log(error);
        // yield put(getStagesFailure(error));
    }
}

function* addStageGenerator(action: PayloadAction<IAddTaskPayload>) {
    yield put(setIsStageLoading(true));
    try {
        const addStageData = action.payload;
        const { data }: AxiosResponse<IStage> = yield call(
            apiSagaRequest,
            'post',
            STAGE_API.ADD,
            addStageData
        );
        yield put(addStageSuccess(data));
        yield put(setIsStageLoading(false));
    } catch (error) {
        console.log(error);
        yield put(setIsStageLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* deleteStageGenerator(action: PayloadAction<IDeleteStagePayload>) {
    yield put(setIsStageLoading(true));
    try {
        const deleteStageData = action.payload;
        yield call(apiSagaRequest, 'delete', STAGE_API.REMOVE, {
            data: { id: deleteStageData.id },
        });
        yield put(deleteStageSuccess(deleteStageData));
        yield put(setIsStageLoading(false));
    } catch (error) {
        console.log(error);
        yield put(setIsStageLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* getPrioritiesGenerator(action: PayloadAction<IGetBoardPayload>) {
    yield put(getPrioritiesInit());
    try {
        const { id } = action.payload;
        console.log(id);
        const { data }: AxiosResponse<IPriority[]> = yield call(
            apiSagaRequest,
            'get',
            PRIORITY_API.GET_ALL,
            { params: { boardId: id } }
        );
        console.log(data);
        yield put(getPrioritiesSuccess(data));
    } catch (error) {
        console.log(error);
        // yield put(addBoardFailure(error));
    }
}

function* getTasksGenerator() {
    yield put(getTasksInit());
    try {
        const { data }: AxiosResponse<ITask[]> = yield call(
            apiSagaRequest,
            'get',
            TASK_API.GET_ALL
        );
        yield put(getTasksSuccess(data));
    } catch (error) {
        console.log(error);
        yield put(getTasksFailure());
    }
}

function* addTaskGeneratorPromise(
    action: typeof addTaskPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        yield put(isBoardLoading(true));
        try {
            const addTaskData = action.payload;
            const { data }: AxiosResponse<ITask> = yield call(
                apiSagaRequest,
                'post',
                TASK_API.ADD,
                addTaskData
            );
            yield put(addTaskSuccess(data));
            yield put(isBoardLoading(false));
            return data;
        } catch (error) {
            console.log(error);
            yield put(isBoardLoading(false));
            return Promise.reject(error);
        }
    });
}

function* addTaskGenerator(action: PayloadAction<IAddTaskPayload>) {
    yield put(isBoardLoading(true));
    try {
        const addTaskData = action.payload;
        const { data }: AxiosResponse<ITask> = yield call(
            apiSagaRequest,
            'post',
            TASK_API.ADD,
            addTaskData
        );
        yield put(addTaskSuccess(data));
        yield put(isBoardLoading(false));
    } catch (error) {
        console.log(error);
        yield put(isBoardLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* editTaskGeneratorPromise(
    action: typeof editTaskPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        yield put(isBoardLoading(true));
        try {
            const editTaskData = action.payload;
            const { data }: AxiosResponse<ITask> = yield call(
                apiSagaRequest,
                'put',
                TASK_API.EDIT,
                editTaskData,
                { params: { taskId: editTaskData.id } }
            );
            yield put(editTaskSuccess(data));
            yield put(isBoardLoading(false));
            return data;
        } catch (error) {
            console.log(error);
            yield put(isBoardLoading(false));
            return null;
            // yield put(addBoardFailure(error));
        }
    });
}

function* editTaskGenerator(action: PayloadAction<IAddTaskPayload>) {
    yield put(isBoardLoading(true));
    try {
        const editTaskData = action.payload;
        const { data }: AxiosResponse<ITask> = yield call(
            apiSagaRequest,
            'put',
            TASK_API.EDIT,
            editTaskData,
            { params: { taskId: editTaskData.id } }
        );
        yield put(editTaskSuccess(data));
        yield put(isBoardLoading(false));
    } catch (error) {
        console.log(error);
        yield put(isBoardLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* deleteTaskGenerator(action: PayloadAction<IDeleteTaskPayload>) {
    yield put(isBoardLoading(true));
    try {
        const deleteTaskData = action.payload;
        yield call(apiSagaRequest, 'delete', TASK_API.DELETE, {
            data: { taskId: deleteTaskData.id },
        });
        yield put(deleteTaskSuccess(action.payload));
        yield put(isBoardLoading(false));
    } catch (error) {
        console.log(error);
        yield put(isBoardLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* searchTasksGenerator(action: PayloadAction<ISearchTasksPayload>) {
    yield put(setIsSearchTasksLoading(true));
    try {
        const searchTasksData = action.payload;
        const { data }: AxiosResponse<ITask[]> = yield call(
            apiSagaRequest,
            'get',
            TASK_API.SEARCH,
            {
                params: { search: searchTasksData.search },
            }
        );
        yield put(searchTasksSuccess(data));
        yield put(setIsSearchTasksLoading(false));
    } catch (error) {
        console.log(error);
        yield put(setIsSearchTasksLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* switchStageTaskGenerator(action: PayloadAction<IDropData>) {
    const taskData = action.payload;
    try {
        yield call(
            apiSagaRequest,
            'put',
            TASK_API.EDIT,
            { stageId: taskData.to },
            { params: { taskId: taskData.id } }
        );
    } catch (error) {
        console.log(error);
        // yield put(
        //     switchTaskBetweenStages({
        //         from: taskData.to,
        //         to: taskData.from,
        //         id: taskData.id,
        //         destinationIndex: taskData.destinationIndex,
        //         sourceIndex: taskData.sourceIndex,
        //     })
        // );
    }
}

function* addSubTaskGenerator(action: PayloadAction<IAddTaskPayload>) {
    yield put(seIsSubTaskLoading(true));
    try {
        const addSubTaskData = action.payload;
        const { data }: AxiosResponse<ITask> = yield call(
            apiSagaRequest,
            'post',
            TASK_API.ADD_SUBTASK,
            addSubTaskData
        );
        yield put(addSubTaskSuccess(data));
        yield put(seIsSubTaskLoading(false));
    } catch (error) {
        console.log(error);
        yield put(seIsSubTaskLoading(false));
        // yield put(addBoardFailure(error));
    }
}

function* deleteSubTaskGenerator(action: PayloadAction<IDeleteSubTaskPayload>) {
    yield put(seIsSubTaskLoading(true));
    try {
        const deleteTaskData = action.payload;
        yield call(apiSagaRequest, 'delete', TASK_API.DELETE, {
            data: { taskId: deleteTaskData.id },
        });
        yield put(deleteSubTaskSuccess(action.payload));
    } catch (error) {
        console.log(error);
    }
    yield put(seIsSubTaskLoading(false));
}

function* addCommentGenerator(action: PayloadAction<IAddTaskPayload>) {
    yield put(isCommentLoading(true));
    try {
        const addCommentData = action.payload;
        const { data }: AxiosResponse<IComment> = yield call(
            apiSagaRequest,
            'post',
            COMMENT_API.ADD,
            addCommentData
        );
        yield put(addCommentSuccess(data));
        yield put(isCommentLoading(false));
    } catch (error) {
        console.log(error);
        yield put(isCommentLoading(false));
    }
}

function* addCommentGeneratorPromise(
    action: typeof addCommentPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        try {
            const addCommentData = action.payload;
            const { data }: AxiosResponse<IComment> = yield call(
                apiSagaRequest,
                'post',
                COMMENT_API.ADD,
                addCommentData
            );
            console.log(data);
            if (data.parentId) {
                yield put(
                    getSubCommentsPromise({
                        parentId: data.parentId,
                        taskId: data.taskId,
                        type: 'add',
                    })
                );
                return;
            }
            yield put(addCommentSuccess(data));
        } catch (error) {
            console.log(error);
            yield put(isCommentLoading(false));
        }
    });
}

function* EditCommentGeneratorPromise(
    action: typeof editCommentPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        try {
            const editCommentData = action.payload;
            console.log(editCommentData);
            const { data }: AxiosResponse<IComment> = yield call(
                apiSagaRequest,
                'put',
                COMMENT_API.EDIT,
                editCommentData
            );
            yield put(editCommentSuccess(data));
        } catch (error) {
            console.log(error);
            yield put(isCommentLoading(false));
        }
    });
}

function* deleteCommentGeneratorPromise(
    action: typeof deleteCommentPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        try {
            const deleteCommentData = action.payload;
            console.log(deleteCommentData);
            const { data }: AxiosResponse<IComment> = yield call(
                apiSagaRequest,
                'delete',
                COMMENT_API.DELETE,
                { data: deleteCommentData }
            );
            yield put(deleteCommentSuccess(data));
            return data;
        } catch (error) {
            console.log(error);
            yield put(isCommentLoading(false));
        }
        return null;
    });
}

function* getSubCommentsGeneratorPromise(
    action: typeof getSubCommentsPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* () {
        try {
            const getSubCommentData = action.payload;
            const { data }: AxiosResponse<IComment[]> = yield call(
                apiSagaRequest,
                'get',
                COMMENT_API.GET_SUB_COMMENT,
                { params: { id: getSubCommentData.parentId } }
            );
            const subCommentData: IGetSubCommentResponse = {
                comments: data,
                parentId: getSubCommentData.parentId,
                taskId: getSubCommentData.taskId,
                type: getSubCommentData.type,
            };
            yield put(getSubCommentsSuccess(subCommentData));
            return subCommentData;
        } catch (error) {
            console.log(error);
            // yield put(isCommentLoading(false));
        }
        // yield put(isCommentLoading(false));
        return null;
    });
}

function* getSubCommentGenerator(action: PayloadAction<IGetSubCommentPayload>) {
    // yield put(isCommentLoading(true));
    try {
        const getSubCommentData = action.payload;
        const { data }: AxiosResponse<IComment[]> = yield call(
            apiSagaRequest,
            'get',
            COMMENT_API.GET_SUB_COMMENT,
            { params: { id: getSubCommentData.parentId } }
        );
        const subCommentData: IGetSubCommentResponse = {
            comments: data,
            parentId: getSubCommentData.parentId,
            taskId: getSubCommentData.taskId,
            type: getSubCommentData.type,
        };
        yield put(getSubCommentsSuccess(subCommentData));
    } catch (error) {
        console.log(error);
        // yield put(isCommentLoading(false));
    }
    // yield put(isCommentLoading(false));
}

export default function* watchBoard() {
    yield takeLatest(GET_BOARD, getBoardGenerator);

    yield takeLatest(GET_STAGES, getStagesGenerator);
    yield takeLatest(ADD_STAGE, addStageGenerator);
    yield takeLatest(DELETE_STAGE, deleteStageGenerator);

    yield takeLatest(GET_PRIORITIES, getPrioritiesGenerator);

    yield takeLatest(GET_TASKS, getTasksGenerator);
    yield takeLatest(ADD_TASK, addTaskGenerator);
    yield takeLatest(addTaskPromise, addTaskGeneratorPromise);
    yield takeLatest(EDIT_TASK, editTaskGenerator);
    yield takeLatest(editTaskPromise, editTaskGeneratorPromise);
    yield takeLatest(DELETE_TASK, deleteTaskGenerator);
    yield takeLatest(SEARCH_TASKS, searchTasksGenerator);

    yield takeLatest(ADD_SUB_TASK, addSubTaskGenerator);
    yield takeLatest(DELETE_SUB_TASK, deleteSubTaskGenerator);

    yield takeLatest(getSubCommentsPromise, getSubCommentsGeneratorPromise);
    yield takeLatest(GET_SUB_COMMENT, getSubCommentGenerator);
    yield takeLatest(ADD_COMMENT, addCommentGenerator);
    yield takeLatest(addCommentPromise, addCommentGeneratorPromise);
    yield takeLatest(editCommentPromise, EditCommentGeneratorPromise);
    yield takeLatest(deleteCommentPromise, deleteCommentGeneratorPromise);
    yield takeLatest(SWITCH_STAGE_TASK, switchStageTaskGenerator);
}
