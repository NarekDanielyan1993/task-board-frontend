import { Flex } from '@chakra-ui/react';
import { IComment } from 'src/types';
import CommentItem from '../commentItem';

function CommentList({ comments }: { comments: IComment[] }) {
    return (
        <Flex flexDir="column" flexGrow={1} gap={4} pos="relative">
            {Array.isArray(comments) &&
                comments.map((comment) => {
                    return <CommentItem comment={comment} key={comment.id} />;
                })}
        </Flex>
    );
}

export default CommentList;
