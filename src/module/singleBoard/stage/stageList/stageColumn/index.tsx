import { useBoardContext } from 'src/pages/board/context';
import { IStage } from 'src/types';
import { getRandomColor } from 'src/utills/helper';
import StageColumnHeader from './stageColumnHeader';
import StageItemList from './stageItemList';
import StyledStageColumn from './style';

function StageColumn({ stage }: { stage: IStage }) {
    const randomColor = getRandomColor();
    const { deleteStageHandler } = useBoardContext();
    return (
        <StyledStageColumn color={stage.color ?? randomColor}>
            <StageColumnHeader
                color={stage.color ?? randomColor}
                onDelete={() => deleteStageHandler({ id: stage.id })}
                tasksCount={stage.tasks.length}
            >
                {stage.name}
            </StageColumnHeader>
            <StageItemList stage={stage} />
        </StyledStageColumn>
    );
}

export default StageColumn;
