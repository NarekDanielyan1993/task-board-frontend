import { memo } from 'react';
import { stagesSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { IStage } from 'src/types';
import StageColumn from './stageColumn';

function StageList() {
    const { data: stages } = useAppSelector(stagesSelector);

    return stages?.map((stage: IStage) => {
        return <StageColumn key={stage.id} stage={stage} />;
    });
}

export default memo(StageList);
