import { chakra } from '@chakra-ui/react';

const StyledBoardsContainer = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        maxW: '4xl',
        width: '100%',
        flexWrap: 'wrap',
        margin: '0 auto',
        gap: '2',
    },
});

export default StyledBoardsContainer;
