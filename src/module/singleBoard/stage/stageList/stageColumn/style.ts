import { Stack, chakra } from '@chakra-ui/react';

const StyledStageColumn = chakra(Stack, {
    baseStyle: {
        position: 'relative',
        w: 'xs',
        padding: 2,
        flexShrink: 0,
        flexGrow: 0,
        overflowY: 'auto',
        borderRadius: 'md',
        backgroundColor: 'brand.background.main',
        boxShadow: 'md',
    },
});

export default StyledStageColumn;
