/* eslint-disable no-underscore-dangle */
import { Stack } from '@chakra-ui/react';
import { ITask } from 'src/types';

import { isArrayEmpty } from 'src/utills/helper';
import StageItem from '../stageItem';

function StageItemList({ tasks }: { tasks: ITask[] }) {
    return (
        <Stack flexGrow={1} gap={4} overflow="hidden">
            {!isArrayEmpty(tasks) &&
                tasks.map((task: ITask) => {
                    return <StageItem key={task._id} task={task} />;
                })}
        </Stack>
    );
}

export default StageItemList;
