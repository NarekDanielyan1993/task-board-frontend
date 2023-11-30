/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    IComment,
    IDeleteStagePayload,
    IDeleteSubTaskPayload,
    IDeleteTaskPayload,
    IGetSubCommentResponse,
    IPriority,
    ISearchTaskResponse,
    ISelectProps,
    IStage,
    ITask,
} from 'src/types';
import { IBoard, IBoardState } from 'src/types/board';
import { IDropData } from 'src/types/dnd';
import { isExists } from 'src/utills/helper';
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
                tasks: [],
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
        addTaskSuccess: (state: IBoardState, action: PayloadAction<ITask>) => {
            state.stages.data = state.stages.data.map((stage) => {
                if (stage.id === action.payload.stageId) {
                    if (!stage.tasks) {
                        stage.tasks = [];
                    }
                    stage.tasks.push(action.payload);
                    return stage;
                }
                return stage;
            });
        },
        addSubTaskSuccess: (
            state: IBoardState,
            action: PayloadAction<ITask>
        ) => {
            state.stages.data = state.stages.data.map((stage) => {
                if (
                    stage.id === action.payload.stageId &&
                    isExists(stage.tasks)
                ) {
                    stage.tasks.push(action.payload);
                    stage.tasks = stage.tasks.map((task) => {
                        if (task.id === action.payload.parentId) {
                            if (!task.subTasks) {
                                task.subTasks = [];
                            }
                            task.subTasks.push({
                                id: action.payload.id,
                                summary: action.payload.summary,
                                stageId: action.payload.stageId,
                                parentId: action.payload.parentId,
                            });
                            return task;
                        }
                        return task;
                    });
                    return stage;
                }
                return stage;
            });
        },
        editTaskSuccess: (state: IBoardState, action: PayloadAction<ITask>) => {
            state.stages.data = state.stages.data.map((stage) => {
                if (stage.tasks.some((task) => task.id === action.payload.id)) {
                    if (stage.id === action.payload.stageId) {
                        stage.tasks = stage.tasks.map((task) => {
                            if (task.id === action.payload.id) {
                                return action.payload;
                            }
                            return task;
                        });
                        return stage;
                    }
                    stage.tasks = stage.tasks.filter(
                        (task) => task.id !== action.payload.id
                    );
                    const newStage = state.stages.data.find(
                        (s) => s.id === action.payload.stageId
                    );
                    if (newStage) {
                        newStage.tasks.push(action.payload);
                    }
                    return stage;
                }
                return stage;
            });
        },
        deleteTaskSuccess: (
            state: IBoardState,
            action: PayloadAction<IDeleteTaskPayload>
        ) => {
            state.stages.data = state.stages.data.map((stage) => {
                if (stage.id === action.payload.stageId) {
                    stage.tasks = stage.tasks.filter(
                        (task) => task.id !== action.payload.id
                    );
                    if (action.payload.parentId) {
                        stage.tasks = stage.tasks.map((task) => {
                            if (
                                task.id === action.payload.parentId &&
                                isExists(task.subTasks)
                            ) {
                                task.subTasks = task.subTasks.filter(
                                    (task) => task.id !== action.payload.id
                                );
                                return task;
                            }
                            return task;
                        });
                    }
                    return stage;
                }
                return stage;
            });
        },
        searchTasksSuccess: (
            state: IBoardState,
            action: PayloadAction<ISearchTaskResponse[]>
        ) => {
            state.stages.data = state.stages.data.map((stage) => {
                if (action.payload.some((task) => task.stageId === stage.id)) {
                    stage.tasks =
                        action.payload.find((st) => st.stageId === stage.id)
                            ?.tasks || [];
                    return stage;
                }
                stage.tasks = [];
                return stage;
            });
        },
        switchTaskBetweenStages: (
            state: IBoardState,
            action: PayloadAction<IDropData>
        ) => {
            const { id, from, to } = action.payload;
            const movedTask = state.stages.data
                .flatMap((stage) => stage.tasks)
                .find((task) => task.id === id);

            state.stages.data = state.stages.data.map((stage) => {
                if (stage.id === from && isExists<ITask>(movedTask)) {
                    stage.tasks = stage.tasks.filter(
                        (t) => t.id !== movedTask.id
                    );
                }
                if (stage.id === to && isExists(movedTask)) {
                    const taskWithNewStage = { ...movedTask, stageId: to };
                    stage.tasks.push(taskWithNewStage);
                }
                return stage;
            });

            if (isExists(movedTask) && movedTask.parentId) {
                state.stages.data.map((stage) => {
                    stage.tasks = stage.tasks.map((item) => {
                        if (item.id === movedTask.parentId && item.subTasks) {
                            item.subTasks = item.subTasks.map((task) => {
                                if (task.id === movedTask.id) {
                                    return { ...task, stageId: to };
                                }
                                return task;
                            });
                        }
                        return item;
                    });
                    return stage;
                });
            }
        },
        deleteSubTaskSuccess: (
            state: IBoardState,
            action: PayloadAction<IDeleteSubTaskPayload>
        ) => {
            state.stages.data = state.stages.data.map((stage) => {
                if (
                    stage.tasks.some(
                        (item) => item.id === action.payload.parentId
                    )
                ) {
                    stage.tasks = stage.tasks.map((task) => {
                        if (task.id === action.payload.parentId) {
                            if (task.subTasks) {
                                task.subTasks = task.subTasks.filter(
                                    (task) => task.id !== action.payload.id
                                );
                            }
                            return task;
                        }
                        return task;
                    });
                }
                if (stage.id === action.payload.stageId) {
                    stage.tasks = stage.tasks.filter(
                        (task) => task.id !== action.payload.id
                    );
                    return stage;
                }
                return stage;
            });
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
            const selectedStage = state.stages.data.find((stage) =>
                stage.tasks.some((task) => task.id === action.payload.taskId)
            ) as IStage;
            state.stages.data = state.stages.data.map((stage) => {
                if (stage.id === selectedStage.id) {
                    stage.tasks = stage.tasks.map((task) => {
                        if (task.id === action.payload.taskId) {
                            task.comments = findCommentAndUpdate(
                                task.comments,
                                action.payload
                            );
                        }
                        return task;
                    });
                }
                return stage;
            });
        },
        deleteCommentSuccess: (
            state: IBoardState,
            action: PayloadAction<IComment>
        ) => {
            console.log(action.payload);
            const selectedStage = state.stages.data.find((stage) =>
                stage.tasks.some((task) => task.id === action.payload.taskId)
            ) as IStage;
            state.stages.data = state.stages.data.map((stage) => {
                if (stage.id === selectedStage.id) {
                    stage.tasks = stage.tasks.map((task) => {
                        if (task.id === action.payload.taskId) {
                            task.comments = findCommentAndRemove(
                                task.comments,
                                action.payload.id
                            );
                        }
                        return task;
                    });
                }
                return stage;
            });
        },
        getSubCommentsSuccess: (
            state: IBoardState,
            action: PayloadAction<IGetSubCommentResponse>
        ) => {
            const selectedStage = state.stages.data.find((stage) =>
                stage.tasks.some((task) => task.id === action.payload.taskId)
            ) as IStage;
            state.stages.data = state.stages.data.map((stage) => {
                if (stage.id === selectedStage.id) {
                    stage.tasks = stage.tasks.map((task) => {
                        if (task.id === action.payload.taskId) {
                            task.comments = addCommentsToTask(
                                task.comments,
                                action.payload.parentId,
                                action.payload.comments,
                                action.payload.type
                            );
                        }
                        return task;
                    });
                }
                return stage;
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
