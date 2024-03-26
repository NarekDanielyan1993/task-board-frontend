import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React from 'react';

function Dnd({
    onDragEnd,
    onDragOver,
    onDragStart,
    children,
}: {
    onDragEnd: (event: DragEndEvent) => void;
    onDragOver: (event: DragOverEvent) => void;
    onDragStart: (event: DragStartEvent) => void;
    children: React.ReactNode;
}) {
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <DndContext
            // collisionDetection={closestCorners}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            sensors={sensors}
        >
            {children}
        </DndContext>
    );
}

export default Dnd;
