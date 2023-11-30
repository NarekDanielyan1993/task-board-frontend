import { defineStyleConfig } from '@chakra-ui/react';

const disabledStyles = {
    cursor: 'not-allowed',
    _hover: {
        bgColor: 'brand.secondary.main',
    },
};
const Button = defineStyleConfig({
    baseStyle: {
        py: '1',
        px: '2',
        borderRadius: 'md',
        fontSize: 'sm',
        height: 'fit-content',
        textTransform: 'uppercase',
        fontWeight: 'semibold',
        transition: 'all 0.5s ease-out',
        border: 'none',
        width: 'fit-content',
    },
    variants: {
        primary: {
            fontSize: 'sm',
            bgColor: 'brand.secondary.main',
            color: 'brand.common.white',
            borderRadius: 'md',
            _hover: {
                bgColor: 'brand.secondary.darken',
                _disabled: {
                    ...disabledStyles,
                },
            },
        },
        primaryLight: {
            bgColor: 'brand.secondary.lighten',
            color: 'brand.primary.lighten',
            _hover: {
                bgColor: 'brand.secondary.darken',
                _disabled: {
                    ...disabledStyles,
                },
            },
        },
        secondary: {
            bgColor: 'brand.primary.main',
            color: 'white',
        },
        tertiary: {
            backgroundColor: 'brand.tertiary.main',
            color: 'brand.common.white',
            p: 2,
            _hover: {
                backgroundColor: 'brand.tertiary.darken',
            },
        },
        ghost: {
            display: 'inline',
            p: 1,
            fontSize: 'xs',
            bgColor: 'transparent',
            color: 'brand.primary.main',
            _hover: {
                color: 'brand.primary.main',
            },
        },
        pg: {
            bgColor: 'brand.primary.lighten',
            color: 'black',
            _hover: {
                color: 'brand.primary.lighten',
                bgColor: 'black',
            },
            _active: {
                bgColor: 'brand.secondary.main',
                color: 'white',
            },
        },
        iconPrimary: {
            p: 1,
            color: 'brand.primary.main',
            _hover: {
                color: 'brand.primary.darken',
            },
        },
        iconDelete: {
            p: 1,
            color: 'brand.error.main',
            _hover: {
                color: 'brand.error.darken',
            },
        },
        delete: {
            bgColor: 'brand.error.main',
            color: 'brand.common.white',
            _hover: {
                bgColor: 'brand.error.darken',
            },
        },
    },
});

export default Button;
