import { Box, chakra } from '@chakra-ui/react';

export const StyledStageItemWrapper = chakra(Box, {
    baseStyle: {
        position: 'relative',
        w: '18rem',
        flexShrink: 0,
        flexGrow: 0,
        p: 2,
        mx: 'auto',
        fontSize: 'md',
        borderRadius: 'md',
        boxShadow: 'md',
        bgColor: 'brand.common.white',
        fontWeight: 'bold',
        color: 'brand.common.black',
    },
});

export const StyledStageItemHeader = chakra('div', {
    baseStyle: {
        width: 'full',
        p: 1,
        bgColor: 'brand.common.white',
        color: 'brand.primary.main',
    },
});

export const StyledStageItemContent = chakra('div', {
    baseStyle: {
        width: 'full',
        my: 4,
    },
});

export const StyledStageItemFooter = chakra('div', {
    baseStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 2,
    },
});
