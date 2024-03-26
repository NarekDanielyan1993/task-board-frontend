import { Flex, chakra } from '@chakra-ui/react';

const StyledStageContainer = chakra(Flex, {
    baseStyle: {
        display: 'flex',
        flexGrow: 1,
        maxW: '6xl',
        width: 'full',
        gap: 4,
        mx: 'auto',
        mt: 6,
        p: 4,
        overflow: 'auto',
    },
});

export default StyledStageContainer;
