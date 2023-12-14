/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Box, Flex, Text } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IconButton from 'src/component/button/iconButton';
import ConfirmationModal from 'src/component/modal/confirmationModal';
import TextTruncate from 'src/component/textTruncate';
import useToggle from 'src/hooks/useToggle';
import { useBoardContext } from 'src/pages/board/context';
import {
    boardSelectorState,
    prioritiesSelector,
} from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { ITask } from 'src/types';
import StageDateTag from './stageDateTag';
import StagePriorityTag from './stagePriorityTag';
import {
    StyledStageItemContent,
    StyledStageItemFooter,
    StyledStageItemHeader,
    StyledStageItemWrapper,
} from './style';

function StageItem({ task }: { task: ITask }) {
    const {
        summary,
        due_date,
        taskNumber,
        attachments,
        priorityId: taskPriorityId,
        parentId,
    } = task;

    const { deleteTaskHandler, setOpenEditTaskDialog } = useBoardContext();
    const { isLoading: isBoardLoading } = useAppSelector(boardSelectorState);
    const { value: isConfirmOpen, toggle: setConfirm } = useToggle(false);
    const { data: priorities } = useAppSelector(prioritiesSelector);

    const priority = priorities.find((pr) => pr.value === taskPriorityId)
        ?.label;

    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task._id,
            data: { type: 'Task', task },
            transition: {
                duration: 500,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            },
        });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <StyledStageItemWrapper
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            as="div"
            cursor="grab"
            role="group"
            style={style}
        >
            <StyledStageItemHeader>
                <TextTruncate text={summary} />
            </StyledStageItemHeader>
            <StyledStageItemContent>
                <Flex gap={4} justify="left">
                    {due_date ? <StageDateTag date={due_date} /> : null}
                    {priority ? <StagePriorityTag text={priority} /> : null}
                </Flex>
            </StyledStageItemContent>
            <StyledStageItemFooter>
                <Flex flexWrap="wrap" gap={2} justify="center">
                    <Text
                        bgColor="brand.background.main"
                        color="brand.primary.main"
                        px={2}
                        rounded="sm"
                    >{`TN-${taskNumber}`}</Text>
                    {Array.isArray(attachments) && attachments.length > 0 && (
                        <>
                            <IconButton
                                ariaLabel="attachment-icon"
                                cursor="default"
                                iconName="attachment"
                                pointerEvents="none"
                            />
                            <Text color="brand.primary.main">
                                {attachments.length}
                            </Text>
                        </>
                    )}
                </Flex>
                <Box display="flex" gap={2}>
                    <IconButton
                        ariaLabel="delete-task"
                        iconName="delete"
                        onClick={() => setConfirm()}
                        variant="iconDelete"
                    />
                    <IconButton
                        ariaLabel="edit-task"
                        iconName="edit"
                        onClick={() => setOpenEditTaskDialog(task)}
                        variant="iconPrimary"
                    />
                    {isConfirmOpen ? (
                        <ConfirmationModal
                            actionFn={() =>
                                deleteTaskHandler({
                                    id: task._id,
                                    parentId,
                                })
                            }
                            content="Are you sure you want to delete task?"
                            header="DELETE TASK"
                            isLoading={isBoardLoading}
                            isOpen={isConfirmOpen}
                            onClose={() => setConfirm(false)}
                        />
                    ) : null}
                </Box>
            </StyledStageItemFooter>
        </StyledStageItemWrapper>
    );
}

export default StageItem;
