import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';
import {
    addComment,
    addCommentPromise,
    addStage,
    addSubTask,
    addTask,
    addTaskPromise,
    deleteCommentPromise,
    deleteStage,
    deleteSubTask,
    deleteTask,
    editCommentPromise,
    editTask,
    editTaskPromise,
    getSubCommentsPromise,
    searchTasks,
    switchStageTask,
} from 'src/store/board/action';
import { useAppDispatch } from 'src/store/createStore';
import {
    IAddCommentPayload,
    IAddStagePayload,
    IAddSubTaskPayload,
    IAddTaskPayload,
    IDeleteCommentPayload,
    IDeleteStagePayload,
    IDeleteSubTaskPayload,
    IDeleteTaskPayload,
    IEditCommentPayload,
    IEditTaskPayload,
    IGetSubCommentPayload,
    ISearchTasksPayload,
    ITask,
} from 'src/types';
import { IBoardContext } from 'src/types/context';
import { IDropData } from 'src/types/dnd';

const BoardContext = createContext<IBoardContext | undefined>(undefined);

function BoardProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const [openEditTaskDialog, setOpenEditTaskDialog] = useState<ITask | null>(
        null
    );

    const addStageHandler = useCallback((stageData: IAddStagePayload) => {
        dispatch(addStage(stageData));
    }, []);

    const deleteStageHandler = useCallback((stageData: IDeleteStagePayload) => {
        dispatch(deleteStage(stageData));
    }, []);

    const addTaskHandler = useCallback((taskData: IAddTaskPayload) => {
        dispatch(addTask(taskData));
    }, []);

    const searchTasksHandler = useCallback(
        (searchData: ISearchTasksPayload) => {
            dispatch(searchTasks(searchData));
        },
        []
    );

    const addTaskHandlerPromise = useCallback((taskData: IAddTaskPayload) => {
        return dispatch(addTaskPromise(taskData));
    }, []);

    const editTaskHandler = useCallback((taskData: IEditTaskPayload) => {
        dispatch(editTask(taskData));
    }, []);

    const editTaskHandlerPromise = useCallback((taskData: IEditTaskPayload) => {
        return dispatch(editTaskPromise(taskData));
    }, []);

    const addSubTaskHandler = useCallback((taskData: IAddSubTaskPayload) => {
        dispatch(addSubTask(taskData));
    }, []);

    const deleteTaskHandler = useCallback((taskData: IDeleteTaskPayload) => {
        dispatch(deleteTask(taskData));
    }, []);

    const switchTaskBetweenStagesHandler = useCallback(
        (taskData: IDropData) => {
            dispatch(switchStageTask(taskData));
        },
        []
    );

    const addCommentHandlerPromise = useCallback(
        (commentData: IAddCommentPayload) => {
            return dispatch(addCommentPromise(commentData));
        },
        []
    );

    const addCommentHandler = useCallback((commentData: IAddCommentPayload) => {
        return dispatch(addComment(commentData));
    }, []);

    const editCommentHandler = useCallback(
        (commentData: IEditCommentPayload) => {
            return dispatch(editCommentPromise(commentData));
        },
        []
    );

    const deleteCommentHandler = useCallback(
        (commentData: IDeleteCommentPayload) => {
            return dispatch(deleteCommentPromise(commentData));
        },
        []
    );

    const getSubCommentsHandler = useCallback(
        (commentData: IGetSubCommentPayload) => {
            return dispatch(getSubCommentsPromise(commentData));
        },
        []
    );

    const deleteSubTaskHandler = useCallback(
        (taskData: IDeleteSubTaskPayload) => {
            dispatch(deleteSubTask(taskData));
        },
        []
    );

    const contextValue = useMemo(() => {
        return {
            addStageHandler,
            deleteStageHandler,
            openEditTaskDialog,
            setOpenEditTaskDialog,
            deleteSubTaskHandler,
            addTaskHandler,
            searchTasksHandler,
            addTaskHandlerPromise,
            editTaskHandler,
            editTaskHandlerPromise,
            addSubTaskHandler,
            deleteTaskHandler,
            switchTaskBetweenStagesHandler,
            addCommentHandler,
            addCommentHandlerPromise,
            editCommentHandler,
            deleteCommentHandler,
            getSubCommentsHandler,
        };
    }, [
        addStageHandler,
        deleteStageHandler,
        openEditTaskDialog,
        setOpenEditTaskDialog,
        deleteSubTaskHandler,
        addTaskHandler,
        searchTasksHandler,
        editTaskHandler,
        editTaskHandlerPromise,
        addTaskHandlerPromise,
        addSubTaskHandler,
        deleteTaskHandler,
        switchTaskBetweenStagesHandler,
        addCommentHandler,
        addCommentHandlerPromise,
        editCommentHandler,
        deleteCommentHandler,
        getSubCommentsHandler,
    ]);

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    );
}

const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (context === undefined) {
        throw new Error(
            'useBoardsContext must be used within a BoardsContextProvider'
        );
    }
    return context;
};

export { BoardProvider, useBoardContext };
export default BoardContext;
