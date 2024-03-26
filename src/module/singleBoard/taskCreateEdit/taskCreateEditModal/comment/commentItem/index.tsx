/* eslint-disable no-underscore-dangle */
import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import Loader from 'src/component/loader';
import useToggle from 'src/hooks/useToggle';
import { useBoardContext } from 'src/pages/board/context';
import { IComment, IDeleteCommentPayload } from 'src/types';
import CommentList from '../commentList';
import CommentAction from './commentAction';
import CommentCreateEdit from './commentCreateEdit';
import { AddEditCommentFormType } from './commentCreateEdit/validationSchema';
import CommentHeader from './commentHeader';
import StyledCommentWrapper from './style';

function CommentItem({ comment }: { comment: IComment }) {
    const { value: createReply, toggle: toggleCreateReply } = useToggle(false);
    const { value: showReplies, toggle: toggleReplies } = useToggle(false);
    const { value: editReply, toggle: toggleEditReply } = useToggle(false);
    const { value: isLoading, toggle: setIsLoading } = useToggle(false);
    const {
        deleteCommentHandler,
        getSubCommentsHandler,
        addCommentHandlerPromise,
        editCommentHandler,
    } = useBoardContext();
    const commentControl = (action: string) => () => {
        switch (action) {
            case 'add':
                toggleCreateReply(true);
                break;
            case 'edit':
                toggleEditReply(true);
                break;
            case 'show': {
                if (!Array.isArray(comment.comments)) {
                    setIsLoading(true);
                    console.log('comment', comment);
                    getSubCommentsHandler({
                        parentId: comment._id,
                        taskId: comment.taskId,
                        type: 'get',
                    })
                        .then()
                        .finally(() => setIsLoading(false));
                }
                toggleReplies();
                break;
            }
            default:
                break;
        }
    };

    const onAddCommentHandler = useCallback(
        async (data: AddEditCommentFormType) => {
            toggleCreateReply(false);
            toggleReplies(true);
            setIsLoading(true);
            addCommentHandlerPromise({
                taskId: comment.taskId,
                text: data.text,
                parentId: comment._id,
            })
                .then()
                .finally(() => setIsLoading(false));
        },
        []
    );

    const onEditCommentHandler = useCallback((data: AddEditCommentFormType) => {
        setIsLoading(true);
        editCommentHandler({
            taskId: comment.taskId,
            id: comment._id,
            text: data.text,
        })
            .then()
            .finally(() => {
                setIsLoading(false);
                toggleEditReply(false);
            });
    }, []);

    const onDeleteCommentHandler = useCallback(
        (data: IDeleteCommentPayload) => {
            setIsLoading(true);
            deleteCommentHandler({
                id: data.id,
            })
                .then()
                .finally(() => {
                    setIsLoading(false);
                });
        },
        []
    );
    return (
        <>
            <StyledCommentWrapper>
                {isLoading && <Loader sizes="md" />}
                <CommentHeader
                    date={comment.date}
                    // eslint-disable-next-line no-underscore-dangle
                    id={comment._id}
                    name={comment.author}
                    onDelete={onDeleteCommentHandler}
                />
                <Text>{comment.text}</Text>
                <Flex gap={2}>
                    <CommentAction
                        onAction={commentControl('add')}
                        text="Add"
                    />
                    <CommentAction
                        onAction={commentControl('edit')}
                        text="Edit"
                    />
                    {comment.replyCount > 0 ? (
                        <CommentAction
                            onAction={commentControl('show')}
                            text={`${!showReplies ? 'show' : 'hide'} replies (${
                                comment.replyCount
                            })`}
                        />
                    ) : null}
                </Flex>
                {createReply ? (
                    <CommentCreateEdit
                        onAction={onAddCommentHandler}
                        onCancel={() => toggleCreateReply()}
                    />
                ) : null}
                {editReply ? (
                    <CommentCreateEdit
                        onAction={onEditCommentHandler}
                        onCancel={() => toggleEditReply()}
                        text={comment.text}
                    />
                ) : null}
            </StyledCommentWrapper>
            {Array.isArray(comment.comments) && showReplies ? (
                <Box pl={4}>
                    <CommentList comments={comment.comments} />
                </Box>
            ) : null}
        </>
    );
}

export default CommentItem;
