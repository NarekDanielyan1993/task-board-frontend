import { Button } from '@chakra-ui/react';

function CommentAction({
    text,
    onAction,
}: {
    text: string;
    onAction: () => void;
}) {
    return (
        <Button onClick={onAction} variant="ghost">
            {text}
        </Button>
    );
}

export default CommentAction;
