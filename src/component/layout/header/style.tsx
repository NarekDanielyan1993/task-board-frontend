import { chakra } from '@chakra-ui/react';

export const StyledMainHeader = chakra('header', {
    baseStyle: {
        width: 'full',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '2',
        mb: '6',
        backgroundColor: 'brand.primary.main',
    },
});

export const StyledTitle = chakra('h1', {
    baseStyle: {
        fontSize: '2xl',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
});
