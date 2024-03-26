/* eslint-disable no-underscore-dangle */
import { useDroppable } from '@dnd-kit/core';
import StageItemList from 'src/module/singleBoard/stage/stageList/stageColumn/stageItemList';
import { useBoardContext } from 'src/pages/board/context';
import { IStage, ITask } from 'src/types';
import StageColumnHeader from './stageColumnHeader';
import StyledStageColumn from './style';

function StageColumn({ stage, tasks }: { tasks: ITask[]; stage: IStage }) {
    const { deleteStageHandler } = useBoardContext();
    const { setNodeRef } = useDroppable({
        id: stage._id,
    });
    return (
        <StyledStageColumn ref={setNodeRef}>
            <StageColumnHeader
                color={stage.color}
                onDelete={() => deleteStageHandler({ id: stage._id })}
                tasksCount={tasks.length}
            >
                {stage.name}
            </StageColumnHeader>
            <StageItemList tasks={tasks} />
        </StyledStageColumn>
    );
}

export default StageColumn;
