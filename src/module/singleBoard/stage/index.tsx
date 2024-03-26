/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dnd from 'src/component/dnd';
import Loader from 'src/component/loader';
import useDidUpdate from 'src/hooks/useDidUpdate';
import TaskCreateEditModal from 'src/module/singleBoard/taskCreateEdit/taskCreateEditModal';
import { useBoardContext } from 'src/pages/board/context';
import { editTasksPromise } from 'src/store/board/action';
import {
    boardSelectorState,
    stagesSelector,
    tasksSelector,
} from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { IDraggingTask, IReorderTask, IStage, ITask } from 'src/types';
import { isExists } from 'src/utills/helper';
import StageList from './stageList';
import StageItem from './stageList/stageColumn/stageItem';
import StyledStageContainer from './style';

function StageContainer() {
    const {
        editTaskHandlerPromise,
        setOpenEditTaskDialog,
        openEditTaskDialog,
    } = useBoardContext();

    const { isStageLoading } = useAppSelector(boardSelectorState);
    const { data: taskData } = useAppSelector(tasksSelector);
    const { data: stages } = useAppSelector(stagesSelector);

    const convertToStageTasks = useCallback(
        (stages: IStage[], tasks: ITask[]) => {
            if (!Array.isArray(stages) || !Array.isArray(tasks)) return {};
            return stages.reduce(
                (acc, stage) => {
                    acc[stage._id] = tasks.filter(
                        (task) => task.stageId === stage._id
                    );
                    return acc;
                },
                {} as Record<string, ITask[]>
            );
        },
        []
    );

    const [tasks, setTasks] = useState<Record<string, ITask[]> | {}>(
        convertToStageTasks(stages, taskData)
    );

    useDidUpdate(() => {
        setTasks(convertToStageTasks(stages, taskData));
    }, [taskData.length, stages.length]);

    const [activeTask, setActiveTask] = useState<IDraggingTask | undefined>(
        undefined
    );

    const dispatch = useDispatch();

    const selectedTask = useMemo(() => {
        return taskData.find((task) => task._id === openEditTaskDialog?._id);
    }, [taskData, openEditTaskDialog]);

    const handleDragStart = (dragEvent: DragStartEvent) => {
        setActiveTask({
            startIndex: dragEvent?.active?.data?.current?.sortable?.index,
            ...dragEvent?.active?.data?.current?.task,
        });
    };

    function findContainer(id: string) {
        if (id in tasks) {
            return id;
        }
        return Object.keys(tasks).find((key: string) =>
            tasks[key].some((task: ITask) => task._id === id)
        );
    }

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const { id: activeId } = active;
        const { id: overId } = over;

        if (overId === activeId) {
            return;
        }

        const activeContainerId = findContainer(activeId as string);
        const overContainerId = findContainer(overId as string);

        if (!activeContainerId || !overContainerId) return;

        if (activeContainerId === overContainerId) {
            setTasks((prev: Record<string, ITask[]>) => {
                let sourceTasks = [...prev[activeContainerId]];

                const sourceTaskIndex = sourceTasks.findIndex(
                    (task: ITask) => task._id === activeId
                );

                const overTaskIndex = sourceTasks.findIndex(
                    (task: ITask) => task._id === overId
                );

                sourceTasks = arrayMove(
                    sourceTasks,
                    sourceTaskIndex,
                    overTaskIndex
                );

                return {
                    ...prev,
                    [activeContainerId]: sourceTasks,
                };
            });
        } else {
            setTasks((prev: Record<string, ITask[]>) => {
                let sourceTasks = [...prev[activeContainerId]];
                let destinationTasks = [...prev[overContainerId]];
                let sourceTask = { ...active?.data?.current?.task };

                sourceTask.stageId = overContainerId;

                sourceTasks = sourceTasks.filter(
                    (task) => task._id !== activeId
                );

                const destinationIndex = destinationTasks.findIndex(
                    (t) => t._id === overId
                );

                destinationTasks.splice(destinationIndex, 0, sourceTask);

                return {
                    ...prev,
                    [activeContainerId]: sourceTasks,
                    [overContainerId]: destinationTasks,
                };
            });
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const { id: activeId } = active;
        const { id: overId } = over;

        const overContainerId = findContainer(overId as string);
        const activeContainerId = findContainer(activeId as string);

        if (!overContainerId || !activeContainerId) return;

        if (
            activeTask?.stageId === overContainerId &&
            overId !== overContainerId
        ) {
            let sourceTasks = [...tasks[activeContainerId]];

            const overTaskIndex = sourceTasks.findIndex(
                (task: ITask) => task._id === overId
            );

            const taskData: IReorderTask[] = [];
            let start = activeTask.startIndex;
            let end = overTaskIndex;

            if (activeTask.startIndex > overTaskIndex) {
                start = overTaskIndex;
                end = activeTask.startIndex;
            }

            for (let i = start; i <= end; i++) {
                taskData.push({
                    id: sourceTasks[i]._id,
                    data: { position: i + 1 },
                });
            }

            dispatch(editTasksPromise({ taskData }));
        } else if (activeTask?.stageId !== overContainerId) {
            let destinationTasks = [...tasks[overContainerId]];
            const taskData: IReorderTask[] = [];

            let destinationIndex = destinationTasks.findIndex(
                (t) => t._id === overId
            );

            if (destinationIndex < 0) destinationIndex = 0;

            for (let i = destinationIndex; i < destinationTasks.length; i++) {
                taskData.push({
                    id: destinationTasks[i]._id,
                    data: {
                        position: i + 1,
                        stageId: overContainerId as string,
                    },
                });
            }
            dispatch(editTasksPromise({ taskData }));
        }
        setActiveTask(undefined);
    };

    return (
        <StyledStageContainer>
            {openEditTaskDialog && isExists(selectedTask) && (
                <TaskCreateEditModal
                    data={selectedTask}
                    isOpen={!!openEditTaskDialog}
                    onClose={() => setOpenEditTaskDialog(null)}
                    onSubmit={editTaskHandlerPromise}
                    title="Edit Task"
                />
            )}
            <Dnd
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
            >
                <StageList stages={stages} tasks={tasks} />
                {activeTask ? (
                    <DragOverlay>
                        <StageItem task={activeTask} />
                    </DragOverlay>
                ) : null}
            </Dnd>
            {isStageLoading ? <Loader /> : null}
        </StyledStageContainer>
    );
}

export default StageContainer;
