import { Box } from '@chakra-ui/react';
import { useDroppable } from '@dnd-kit/core';
import React from 'react';

function Droppable({
    children,
    stageId,
}: {
    children: React.ReactNode;
    stageId: string;
}) {
    const { setNodeRef, over } = useDroppable({
        id: stageId,
    });

    return (
        <Box
            ref={setNodeRef}
            style={{
                flexGrow: 1,
                backgroundColor:
                    over?.data?.current?.to === stageId ? 'green' : undefined,
            }}
        >
            {children}
        </Box>
    );
}

export default Droppable;
