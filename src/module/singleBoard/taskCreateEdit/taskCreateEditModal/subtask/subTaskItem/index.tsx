/* eslint-disable no-underscore-dangle */
import { CheckCircleIcon } from '@chakra-ui/icons';
import { ListIcon, ListItem } from '@chakra-ui/react';
// import CheckCircle from 'public/assets/check-circle.svg';
import IconButton from 'src/component/button/iconButton';
import TruncatedText from 'src/component/truncatedText';
import { IDeleteSubTaskPayload, ISubTask } from 'src/types';

function SubTaskItem({
    subtask,
    onDelete,
}: {
    subtask: ISubTask;
    onDelete: (data: IDeleteSubTaskPayload) => void;
}) {
    return (
        <ListItem
            alignItems="center"
            display="flex"
            gap={2}
            justifyContent="space-between"
        >
            <ListIcon as={CheckCircleIcon} color="green.500" fontSize="2xl" />
            <TruncatedText>{subtask.summary}</TruncatedText>
            <IconButton
                ariaLabel="delete"
                iconName="delete"
                onClick={() =>
                    onDelete({
                        parentId: subtask.parentId,
                        _id: subtask._id,
                        stageId: subtask.stageId,
                    })
                }
            />
        </ListItem>
    );
}

export default SubTaskItem;
