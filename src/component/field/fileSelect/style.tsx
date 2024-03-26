import { Text, chakra } from '@chakra-ui/react';

export const StyledFileSelect = chakra('div', {
    baseStyle: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        backgroundColor: 'brand.secondary.main',
        color: '#fff',
        borderRadius: 'md',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        border: 'none',
        outline: 'none',
    },
});

export const StyledFileText = chakra(Text, {
    baseStyle: {
        color: 'brand.primary.main',
        fontSize: 'md',
    },
});

export const StyledFileLabels = chakra('div', {
    baseStyle: {
        width: 'full',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        fontSize: 'sm',
        gap: 2,
        justifyContent: 'center',
        overflowY: 'auto',
    },
});
