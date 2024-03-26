/* eslint-disable no-underscore-dangle */
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IStage, ITask } from 'src/types';
import StageColumn from './stageColumn';

function StageList({
    stages,
    tasks,
}: {
    stages: IStage[];
    tasks: Record<string, ITask[]>;
}) {
    return stages?.map((stage: IStage) => {
        return (
            <SortableContext
                id={stage._id}
                items={
                    tasks[stage._id]
                        ? tasks[stage._id].map((task) => task._id)
                        : []
                }
                strategy={verticalListSortingStrategy}
            >
                <StageColumn
                    key={stage._id}
                    stage={stage}
                    tasks={tasks[stage._id] || []}
                />
            </SortableContext>
        );
    });
}

export default StageList;
