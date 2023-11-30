import { Box, Flex, Text } from '@chakra-ui/react';
import { CSSProperties } from 'react';
import { XYCoord, useDragLayer } from 'react-dnd';
import IconButton from 'src/component/button/iconButton';
import TextTruncate from 'src/component/textTruncate';
import { prioritiesSelector, stagesSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';

import { ITask } from 'src/types';
import { IDragItem } from 'src/types/dnd';
import CustomDate from 'src/utills/date';
import {
    StyledStageItemContent,
    StyledStageItemFooter,
    StyledStageItemHeader,
    StyledStageItemWrapper,
} from '../stageItem/style';

function TaskDragPreview() {
    const { data: stages } = useAppSelector(stagesSelector);
    const { data: priorities } = useAppSelector(prioritiesSelector);

    const { isDragging, item, initialOffset, currentOffset } = useDragLayer(
        (monitor) => ({
            item: monitor.getItem() as IDragItem,
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        })
    );

    if (!isDragging) {
        return null;
    }

    const layerStyles: CSSProperties = {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    };

    function getItemStyles(
        initialOffset: XYCoord | null,
        currentOffset: XYCoord | null
    ) {
        if (!initialOffset || !currentOffset) {
            return {
                display: 'none',
            };
        }

        const { x } = currentOffset;
        const { y } = currentOffset;

        const transform = `translate(${x}px, ${y}px)`;

        return {
            transform,
            WebkitTransform: transform,
        };
    }

    const task = stages
        .find((stage) => stage.id === item.columnId)
        ?.tasks.find((task) => task.id === item.id) as ITask;
    const formattedDate = task.due_date
        ? CustomDate.formatIsoDateTo(task.due_date)
        : '';
    const priority = priorities.find((pr) => pr.value === task.priorityId)
        ?.label;
    console.log(task);

    return (
        <Box as="div" style={{ ...layerStyles }}>
            <Box
                as="div"
                pos="absolute"
                style={getItemStyles(initialOffset, currentOffset)}
            >
                <StyledStageItemWrapper as="div">
                    <StyledStageItemHeader>
                        <TextTruncate text={task.summary} />
                    </StyledStageItemHeader>
                    <StyledStageItemContent>
                        <Flex gap={4} justify="left">
                            {formattedDate && (
                                <Text
                                    bgColor="brand.background.main"
                                    color="brand.tertiary.main"
                                    display="block"
                                    px={2}
                                    rounded="sm"
                                >
                                    {formattedDate}
                                </Text>
                            )}
                            {priority && (
                                <Text
                                    bgColor="brand.background.main"
                                    color="brand.tertiary.main"
                                    display="block"
                                    isTruncated
                                    px={2}
                                    rounded="sm"
                                >
                                    {priority}
                                </Text>
                            )}
                        </Flex>
                    </StyledStageItemContent>
                    <StyledStageItemFooter>
                        <Flex flexWrap="wrap" gap={2} justify="center">
                            <Text
                                bgColor="brand.background.main"
                                color="brand.primary.main"
                                px={2}
                                rounded="sm"
                            >{`TN-${task.taskNumber}`}</Text>
                            {Array.isArray(task.attachments) &&
                                task.attachments.length > 0 && (
                                    <>
                                        <IconButton
                                            ariaLabel="attachment-icon"
                                            cursor="default"
                                            iconName="attachment"
                                            pointerEvents="none"
                                        />
                                        <Text color="brand.primary.main">
                                            {task.attachments.length}
                                        </Text>
                                    </>
                                )}
                        </Flex>
                        <Box display="flex" gap={2}>
                            <IconButton
                                ariaLabel="delete-task"
                                iconName="delete"
                                variant="iconDelete"
                            />
                            <IconButton
                                ariaLabel="edit-task"
                                iconName="edit"
                                variant="iconPrimary"
                            />
                        </Box>
                    </StyledStageItemFooter>
                </StyledStageItemWrapper>
            </Box>
        </Box>
    );
}

export default TaskDragPreview;
