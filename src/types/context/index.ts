import {
    IAddCommentPayload,
    IAddStagePayload,
    IAddSubTaskPayload,
    IAddTaskPayload,
    IBoard,
    IDeleteCommentPayload,
    IDeleteStagePayload,
    IDeleteSubTaskPayload,
    IDeleteTaskPayload,
    IEditCommentPayload,
    IEditTaskPayload,
    IGetSubCommentPayload,
    ISearchTasksPayload,
    ITask,
} from '..';
import {
    IAddBoardAction,
    IAddBoardPayload,
    IRemoveBoardPayload,
} from '../boards';
import { IDropData } from '../dnd';

export interface IBoardsContext {
    deleteBoard: (data: IRemoveBoardPayload) => void;
    addBoard: (data: IAddBoardPayload) => Promise<IAddBoardAction>;
    isBoardsLoading: boolean;
    cards: IBoard[];
}

export interface IBoardContext {
    openEditTaskDialog: null | ITask;
    addStageHandler: (data: IAddStagePayload) => void;
    deleteStageHandler: (data: IDeleteStagePayload) => void;
    setOpenEditTaskDialog: (data: ITask | null) => void;
    addTaskHandler: (taskData: IAddTaskPayload) => void;
    searchTasksHandler: (searchData: ISearchTasksPayload) => void;
    addTaskHandlerPromise: (taskData: IAddTaskPayload) => void;
    editTaskHandler: (taskData: IEditTaskPayload) => void;
    editTaskHandlerPromise: (taskData: IEditTaskPayload) => void;
    switchTaskBetweenStagesHandler: (data: IDropData) => void;
    addSubTaskHandler: (taskData: IAddSubTaskPayload) => void;
    deleteTaskHandler: (taskData: IDeleteTaskPayload) => void;
    deleteSubTaskHandler: (taskData: IDeleteSubTaskPayload) => void;
    addCommentHandlerPromise: (commentData: IAddCommentPayload) => void;
    addCommentHandler: (commentData: IAddCommentPayload) => void;
    editCommentHandler: (commentData: IEditCommentPayload) => void;
    deleteCommentHandler: (commentData: IDeleteCommentPayload) => void;
    getSubCommentsHandler: (commentData: IGetSubCommentPayload) => void;
}
