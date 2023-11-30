import { chakra } from '@chakra-ui/react';

export const StyledLayout = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
});

export const StyledMain = chakra('main', {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        flex: 1,
        width: 'full',
    },
});
