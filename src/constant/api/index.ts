export const FILE_UPLOAD_BASE_URL =
    'https://task-board-bucket.s3.us-east-1.amazonaws.com';

export const AUTH_API = {
    SIGN_UP: '/auth/signup',
    LOG_IN: '/auth/login',
    LOG_OUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/token',
    RESET_PASSWORD: '/auth/reset_password',
    UPDATE_PASSWORD: '/auth/update_password',
    LOGIN_GOOGLE: '/auth/google',
};

const BOARD_API = {
    ADD_BOARD: '/board',
    GET_BOARD: '/board',
    GET_BOARDS: '/boards',
    REMOVE_BOARD: '/board',
    GET_PRIORITIES: '/board/priorities',
};

export const STAGE_API = {
    ADD: '/stage',
    GET_SINGLE: '/stage',
    GET_ALL: '/stages',
    REMOVE: '/stage',
};

export const TASK_API = {
    ADD: '/task',
    EDIT: '/task',
    GET_SINGLE: '/task',
    GET_ALL: '/tasks',
    SEARCH: '/tasks/search',
    DELETE: '/task',
    ADD_SUBTASK: '/task/subtask',
};

export const COMMENT_API = {
    ADD: '/comment',
    EDIT: '/comment',
    DELETE: '/comment',
    GET_SUB_COMMENT: '/comment/replies',
    // ADD_SUBTASK: '/task/subtask',
    // EDIT: '/task',
    // GET_SINGLE: '/task',
    // GET_ALL: '/tasks',
    // DELETE: '/task',
};

export const PRIORITY_API = {
    ADD: '/priority',
    GET_SINGLE: '/priority',
    GET_ALL: '/priorities',
    REMOVE: '/priority',
};

export default BOARD_API;
