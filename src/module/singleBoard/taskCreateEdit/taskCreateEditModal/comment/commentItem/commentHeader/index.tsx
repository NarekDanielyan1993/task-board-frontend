import { Flex, Text } from '@chakra-ui/react';
import IconButton from 'src/component/button/iconButton';
import { IDeleteCommentPayload } from 'src/types';

function CommentHeader({
    name,
    date,
    onDelete,
    id,
}: {
    id: string;
    name: string;
    date: string;
    onDelete: (id: IDeleteCommentPayload) => void;
}) {
    console.log(id);
    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Flex gap={2}>
                <Text>{name}</Text>
                <Text>{date}</Text>
            </Flex>
            <Flex>
                <IconButton
                    ariaLabel="delete"
                    iconName="delete"
                    onClick={() => onDelete({ id })}
                />
            </Flex>
        </Flex>
    );
}

export default CommentHeader;
