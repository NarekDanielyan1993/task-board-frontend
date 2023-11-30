import { Flex, Tag, TagLabel } from '@chakra-ui/react';
import IconButton from 'src/component/button/iconButton';
import ConfirmationModal from 'src/component/modal/confirmationModal';
import useToggle from 'src/hooks/useToggle';

function StageColumnHeader({
    color,
    children,
    onDelete,
    tasksCount,
}: {
    onDelete: () => void;
    color: string;
    tasksCount: number;
    children: React.ReactNode;
}) {
    const { value: confirmDeleteStage, toggle: setConfirmDeleteStage } =
        useToggle(false);
    return (
        <Flex
            alignItems="center"
            borderBottomColor={color}
            borderBottomWidth={2}
            justifyContent="space-between"
            px={2}
            py={4}
        >
            <Tag bgColor={color} size="lg">
                <TagLabel color="white">{children}</TagLabel>
            </Tag>
            <IconButton
                ariaLabel="delete-stage"
                iconName="delete"
                isDisabled={tasksCount > 0}
                onClick={() => setConfirmDeleteStage()}
                tooltip={
                    tasksCount > 0
                        ? 'Move all the tasks to delete'
                        : 'Delete stage'
                }
            />
            <ConfirmationModal
                actionButtonText="Yes"
                actionFn={onDelete}
                content="Are you sure you want to delete stage?"
                header="Delete Stage"
                isOpen={confirmDeleteStage}
                onClose={() => setConfirmDeleteStage()}
            />
        </Flex>
    );
}

export default StageColumnHeader;
