import { Box } from '@chakra-ui/react';
import { useCallback } from 'react';
import Loader from 'src/component/loader';
import { useBoardContext } from 'src/pages/board/context';
import { boardSelectorState } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import { IComment } from 'src/types';
import CommentCreateEdit from './commentItem/commentCreateEdit';
import { AddEditCommentFormType } from './commentItem/commentCreateEdit/validationSchema';
import CommentList from './commentList';

function Comment({
    comments,
    taskId,
}: {
    comments: IComment[];
    taskId: string;
}) {
    console.log(comments);
    const { addCommentHandler } = useBoardContext();
    const { isCommentLoading } = useAppSelector(boardSelectorState);
    const onAddCommentHandler = useCallback((data: AddEditCommentFormType) => {
        addCommentHandler({
            taskId,
            text: data.text,
            parentId: null,
        });
    }, []);

    return (
        <Box my={4}>
            <Box pos="relative">
                <CommentCreateEdit onAction={onAddCommentHandler} />
                {isCommentLoading ? <Loader sizes="md" /> : null}
            </Box>
            <CommentList comments={comments} />
        </Box>
    );
}

export default Comment;
