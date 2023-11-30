import { chakra } from '@chakra-ui/react';

export const StyledBoardCard = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        width: 'full',
        maxW: '3xs',
        minH: '4xs',
        margin: '6',
        padding: '4',
        borderRadius: 'md',
        backgroundColor: 'brand.common.main',
        boxShadow: 'md',
        // _hover: {
        //     transform: 'scale(1.05)',
        //     transitionDuration: '0.5s',
        //     transitionTimingFunction: 'ease-in-out',
        // },
    },
});

export const StyledCardContent = chakra('div', {
    baseStyle: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const StyledCardContentText = chakra('div', {
    baseStyle: {
        textTransform: 'capitalize',
        fontSize: '2xl',
        fontWeight: 'bold',
    },
});

export const StyledCardHeader = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

export const StyledCardActions = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'center',
        py: '1',
    },
});
