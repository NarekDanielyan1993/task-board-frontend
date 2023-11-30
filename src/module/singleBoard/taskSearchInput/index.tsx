import { Button } from '@chakra-ui/react';
import useForm from 'src/hooks/useForm';
import { useBoardContext } from 'src/pages/board/context';
import { boardSelectorState } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import {
    SearchTasksValidationSchemaTypes,
    searchTasksValidationSchema,
} from 'src/utills/validation/task';
import StyledTaskSearchForm from './style';

function TaskSearchInput({ isDisabled }: { isDisabled: boolean }) {
    const defaultValues = {
        search: '',
    };

    const { searchTasksHandler } = useBoardContext();
    const { isSearchTaskSLoading } = useAppSelector(boardSelectorState);

    const {
        handleSubmit,
        FormField,
        formState: { isValid, touchedFields },
    } = useForm<SearchTasksValidationSchemaTypes>({
        defaultValues,
        validationSchema: searchTasksValidationSchema,
    });

    const formSubmitHandler = (data: SearchTasksValidationSchemaTypes) => {
        searchTasksHandler(data);
    };
    console.log(isValid);
    console.log(isDisabled);

    return (
        <StyledTaskSearchForm onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'search',
                label: 'Search Task',
                type: 'text',
            })}
            <Button
                isDisabled={isDisabled}
                isLoading={isSearchTaskSLoading}
                type="submit"
                variant="primary"
            >
                search
            </Button>
        </StyledTaskSearchForm>
    );
}

export default TaskSearchInput;
