import { Box, Text, chakra } from '@chakra-ui/react';

export const StyledResetPasswordContainer = chakra(Box, {
    baseStyle: {
        flexBasis: 'full',
        flexGrow: 1,
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'full',
    },
});

export const StyledResetPasswordWrapper = chakra(Box, {
    baseStyle: {
        display: 'flex',
        flexDir: 'column',
        p: 2,
        gap: 4,
        w: 'xl',
        maxW: 'full',
        boxShadow: 'sm',
        borderRadius: 'md',
    },
});

export const StyledResetPasswordHeader = chakra(Text, {
    baseStyle: {
        fontWeight: 'bold',
        fontSize: '2xl',
        textAlign: 'center',
        textTransform: 'capitalize',
    },
});
