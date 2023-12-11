/* eslint-disable no-underscore-dangle */
import {
    Button,
    Grid,
    GridItem,
    ModalBody,
    ModalHeader,
} from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useFieldArray } from 'react-hook-form';
import ModalWrapper from 'src/component/modalWrapper';
import useForm from 'src/hooks/useForm';
import {
    boardSelectorState,
    prioritiesSelector,
} from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import {
    IAddEditTask,
    IAddTaskPayload,
    IAttachment,
    IEditTaskPayload,
    ISelectProps,
    ITask,
} from 'src/types';
import addTaskValidationSchema from 'src/utills/validation/task';
import Attachments from './attachments';
import Comment from './comment';
import SubTask from './subtask';
import SubTaskList from './subtask/subTaskList';

function TaskCreateEditModal<T extends IAddTaskPayload | IEditTaskPayload>({
    isOpen,
    onClose,
    title,
    data,
    onSubmit,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (taskData: T) => void;
    title?: string;
    data: ITask | null;
}) {
    const { data: priorities } = useAppSelector(prioritiesSelector);
    const { isLoading: isBoardLoading, stagesSelect } =
        useAppSelector(boardSelectorState);
    const defaultValues = useMemo(() => {
        if (data) {
            const priority = priorities.find(
                (pr) => pr.value === data.priorityId
            ) as ISelectProps;
            const stage = stagesSelect.find(
                (st) => st.value === data.stageId
            ) as ISelectProps;
            return {
                summary: data.summary || '',
                description: data.description || '',
                priorityId: data.priorityId ? priority : null,
                stageId: data.stageId ? stage : null,
                due_date: data.due_date ? new Date(data.due_date) : new Date(),
                attachments: data.attachments,
                removedAttachments: [],
                appendAttachments: [],
            };
        }
        return {
            summary: '',
            description: '',
            priorityId: priorities[0],
            stageId: stagesSelect[0],
            due_date: new Date(),
            attachments: [],
        };
    }, []);

    const { FormField, control, handleSubmit, register } =
        useForm<IAddEditTask>({
            defaultValues,
            validationSchema: addTaskValidationSchema,
        });

    const {
        fields: attachments,
        append,
        remove,
    } = useFieldArray({
        control,
        name: 'attachments',
    });

    const { append: appendRemoved } = useFieldArray<
        IAddEditTask,
        'removedAttachments'
    >({
        control,
        shouldUnregister: !!data,
        name: 'removedAttachments',
    });

    const { append: appendAttachment } = useFieldArray<
        IAddEditTask,
        'appendAttachments'
    >({
        control,
        shouldUnregister: !!data,
        name: 'appendAttachments',
    });

    const appendAttachmentHandler = useCallback((attachment: IAttachment) => {
        append(attachment);
        if (data) {
            appendAttachment(attachment);
        }
    }, []);

    const removeAttachment = useCallback(
        (attachment: IAttachment, index: number) => {
            remove(index);
            if (attachment.isUploaded) {
                appendRemoved(attachment);
            }
        },
        []
    );

    const formSubmitHandler = useCallback((formData: IAddEditTask) => {
        console.log('formData', formData);
        const taskData = {} as T;
        if (formData.stageId) {
            taskData.stageId = formData.stageId.value;
        } else {
            taskData.stageId = formData.stageId;
        }
        if (formData.priorityId) {
            taskData.priorityId = formData.priorityId.value;
        } else {
            taskData.priorityId = formData.priorityId;
        }
        if (formData.due_date) {
            taskData.due_date = formData.due_date.toISOString();
        } else {
            taskData.due_date = formData.due_date;
        }
        taskData.attachments = formData.attachments;
        taskData.summary = formData.summary;
        taskData.description = formData.description;
        if (data) {
            taskData.removedAttachments =
                formData.removedAttachments as IAttachment[];
        }
        if (data) {
            taskData.attachments = formData.appendAttachments as IAttachment[];
        }
        if (data) {
            taskData.id = data._id;
        }
        onSubmit(taskData)
            .then()
            .finally(() => onClose());
    }, []);

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} size="xl">
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>
                <form
                    id="create-edit-task-form"
                    onSubmit={handleSubmit(formSubmitHandler)}
                >
                    <Grid columnGap={4} rowGap={2}>
                        <GridItem colSpan={2}>
                            {FormField({
                                name: 'summary',
                                label: 'Summary',
                            })}
                        </GridItem>
                        <GridItem colSpan={2}>
                            {FormField({
                                name: 'due_date',
                                type: 'custom-date',
                                label: 'Due Date',
                            })}
                        </GridItem>
                        <GridItem colSpan={2}>
                            {FormField({
                                name: 'stageId',
                                label: 'Stage',
                                type: 'select',
                                options: stagesSelect,
                            })}
                        </GridItem>
                        <GridItem colSpan={2}>
                            {FormField({
                                isClearable: true,
                                name: 'priorityId',
                                label: 'Priority',
                                type: 'select',
                                options: priorities,
                            })}
                        </GridItem>
                        <GridItem colSpan={4}>
                            {FormField({
                                name: 'description',
                                label: 'Description',
                                type: 'textarea',
                            })}
                        </GridItem>
                    </Grid>
                </form>
                {data && (
                    <SubTask stageId={data.stageId} taskId={data._id}>
                        {Array.isArray(data.subTasks) &&
                            data.subTasks.length > 0 && (
                                <SubTaskList subTasks={data.subTasks} />
                            )}
                    </SubTask>
                )}
                <Attachments
                    add={appendAttachmentHandler}
                    images={attachments}
                    register={register}
                    remove={removeAttachment}
                />
                {data ? (
                    <Comment comments={data?.comments} taskId={data._id} />
                ) : null}
                <Button
                    form="create-edit-task-form"
                    isLoading={isBoardLoading}
                    type="submit"
                    variant="primary"
                    width="full"
                >
                    {title}
                </Button>
            </ModalBody>
        </ModalWrapper>
    );
}

export default TaskCreateEditModal;
