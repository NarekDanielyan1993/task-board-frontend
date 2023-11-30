import { useDrop as useDndDrop } from 'react-dnd';
import DND_ITEMS_TYPE from 'src/constant/dnd';
import { IDragItem, IDropData } from 'src/types/dnd';

const useDrop = ({
    columnId,
    onDrop,
}: {
    columnId: string;
    onDrop: (data: IDropData) => void;
}) => {
    const [{ isOver }, dropRef] = useDndDrop<
        IDragItem,
        void,
        { isOver: boolean }
    >({
        accept: DND_ITEMS_TYPE.TASK,
        drop(item) {
            if (!item || item.columnId === columnId) {
                return;
            }
            onDrop({ from: item.columnId, to: columnId, id: item.id });
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    return {
        ref: dropRef,
        isOver,
    };
};

export default useDrop;
