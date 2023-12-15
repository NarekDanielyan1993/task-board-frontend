/* eslint-disable no-underscore-dangle */
import { stagesSelector, tasksSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { IStage } from 'src/types';
import StageColumn from './stageColumn';

function StageList() {
    const { data: stages } = useAppSelector(stagesSelector);
    const { data: tasks } = useAppSelector(tasksSelector);
    return stages?.map((stage: IStage) => {
        return <StageColumn key={stage._id} stage={stage} tasks={tasks} />;
    });
}

export default StageList;
