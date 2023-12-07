/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { arrayMove } from '@dnd-kit/sortable';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IComment,
    IDeleteStagePayload,
    IDeleteSubTaskPayload,
    IDeleteTaskPayload,
    IGetSubCommentResponse,
    IPriority,
    ISelectProps,
    IStage,
    ITask,
} from 'src/types';
import { IBoard, IBoardState } from 'src/types/board';
import { IDndTask } from 'src/types/dnd';
import {
    addCommentsToTask,
    findCommentAndRemove,
    findCommentAndUpdate,
} from './helper';

const initialState: IBoardState = {
    isLoading: false,
    isSearchTaskSLoading: false,
    isSubtaskLoading: false,
    isStageLoading: false,
    isCommentLoading: false,
    board: {
        isLoading: false,
        isFetched: false,
        data: {} as IBoard,
    },
    stages: {
        isLoading: false,
        isFetched: false,
        data: [] as IStage[],
    },
    tasks: {
        isLoading: false,
        isFetched: false,
        data: [] as ITask[],
    },
    stagesSelect: [] as ISelectProps[],
    priorities: {
        isLoading: false,
        isFetched: false,
        data: [] as ISelectProps[],
    },
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        isBoardLoading: (
            state: IBoardState,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload;
        },
        seIsSubTaskLoading: (
            state: IBoardState,
            action: PayloadAction<boolean>
        ) => {
            state.isSubtaskLoading = action.payload;
        },
        setIsStageLoading: (
            state: IBoardState,
            action: PayloadAction<boolean>
        ) => {
            state.isStageLoading = action.payload;
        },
        setIsSearchTasksLoading: (
            state: IBoardState,
            action: PayloadAction<boolean>
        ) => {
            state.isSearchTaskSLoading = action.payload;
        },
        getBoardInit: (state: IBoardState) => {
            state.board.data = {} as IBoard;
            state.board.isFetched = false;
            state.board.isLoading = true;
        },
        getBoardSuccess: (
            state: IBoardState,
            action: PayloadAction<IBoard>
        ) => {
            state.board.data = action.payload;
            state.board.isFetched = true;
            state.board.isLoading = false;
        },
        getBoardFailure: (state: IBoardState) => {
            state.board.data = {} as IBoard;
            state.board.isFetched = true;
            state.board.isLoading = false;
        },
        getStagesInit: (state: IBoardState) => {
            state.stages.data = [];
            state.stages.isFetched = false;
            state.stages.isLoading = true;
        },
        getStagesSuccess: (
            state: IBoardState,
            action: PayloadAction<IStage[]>
        ) => {
            state.stages.data = action.payload;
            state.stages.isFetched = true;
            state.stages.isLoading = false;
            state.stagesSelect = action.payload.map((stage) => ({
                value: stage.id,
                label: stage.name,
            }));
        },
        getStagesFailure: (state: IBoardState) => {
            state.stages.data = [];
            state.stages.isFetched = true;
            state.stages.isLoading = false;
        },
        addStageSuccess: (
            state: IBoardState,
            action: PayloadAction<IStage>
        ) => {
            const newSortedStages = state.stages.data.concat({
                ...action.payload,
            });
            newSortedStages.sort(
                (a, b) =>
                    (a.listPosition as number) - (b.listPosition as number)
            );
            state.stages.data = newSortedStages;
            state.stagesSelect = newSortedStages.map((stage) => ({
                label: stage.name,
                value: stage.id,
            }));
        },
        deleteStageSuccess: (
            state: IBoardState,
            action: PayloadAction<IDeleteStagePayload>
        ) => {
            const newStages = state.stages.data.filter(
                (stage) => stage.id !== action.payload.id
            );
            state.stages.data = newStages;
            state.stagesSelect = newStages.map((stage) => ({
                label: stage.name,
                value: stage.id,
            }));
        },
        getPrioritiesInit: (state: IBoardState) => {
            state.priorities.data = [];
            state.priorities.isFetched = false;
            state.priorities.isLoading = true;
        },
        getPrioritiesSuccess: (
            state: IBoardState,
            action: PayloadAction<IPriority[]>
        ) => {
            state.priorities.data = action.payload.map((priority) => ({
                value: priority.id,
                label: priority.name,
            }));
            state.priorities.isFetched = true;
            state.priorities.isLoading = false;
        },
        getPrioritiesFailure: (state: IBoardState) => {
            state.priorities.data = [];
            state.priorities.isFetched = true;
            state.priorities.isLoading = false;
        },
        getTasksInit: (state: IBoardState) => {
            state.tasks.data = [];
            state.tasks.isFetched = false;
            state.tasks.isLoading = true;
        },
        getTasksSuccess: (
            state: IBoardState,
            action: PayloadAction<ITask[]>
        ) => {
            state.tasks.data = action.payload;
            state.tasks.isFetched = true;
            state.tasks.isLoading = false;
        },
        getTasksFailure: (state: IBoardState) => {
            state.tasks.data = [];
            state.tasks.isFetched = true;
            state.tasks.isLoading = false;
        },
        addTaskSuccess: (state: IBoardState, action: PayloadAction<ITask>) => {
            state.tasks.data = [...state.tasks.data, action.payload];
        },
        addSubTaskSuccess: (
            state: IBoardState,
            action: PayloadAction<ITask>
        ) => {
            state.tasks.data = state.tasks.data.map((task) => {
                if (task._id === action.payload.parentId) {
                    if (!task.subTasks) {
                        task.subTasks = [];
                    }
                    task.subTasks.push({
                        id: action.payload._id,
                        summary: action.payload.summary,
                        stageId: action.payload.stageId,
                        parentId: action.payload.parentId,
                    });
                    return task;
                }
                return task;
            });
        },
        editTaskSuccess: (state: IBoardState, action: PayloadAction<ITask>) => {
            state.tasks.data = state.tasks.data.map((task) => {
                if (task._id === action.payload._id) {
                    return action.payload;
                }
                return task;
            });
            if (action.payload.parentId) {
                state.tasks.data = state.tasks.data.map((task) => {
                    if (task._id === action.payload.parentId) {
                        task.subTasks = task.subTasks.map((subtask) => {
                            if (subtask.id === action.payload._id) {
                                task.subTasks.push({
                                    id: action.payload._id,
                                    summary: action.payload.summary,
                                    stageId: action.payload.stageId,
                                    parentId: action.payload.parentId,
                                });
                            }
                            return subtask;
                        });
                    }
                    return task;
                });
            }
        },
        deleteTaskSuccess: (
            state: IBoardState,
            action: PayloadAction<IDeleteTaskPayload>
        ) => {
            state.tasks.data = state.tasks.data.filter(
                (task) => task._id !== action.payload.id
            );
            if (action.payload.parentId) {
                state.tasks.data = state.tasks.data.map((task) => {
                    if (task._id === action.payload.parentId) {
                        task.subTasks = task.subTasks.filter(
                            (task) => task.id !== action.payload.id
                        );
                        return task;
                    }
                    return task;
                });
            }
        },
        searchTasksSuccess: (
            state: IBoardState,
            action: PayloadAction<ITask[]>
        ) => {
            state.tasks.data = action.payload;
        },
        switchTaskBetweenStages: (
            state: IBoardState,
            action: PayloadAction<IDndTask>
        ) => {
            const { sourceIndex, stageId, destinationIndex, type } =
                action.payload;
            if (type === 'task' && sourceIndex && destinationIndex) {
                state.tasks.data = state.tasks.data.map((task, index) => {
                    if (index === sourceIndex) {
                        return {
                            ...task,
                            stageId: state.tasks.data[destinationIndex].stageId,
                        };
                    }
                    return task;
                });
                arrayMove(state.tasks.data, sourceIndex, destinationIndex);
            }
            if (type === 'stage') {
                console.log(stageId);
                state.tasks.data = state.tasks.data.map((task, index) => {
                    if (index === sourceIndex) {
                        return {
                            ...task,
                            stageId,
                        };
                    }
                    return task;
                });
                arrayMove(state.tasks.data, sourceIndex, sourceIndex);
            }
        },
        deleteSubTaskSuccess: (
            state: IBoardState,
            action: PayloadAction<IDeleteSubTaskPayload>
        ) => {
            state.tasks.data = state.tasks.data.filter((task) => {
                return task._id === action.payload.id;
            });
            if (action.payload.parentId) {
                state.tasks.data = state.tasks.data.map((task) => {
                    if (task._id === action.payload.parentId) {
                        task.subTasks.filter(
                            (subtask) => subtask.id !== action.payload.id
                        );
                    }
                    return task;
                });
            }
        },
        isCommentLoading: (
            state: IBoardState,
            action: PayloadAction<boolean>
        ) => {
            state.isCommentLoading = action.payload;
        },
        // addCommentSuccess: (
        //     state: IBoardState,
        //     action: PayloadAction<IComment>
        // ) => {
        //     const selectedStage = state.stages.data.find((stage) =>
        //         stage.tasks.some((task) => task.id === action.payload.taskId)
        //     ) as IStage;
        //     state.stages.data = state.stages.data.map((stage) => {
        //         if (stage.id === selectedStage.id) {
        //             stage.tasks = stage.tasks.map((task) => {
        //                 if (task.id === action.payload.taskId) {
        //                     if (!task.comments) {
        //                         task.comments = [];
        //                     }
        //                     console.log(task.comments);
        //                     task.comments = addCommentsToTask(
        //                         task.comments,
        //                         action.payload.parentId,
        //                         [action.payload],
        //                         action.payload.ty
        //                     );
        //                 }
        //                 return task;
        //             });
        //         }
        //         return stage;
        //     });
        // },
        editCommentSuccess: (
            state: IBoardState,
            action: PayloadAction<IComment>
        ) => {
            state.tasks.data = state.tasks.data.map((task) => {
                if (task._id === action.payload.taskId) {
                    task.comments = findCommentAndUpdate(
                        task.comments,
                        action.payload
                    );
                }
                return task;
            });
        },
        deleteCommentSuccess: (
            state: IBoardState,
            action: PayloadAction<IComment>
        ) => {
            state.tasks.data = state.tasks.data.map((task) => {
                if (task._id === action.payload.taskId) {
                    task.comments = findCommentAndRemove(
                        task.comments,
                        action.payload.id
                    );
                }
                return task;
            });
        },
        getSubCommentsSuccess: (
            state: IBoardState,
            action: PayloadAction<IGetSubCommentResponse>
        ) => {
            state.tasks.data = state.tasks.data.map((task) => {
                if (task._id === action.payload.taskId) {
                    task.comments = addCommentsToTask(
                        task.comments,
                        action.payload.parentId,
                        action.payload.comments,
                        action.payload.type
                    );
                }
                return task;
            });
        },
    },
});

export const {
    isBoardLoading,
    getBoardInit,
    getBoardSuccess,
    getBoardFailure,

    getPrioritiesInit,
    getPrioritiesSuccess,
    getPrioritiesFailure,

    setIsStageLoading,
    getStagesFailure,
    getStagesInit,
    getStagesSuccess,
    addStageSuccess,
    deleteStageSuccess,

    getTasksInit,

    getTasksSuccess,
    getTasksFailure,
    addTaskSuccess,
    editTaskSuccess,
    deleteTaskSuccess,
    switchTaskBetweenStages,
    searchTasksSuccess,
    setIsSearchTasksLoading,

    addSubTaskSuccess,
    deleteSubTaskSuccess,
    seIsSubTaskLoading,

    isCommentLoading,
    editCommentSuccess,
    deleteCommentSuccess,
    getSubCommentsSuccess,
} = boardSlice.actions;

export default boardSlice.reducer;
