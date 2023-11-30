import {
    Button,
    GridItem,
    ModalBody,
    ModalFooter,
    ModalHeader,
    SimpleGrid,
} from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'src/component/loader';
import ModalWrapper from 'src/component/modalWrapper';
import useForm from 'src/hooks/useForm';
import { IAddStagePayload } from 'src/types';
import {
    AddStageValidationType,
    addStageValidationSchema,
} from 'src/utills/validation/stage';

function StageModalCreate({
    isOpen,
    onClose,
    title,
    onSubmit,
    isLoading = false,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: IAddStagePayload) => void;
    title: string;
    isLoading?: boolean;
}) {
    const { id } = useParams();
    const defaultValues = useMemo(() => {
        return {
            name: '',
            listPosition: '',
            color: 'green',
        };
    }, []);

    const { FormField, handleSubmit } = useForm<AddStageValidationType>({
        defaultValues,
        validationSchema: addStageValidationSchema,
    });

    const formSubmitHandler = useCallback(
        (formData: AddStageValidationType) => {
            console.log('formData', formData);
            const stageData = { ...formData, boardId: id } as IAddStagePayload;
            onSubmit(stageData);
        },
        []
    );

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="xl">
            {isLoading ? <Loader /> : null}
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <form
                    id="create-stage-form"
                    onSubmit={handleSubmit(formSubmitHandler)}
                >
                    <SimpleGrid columns={4} spacing={2}>
                        <GridItem colSpan={4}>
                            {FormField({
                                name: 'name',
                                label: 'Stage Name',
                            })}
                        </GridItem>
                        <GridItem colSpan={2}>
                            {FormField({
                                name: 'color',
                                type: 'color-picker',
                                label: 'Select color',
                            })}
                        </GridItem>
                        <GridItem colSpan={2}>
                            {FormField({
                                name: 'listPosition',
                                type: 'number',
                                label: 'Select position',
                            })}
                        </GridItem>
                    </SimpleGrid>
                </form>
            </ModalBody>
            <ModalFooter gap={2} pt={0}>
                <Button
                    form="create-stage-form"
                    type="submit"
                    variant="primary"
                >
                    create
                </Button>
                <Button onClick={onClose} type="submit" variant="primary">
                    cancel
                </Button>
            </ModalFooter>
        </ModalWrapper>
    );
}

export default StageModalCreate;
