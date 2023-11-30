import { Button } from '@chakra-ui/react';
import useToggle from 'src/hooks/useToggle';
import { useBoardContext } from 'src/pages/board/context';
import TaskCreateEditModal from './taskCreateEditModal';

function TaskCreateEdit({
    title,
    isDisabled,
}: {
    title: string;
    isDisabled: boolean;
}) {
    const { value, toggle } = useToggle(false);
    const { addTaskHandlerPromise } = useBoardContext();
    return (
        <>
            <Button
                isDisabled={isDisabled}
                onClick={() => toggle()}
                variant="primary"
            >
                create task
            </Button>
            {value && (
                <TaskCreateEditModal
                    isOpen={value}
                    onClose={() => toggle()}
                    onSubmit={addTaskHandlerPromise}
                    title={title}
                />
            )}
        </>
    );
}

export default TaskCreateEdit;
