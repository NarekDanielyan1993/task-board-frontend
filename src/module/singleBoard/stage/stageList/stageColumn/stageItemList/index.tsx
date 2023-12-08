/* eslint-disable no-underscore-dangle */
import { Stack } from '@chakra-ui/react';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { IStage, ITask } from 'src/types';

import { useDroppable } from '@dnd-kit/core';
import StageItem from '../stageItem';

function StageItemList({ stage, tasks }: { tasks: ITask[]; stage: IStage }) {
    const { setNodeRef } = useDroppable({
        id: stage.id,
        data: { type: 'Column' },
    });

    return (
        <SortableContext
            id={stage.id}
            items={tasks.map((task) => task._id)}
            key={stage.id}
            strategy={verticalListSortingStrategy}
        >
            <Stack
                direction={{ base: 'row', lg: 'column' }}
                flexGrow={1}
                gap={4}
                overflowX="auto"
                ref={setNodeRef}
            >
                {Array.isArray(tasks) &&
                    tasks.length > 0 &&
                    tasks.map((task: ITask) => {
                        return <StageItem key={task._id} task={task} />;
                    })}
            </Stack>
        </SortableContext>
    );
}

export default StageItemList;
