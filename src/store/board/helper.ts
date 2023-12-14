/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
import { IComment } from 'src/types';

/* eslint-disable no-param-reassign */
export function addCommentsToTask(
    comments: IComment[],
    parentId: string | null,
    commentData: IComment[],
    type: 'get' | 'add'
) {
    if (!parentId) {
        const updatedComments = [...comments, ...commentData];
        return updatedComments;
    }
    return comments.map((comment) => {
        if (comment._id === parentId) {
            if (!comment.comments) {
                comment.comments = [];
            }
            if (type === 'add') {
                comment.replyCount += 1;
            }
            comment.comments = commentData;
        }
        if (comment.comments && comment.comments.length > 0) {
            comment.comments = addCommentsToTask(
                comment.comments,
                parentId,
                commentData,
                type
            );
        }
        return comment;
    });
}

export function findCommentAndUpdate(
    comments: IComment[],
    commentData: IComment
) {
    return comments.map((comment) => {
        if (comment._id === commentData._id) {
            comment = { ...comment, ...commentData };
        } else if (
            Array.isArray(comment.comments) &&
            comment.comments.length > 0
        ) {
            comment.comments = findCommentAndUpdate(
                comment.comments,
                commentData
            );
        }
        return comment;
    });
}

export function findCommentAndRemove(
    comments: IComment[],
    commentId: string
): IComment[] {
    const updatedComments = comments.reduce((acc, comment) => {
        // eslint-disable-next-line no-underscore-dangle
        if (comment._id === commentId) {
            return acc;
        }

        if (comment.comments && comment.comments.length > 0) {
            const updatedComments = findCommentAndRemove(
                comment.comments,
                commentId
            );
            if (comment.comments.length > updatedComments.length) {
                comment.replyCount -= 1;
            }
            comment.comments = updatedComments;
        }
        return [...acc, comment];
    }, [] as IComment[]);

    return updatedComments;
}
