import { Box, IconButton, chakra } from '@chakra-ui/react';

export const StyledImageSliderWrapper = chakra(Box, {
    baseStyle: {
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        bgColor: 'blackAlpha.800',
        display: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        w: '100%',
        h: '100%',
        // transition: 'all 0.5s ease-in-out',
        // transform: 'scale(0)',
        // opacity: 0,
    },
});

export const StyledImageSliderWrapperFullscreenImage = chakra(Box, {
    baseStyle: {
        w: '80vw',
        h: 'auto',
        aspectRatio: '1 / 1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& img': {
            maxWidth: '100%',
            w: '100%',
            pointerEvents: 'none',
            userSelect: 'none',
        },
    },
});

export const StyledImageSliderBtn = chakra(IconButton, {
    baseStyle: {
        position: 'fixed',
        top: '50%',
        cursor: 'pointer',
        color: 'brand.common.white',
        opacity: 0.6,
        zIndex: 999,
        _hover: {
            opacity: 1,
        },
    },
});
