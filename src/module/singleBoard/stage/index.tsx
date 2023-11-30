import { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Loader from 'src/component/loader';
import { useBoardContext } from 'src/pages/board/context';
import { boardSelectorState, stagesSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { ITask } from 'src/types';
import TaskCreateEditModal from '../taskCreateEdit/taskCreateEditModal';
import StageList from './stageList';
import TaskDragPreview from './stageList/stageColumn/stageDragPreviewItem';
import StyledStageContainer from './style';

function StageContainer() {
    const {
        editTaskHandlerPromise,
        setOpenEditTaskDialog,
        openEditTaskDialog,
    } = useBoardContext();

    const { isStageLoading } = useAppSelector(boardSelectorState);
    const { data: stages } = useAppSelector(stagesSelector);

    const selectedTask = useMemo(() => {
        if (openEditTaskDialog) {
            const selectedStage = stages.find(
                (stage) => stage.id === openEditTaskDialog.stageId
            );
            if (selectedStage) {
                return selectedStage.tasks.find(
                    (task) => task.id === openEditTaskDialog.id
                ) as ITask;
            }
        }
        return {} as ITask;
    }, [openEditTaskDialog, ...stages.map((stage) => stage)]);

    return (
        <DndProvider backend={HTML5Backend}>
            <TaskDragPreview />
            <StyledStageContainer>
                {openEditTaskDialog && (
                    <TaskCreateEditModal
                        data={selectedTask}
                        isOpen={!!openEditTaskDialog}
                        onClose={() => setOpenEditTaskDialog(null)}
                        onSubmit={editTaskHandlerPromise}
                        title="Edit Task"
                    />
                )}
                {isStageLoading ? <Loader /> : null}
                <StageList />
            </StyledStageContainer>
        </DndProvider>
    );
}

export default StageContainer;
