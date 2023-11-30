import { Button, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import useForm from 'src/hooks/useForm';
import { ICommentCreateEdit } from 'src/types';
import { AddEditCommentFormType } from './validationSchema';

function CommentCreateEdit({ onCancel, onAction, text }: ICommentCreateEdit) {
    const defaultValues = useMemo(() => {
        if (text) {
            return {
                text,
            };
        }
        return {
            text: '',
        };
    }, []);

    const { FormField, setValue, handleSubmit } =
        useForm<AddEditCommentFormType>({
            defaultValues,
        });

    const formSubmitHandler = (formData: AddEditCommentFormType) => {
        console.log(formData);
        onAction(formData);
        setValue('text', '');
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            {FormField({
                name: 'text',
                label: 'Add Comment',
                type: 'textarea',
                rows: 4,
            })}
            <Flex justifyContent="right">
                {onCancel ? (
                    <Button onClick={onCancel} variant="ghost">
                        cancel
                    </Button>
                ) : null}
                <Button type="submit" variant="ghost">
                    create
                </Button>
            </Flex>
        </form>
    );
}

export default CommentCreateEdit;
