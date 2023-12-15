/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dnd from 'src/component/dnd';
import Loader from 'src/component/loader';
import { useBoardContext } from 'src/pages/board/context';
import { editTaskPromise } from 'src/store/board/action';
import { switchTaskBetweenStages } from 'src/store/board/reducer';
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
    const { data: tasks } = useAppSelector(tasksSelector);

    const [activeTask, setActiveTask] = useState<ITask | undefined>(undefined);
    const dispatch = useDispatch();

    const selectedTask = openEditTaskDialog
        ? tasks.find((task) => task._id === openEditTaskDialog._id)
        : undefined;

    const handleDragStart = (dragEvent: DragStartEvent) => {
        setActiveTask(tasks.find((task) => task._id === dragEvent.active.id));
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        const { id: activeId } = active;
        const { id: overId } = over;
        if (!over) {
            return;
        }

        if (overId === activeId) {
            return;
        }

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        if (!isActiveTask) return;

        if (isActiveTask && isOverTask) {
            dispatch(
                switchTaskBetweenStages({
                    sourceId: activeId as string,
                    destinationId: overId,
                    type: 'task',
                })
            );
        }

        const isOverAColumn = over.data.current?.type === 'Column';

        if (isActiveTask && isOverAColumn) {
            dispatch(
                switchTaskBetweenStages({
                    sourceId: activeId as string,
                    destinationId: overId,
                    type: 'stage',
                })
            );
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveTask(undefined);
        const { active, over } = event;
        const { id: activeTaskId } = active;

        if (over?.data.current?.task?.stageId) {
            dispatch(
                editTaskPromise({
                    id: activeTaskId as string,
                    stageId: over?.data.current?.task?.stageId,
                })
            );
        }
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
                <StageList />
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
