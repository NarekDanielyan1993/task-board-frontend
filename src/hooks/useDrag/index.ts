import { useEffect, useRef } from 'react';
import { DragSourceMonitor, useDrag as UseDndDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend/dist/getEmptyImage';
import DND_ITEMS_TYPE from 'src/constant/dnd';
import { IDragItem } from 'src/types/dnd';

const useDrag = <T>(data: IDragItem) => {
    const dragRef = useRef<T>(null);
    const [{ isDragging }, drag, preview] = UseDndDrag<
        IDragItem,
        void,
        { isDragging: boolean }
    >({
        type: DND_ITEMS_TYPE.TASK,
        item: {
            id: data.id,
            columnId: data.columnId,
            index: data.index,
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    drag(dragRef);

    return {
        isDragging,
        ref: dragRef,
    };
};

export default useDrag;
