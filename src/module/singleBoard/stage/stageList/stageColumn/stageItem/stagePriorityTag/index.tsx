import Tag from 'src/component/Tag';
import { priorityColors } from 'src/constant';

function StagePriorityTag({ text }: { text: string }) {
    return (
        <Tag
            bgColor={
                priorityColors[
                    text.toLowerCase() as keyof typeof priorityColors
                ]
            }
            text={text}
        />
    );
}

export default StagePriorityTag;
