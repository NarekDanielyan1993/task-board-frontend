import { TimeIcon } from '@chakra-ui/icons';
import { Tag as ChakraTag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

function Tag({
    text,
    bgColor = '',
    icon,
    iconSize = '1rem',
    size = 'sm',
    color = 'brand.common.white',
}: {
    text: string;
    bgColor?: string;
    icon?: string;
    color?: string;
    size?: string;
    iconSize?: string;
}) {
    const icons = {
        date: TimeIcon,
    };
    return (
        <ChakraTag bgColor={bgColor} color={color} px={2} py={1} size={size}>
            {icon && (
                <TagLeftIcon as={icons[icon as string]} boxSize={iconSize} />
            )}
            <TagLabel>{text}</TagLabel>
        </ChakraTag>
    );
}

export default Tag;
