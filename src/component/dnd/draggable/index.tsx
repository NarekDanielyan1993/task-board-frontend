/* eslint-disable no-underscore-dangle */
import { Box } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { ITask } from 'src/types';

function Draggable({
    children,
    task,
}: {
    task: ITask;
    children: React.ReactNode;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task._id,
            data: { type: 'Task', task },
        });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Box style={style} {...listeners} {...attributes} ref={setNodeRef}>
            {children}
        </Box>
    );
}

export default Draggable;
