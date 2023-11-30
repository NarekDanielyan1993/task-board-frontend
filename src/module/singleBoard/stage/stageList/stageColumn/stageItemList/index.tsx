import { Stack } from '@chakra-ui/react';
import useDrop from 'src/hooks/useDrop';
import { useBoardContext } from 'src/pages/board/context';
import { switchTaskBetweenStages } from 'src/store/board/reducer';
import { useAppDispatch } from 'src/store/createStore';
import { IStage, ITask } from 'src/types';
import StageItem from '../stageItem';

function StageItemList({ stage }: { stage: IStage }) {
    const { switchTaskBetweenStagesHandler } = useBoardContext();
    const dispatch = useAppDispatch();
    const { isOver, ref } = useDrop({
        columnId: stage.id,
        onDrop: (data) => {
            dispatch(switchTaskBetweenStages(data));
            switchTaskBetweenStagesHandler(data);
        },
    });

    return (
        <Stack
            direction={{ base: 'row', lg: 'column' }}
            flexGrow={1}
            gap={4}
            overflowX="auto"
            ref={ref}
            sx={{ ...(isOver && { bgColor: 'brand.secondary.main' }) }}
        >
            {Array.isArray(stage.tasks) &&
                stage.tasks.length > 0 &&
                stage.tasks.map((task: ITask, index) => {
                    return (
                        <StageItem index={index} key={task.id} task={task} />
                    );
                })}
        </Stack>
    );
}

export default StageItemList;
