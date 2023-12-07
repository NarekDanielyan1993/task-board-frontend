import { AddEditCommentFormType } from 'src/module/singleBoard/taskCreateEdit/taskCreateEditModal/comment/commentItem/commentCreateEdit/validationSchema';
import {
    ADD_COMMENT,
    ADD_SUB_TASK,
    ADD_TASK,
    DELETE_COMMENT,
    DELETE_SUB_TASK,
    DELETE_TASK,
    EDIT_COMMENT,
    EDIT_TASK,
    GET_SUB_COMMENT,
    GET_TASKS,
    SEARCH_TASKS,
    SWITCH_STAGE_TASK,
} from 'src/store/board/action';
import { ISelectProps } from '..';

export interface IAttachment {
    name: string;
    url: string;
    id?: number;
    isUploaded: boolean;
}

export interface IComment {
    id: string;
    text: string;
    author: string;
    date: string;
    replyCount: number;
    taskId: string;
    parentId: string | null;
    comments?: IComment[];
}

export interface ISubTask {
    summary: string;
    id: string;
    stageId: string;
    parentId: string;
}

export interface IAddEditTask {
    summary: string;
    _id: string;
    description: string;
    due_date: Date;
    priorityId: ISelectProps | null;
    stageId: ISelectProps | null;
    comments: string[];
    attachments: IAttachment[];
    removedAttachments?: IAttachment[];
    appendAttachments?: IAttachment[];
    subtasks?: ISubTask[];
}

export interface ICommentCreateEdit {
    onCancel?: () => void;
    onAction: (data: AddEditCommentFormType) => void;
    text?: string;
}

export interface ITask {
    summary: string;
    _id: string;
    taskNumber: number;
    description: string;
    due_date: string;
    priorityId: string;
    stageId: string;
    parentId: string;
    comments: IComment[];
    attachments: IAttachment[];
    removedAttachments?: IAttachment[];
    subTasks: ISubTask[];
}

export interface IAttachmentPreviewList {
    images: IAttachment[];
    onRemove: (attachment: IAttachment, index: number) => void;
    register: any;
}

export interface IAttachmentPreview {
    image: IAttachment;
    index: number;
    onFullscreen: () => void;
    onRemove: (attachment: IAttachment, index: number) => void;
    register: any;
}

export interface IGetSubCommentResponse {
    taskId: string;
    parentId: string;
    comments: IComment[];
    type: 'add' | 'get';
}

// STORE

export type GET_TASKS_TYPE = typeof GET_TASKS;
export type ADD_TASK_TYPE = typeof ADD_TASK;
export type EDIT_TASK_TYPE = typeof EDIT_TASK;
export type DELETE_TASK_TYPE = typeof DELETE_TASK;
export type SWITCH_STAGE_TASK_TYPE = typeof SWITCH_STAGE_TASK;
export type SEARCH_TASKS_TYPES = typeof SEARCH_TASKS;

export type ADD_SUB_TASK_TYPE = typeof ADD_SUB_TASK;
export type DELETE_SUB_TASK_TYPE = typeof DELETE_SUB_TASK;

export type ADD_COMMENT_TYPE = typeof ADD_COMMENT;
export type EDIT_COMMENT_TYPE = typeof EDIT_COMMENT;
export type DELETE_COMMENT_TYPE = typeof DELETE_COMMENT;
export type GET_SUB_COMMENT_TYPE = typeof GET_SUB_COMMENT;

export interface IGetTasksAction {
    type: GET_TASKS_TYPE;
}

export interface IAddTaskPayload {
    summary: string;
    id: string;
    description: string;
    due_date: string;
    priorityId: string | null;
    stageId: string | null;
    comments: string[];
    attachments: IAttachment[];
    removedAttachments?: IAttachment[];
    appendAttachments?: IAttachment[];
}

export interface IAddTaskAction {
    type: ADD_TASK_TYPE;
    payload: IAddTaskPayload;
}

export interface IEditTaskPayload extends Partial<IAddTaskPayload> {
    removedAttachments?: IAttachment[];
    appendAttachments?: IAttachment[];
    id: string;
}

export interface IEditTaskAction {
    type: EDIT_TASK_TYPE;
    payload: IEditTaskPayload;
}

export interface IDeleteTaskPayload {
    id: string;
    stageId: string;
    parentId: string;
}

export interface IDeleteTaskAction {
    type: DELETE_TASK_TYPE;
    payload: IDeleteTaskPayload;
}

export interface ISwitchStageTaskPayload {
    from: string;
    to: string;
    id: string;
}

export interface ISwitchStageTaskAction {
    type: SWITCH_STAGE_TASK_TYPE;
    payload: ISwitchStageTaskPayload;
}

export interface ISearchTasksPayload {
    search: string;
}

export interface ISeachTasksAction {
    type: SEARCH_TASKS_TYPES;
    payload: ISearchTasksPayload;
}

// subtask

export interface IAddSubTaskPayload {
    summary: string;
    parentId: string;
    stageId: string;
}

export interface IAddSubTaskAction {
    type: ADD_SUB_TASK_TYPE;
    payload: IAddSubTaskPayload;
}

export interface IDeleteSubTaskPayload {
    id: string;
    stageId: string;
    parentId: string;
}

export interface IDeleteSubTaskAction {
    type: DELETE_SUB_TASK_TYPE;
    payload: IDeleteSubTaskPayload;
}

export interface IAddCommentPayload {
    text: string;
    parentId: string | null;
    taskId: string | null;
}

export interface IAddCommentAction {
    type: ADD_COMMENT_TYPE;
    payload: IAddCommentPayload;
}

export interface IEditCommentPayload {
    text: string;
    taskId: string;
    id: string;
}

export interface IEditCommentAction {
    type: EDIT_COMMENT_TYPE;
    payload: IEditCommentPayload;
}

export interface IDeleteCommentPayload {
    id: string;
}

export interface IDeleteCommentAction {
    type: DELETE_COMMENT_TYPE;
    payload: IDeleteCommentAction;
}

export interface IGetSubCommentPayload {
    parentId: string;
    taskId: string;
    type: 'add' | 'get';
}

export interface IGetSubCommentAction {
    type: GET_SUB_COMMENT_TYPE;
    payload: IGetSubCommentPayload;
}
