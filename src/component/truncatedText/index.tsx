import { Text } from '@chakra-ui/react';
import { IText } from 'src/types';

function TruncatedText({ children, fontSizes = 'sm' }: IText) {
    return (
        <Text fontSize={fontSizes} noOfLines={1}>
            {children}
        </Text>
    );
}

export default TruncatedText;
