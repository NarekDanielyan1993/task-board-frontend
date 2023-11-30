import { Button, Text } from '@chakra-ui/react';
import useTruncateText from 'src/hooks/useTruncateText';

function TextTruncate({
    text,
    length = 50,
}: {
    length?: number;
    text: string;
}) {
    const { truncatedText, isExpanded, shouldTruncate, handleExpand } =
        useTruncateText(text, length);
    return (
        <>
            <Text>{truncatedText}</Text>
            {shouldTruncate && (
                <Button
                    display="block"
                    onClick={handleExpand}
                    p={0}
                    size="xs"
                    variant="ghost"
                >{`Show ${isExpanded ? 'less' : 'more'}`}</Button>
            )}
        </>
    );
}

export default TextTruncate;
