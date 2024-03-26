import { Button, Collapse, Flex } from '@chakra-ui/react';
import { useCallback } from 'react';
import useForm from 'src/hooks/useForm';
import useToggle from 'src/hooks/useToggle';
import { useBoardContext } from 'src/pages/board/context';
import { boardSelectorState } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import {
    addSubtaskFormType,
    addSubtaskValidationSchema,
} from './validationSchema';

function SubTaskForm({ taskId, stageId }: { taskId: string; stageId: string }) {
    const { value, toggle } = useToggle(false);
    const { addSubTaskHandler } = useBoardContext();
    const { isSubtaskLoading: isLoading } = useAppSelector(boardSelectorState);

    const { FormField, setValue, handleSubmit } = useForm<addSubtaskFormType>({
        defaultValues: {
            summary: '',
        },
        validationSchema: addSubtaskValidationSchema,
    });

    const formSubmitHandler = useCallback((formData: addSubtaskFormType) => {
        addSubTaskHandler({
            summary: formData.summary,
            parentId: taskId,
            stageId,
        });
        setValue('summary', '');
    }, []);

    return (
        <>
            <Button onClick={() => toggle()} variant="ghost">
                Create sub task
            </Button>
            <Collapse animateOpacity in={value}>
                <Flex
                    as="form"
                    autoComplete="off"
                    gap={2}
                    id="subtask-form"
                    mt={2}
                    onSubmit={handleSubmit(formSubmitHandler)}
                    width="full"
                >
                    {FormField({
                        name: 'summary',
                        label: 'Summary',
                    })}
                    <Button
                        isLoading={isLoading}
                        type="submit"
                        variant="primary"
                    >
                        Create
                    </Button>
                </Flex>
            </Collapse>
        </>
    );
}

export default SubTaskForm;
