import { chakra } from '@chakra-ui/react';

const StyledCommentWrapper = chakra('div', {
    baseStyle: {
        position: 'relative',
        display: 'flex',
        flexDir: 'column',
        gap: 2,
        width: 'full',
        p: 2,
        bgColor: 'brand.background.main',
    },
});

export default StyledCommentWrapper;
