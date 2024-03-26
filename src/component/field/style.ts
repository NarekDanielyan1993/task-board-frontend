import {
    Box,
    FormControl,
    FormLabel,
    Input,
    // Select,
    chakra,
} from '@chakra-ui/react';
import Select from 'react-select';
// import { Select } from 'chakra-react-select';

export const StyledInput = chakra(Input, {
    baseStyle: {
        border: '1px solid',
        width: 'full',
        borderRadius: 'md',
        fontSize: 'md',
        pl: 2,
        color: 'brand.primary.darken',
        borderColor: 'brand.primary.main',
        '&:focus ~ label, &:not(:placeholder-shown) ~ label': {
            top: 0,
            backgroundColor: 'brand.common.white',
            fontSize: 'sm',
        },
        _focus: {
            border: '2px solid',
            boxShadow: 'none',
            borderColor: 'brand.primary.darken',
        },
        _invalid: {
            border: '2px solid',
            borderColor: 'brand.error.main',
            boxShadow: 'none',
        },
    },
});

export const StyledSelect = chakra(Select, {
    baseStyle: {
        border: '1px solid',
        width: 'full',
        borderRadius: 'md',
        fontSize: 'md',
        mb: 2,
        color: 'brand.primary.darken',
        borderColor: 'brand.primary.main',
        cursor: 'pointer',
        _focus: {
            border: '2px solid',
            boxShadow: 'none',
            borderColor: 'brand.primary.darken',
        },
        _hover: {
            cursor: 'pointer',
        },
        _invalid: {
            border: '2px solid',
            borderColor: 'brand.error.main',
            boxShadow: 'none',
        },
    },
});

export const datepickerStyles = {
    // basestyle: {
    '.react-datepicker-wrapper': {
        width: 'full',
        '.react-datepicker__input-container': {
            border: '1px solid',
            width: 'full',
            fontSize: 'md',
            color: 'brand.primary.darken',
            borderColor: 'brand.primary.main',
        },
    },
    // },
};

export const StyledDatePicker = chakra(Box, {
    baseStyle: {
        '&  .react-datepicker-wrapper': {
            width: 'full',
        },
    },
});

export const StyledFormControl = chakra(FormControl, {
    baseStyle: {
        position: 'relative',
    },
});

export const StyledFormLabel = chakra(FormLabel, {
    baseStyle: {
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        marginInline: '3',
        paddingInline: '1',
        transform: 'translateY(-50%)',
        fontSize: 'md',
        color: 'black',
        pointerEvents: 'none',
        transition: '0.5s ease',
    },
});

export const StyledErrorText = chakra('span', {
    baseStyle: {
        display: 'inline-flex',
        color: 'brand.error.main',
        fontSize: 'xs',
        ml: '2',
    },
});
