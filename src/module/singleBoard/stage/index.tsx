/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    MeasuringStrategy,
    MouseSensor,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'src/component/loader';
import { useBoardContext } from 'src/pages/board/context';
import { editTaskPromise } from 'src/store/board/action';
import { boardSelectorState, tasksSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { ITask } from 'src/types';
import { isExists } from 'src/utills/helper';
import TaskCreateEditModal from '../taskCreateEdit/taskCreateEditModal';
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
    const [tasks, setTasks] = useState(taskData);

    const selectedTask = openEditTaskDialog
        ? tasks.find((task) => task._id === openEditTaskDialog._id)
        : undefined;

    const [activeTask, setActiveTask] = useState<ITask | undefined>(undefined);

    const handleDragStart = (dragEvent: DragStartEvent) => {
        setActiveTask(tasks.find((task) => task._id === dragEvent.active.id));
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        const { id: activeTaskId } = active;
        const { id: overTaskId } = over;

        if (!over) {
            return;
        }

        if (
            !isExists(overTaskId) ||
            !isExists(activeTaskId) ||
            overTaskId === activeTaskId
        ) {
            return;
        }

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        if (!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(
                    (t) => t._id === activeTaskId
                );
                const overIndex = tasks.findIndex((t) => t._id === overTaskId);
                const newTasks = tasks.map((task, index) => {
                    if (index === activeIndex) {
                        return {
                            ...task,
                            stageId: tasks[overIndex].stageId,
                        };
                    }
                    return task;
                });
                return arrayMove(newTasks, activeIndex, overIndex);
            });
        }

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveTask && isOverAColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex(
                    (t) => t._id === activeTaskId
                );
                const newTasks = tasks.map((task, index) => {
                    if (index === activeIndex) {
                        return {
                            ...task,
                            stageId: overTaskId,
                        };
                    }
                    return task;
                });

                return arrayMove(newTasks, activeIndex, activeIndex);
            });
        }
    };
    const dispatch = useDispatch();

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(undefined);
        const { active, over } = event;
        const { id: activeTaskId } = active;
        const { id: overTaskId } = over;

        if (activeTaskId) {
            const overIndex = tasks.findIndex((t) => t._id === overTaskId);
            dispatch(
                editTaskPromise({
                    id: activeTaskId as string,
                    stageId: tasks[overIndex].stageId,
                })
            ).catch((error) => {
                if (error) setTasks(taskData);
            });
        }
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { distance: 10 },
        }),
        useSensor(PointerSensor, {
            activationConstraint: { distance: 10 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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
            <DndContext
                collisionDetection={closestCorners}
                measuring={{
                    droppable: {
                        strategy: MeasuringStrategy.Always,
                    },
                }}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragStart={handleDragStart}
                sensors={sensors}
            >
                <StageList tasks={tasks} />
                {activeTask ? (
                    <DragOverlay>
                        <StageItem task={activeTask} />
                    </DragOverlay>
                ) : null}
            </DndContext>
            {isStageLoading ? <Loader /> : null}
        </StyledStageContainer>
    );
}

export default StageContainer;
