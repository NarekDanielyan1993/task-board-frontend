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
import ModalWrapper from 'src/component/modalWrapper';
import useForm from 'src/hooks/useForm';
import { stagesSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { IAddStagePayload, IUpdatedStagePosition } from 'src/types';
import { isArrayEmpty } from 'src/utills/helper';
import {
    AddStageValidationType,
    addStageValidationSchema,
} from 'src/utills/validation/stage';

function StageModalCreate({
    isOpen,
    onClose,
    title,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: IAddStagePayload) => void;
    title: string;
}) {
    const { id } = useParams();
    const { data: stages } = useAppSelector(stagesSelector);

    const stagesData = stages.map((stage, index) => ({
        value: stage._id,
        label: stage.listPosition,
        index,
    }));

    const defaultValues = useMemo(() => {
        return {
            name: '',
            listPosition: !isArrayEmpty(stages)
                ? {
                      value: stages[0]._id,
                      label: stages[0].listPosition,
                      index: 0,
                  }
                : {},
            color: 'green',
            lastPosition: false,
        };
    }, []);

    const { FormField, handleSubmit, watch } = useForm<AddStageValidationType>({
        defaultValues,
        validationSchema: addStageValidationSchema,
    });

    const lastPosition = watch('lastPosition');

    const formSubmitHandler = useCallback(
        (formData: AddStageValidationType) => {
            const stageData = {} as IAddStagePayload;
            stageData.name = formData.name;
            stageData.color = formData.color;
            stageData.boardId = id as string;
            stageData.listPosition = formData.listPosition.label;
            if (formData.lastPosition) {
                stageData.listPosition = stagesData.length + 1;
                stageData.updatedStagePositions = null;
            } else {
                stageData.updatedStagePositions = stages.reduce(
                    (acc, stage, index) => {
                        if (index >= formData.listPosition.index) {
                            acc.push({ id: stage._id, position: index + 2 });
                        }
                        return acc;
                    },
                    [] as IUpdatedStagePosition[]
                );
            }
            onSubmit(stageData);
        },
        []
    );

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="xl">
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <form
                    id="create-stage-form"
                    onSubmit={handleSubmit(formSubmitHandler)}
                >
                    <SimpleGrid alignItems="center" columns={4} spacing={2}>
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
                        <GridItem colSpan={1}>
                            {FormField({
                                name: 'lastPosition',
                                type: 'checkbox',
                                label: 'Last position',
                            })}
                        </GridItem>
                        <GridItem colSpan={1}>
                            {FormField({
                                name: 'listPosition',
                                type: 'select',
                                disabled: lastPosition,
                                options: stagesData,
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
