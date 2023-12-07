import { stagesSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { IStage, ITask } from 'src/types';
import StageColumn from './stageColumn';

function StageList({ tasks }: { tasks: ITask[] }) {
    const { data: stages } = useAppSelector(stagesSelector);
    return stages?.map((stage: IStage) => {
        return <StageColumn key={stage.id} stage={stage} tasks={tasks} />;
    });
}

export default StageList;
