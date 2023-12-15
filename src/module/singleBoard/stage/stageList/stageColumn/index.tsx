/* eslint-disable no-underscore-dangle */
import { useBoardContext } from 'src/pages/board/context';
import { IStage, ITask } from 'src/types';
import StageColumnHeader from './stageColumnHeader';
import StageItemList from './stageItemList';
import StyledStageColumn from './style';

function StageColumn({ stage, tasks }: { tasks: ITask[]; stage: IStage }) {
    const { deleteStageHandler } = useBoardContext();
    const stageTasks = tasks.filter((task) => task.stageId === stage._id);

    return (
        <StyledStageColumn>
            <StageColumnHeader
                color={stage.color}
                onDelete={() => deleteStageHandler({ id: stage._id })}
                tasksCount={stageTasks.length}
            >
                {stage.name}
            </StageColumnHeader>

            <StageItemList stage={stage} tasks={stageTasks} />
        </StyledStageColumn>
    );
}

export default StageColumn;
