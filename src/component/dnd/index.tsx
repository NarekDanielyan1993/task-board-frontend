import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragStartEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    closestCorners,
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
            activationConstraint: { distance: 3 },
        }),
        useSensor(PointerSensor, {
            activationConstraint: { distance: 3 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    return (
        <DndContext
            collisionDetection={closestCorners}
            // measuring={{
            //     droppable: {
            //         strategy: MeasuringStrategy.Always,
            //     },
            // }}
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
