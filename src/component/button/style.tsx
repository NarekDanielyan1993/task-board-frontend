import { Button, chakra } from '@chakra-ui/react';

export const StyledButton = chakra(Button, {
    baseStyle: {
        textTransform: 'uppercase',
        // padding: `${theme.spacing(0.6)}`,
        height: 'max-content',
        '&:hover:enabled': {
            color: 'brand.secondary',
        },
    },
});

// const StyledButton = styled(Button)(({ theme }) => ({
//     '&': {},
//     '&.text': {
//         backgroundColor: 'transparent',
//         color: theme.palette.common.white,
//         border: 'none',
//         '&:hover': {
//             color: theme.palette.secondary.darken,
//         },
//     },
//     '&.truncate': {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//         padding: theme.spacing(0.5),
//         fontSize: theme.fontSizes.xs,
//     },
//     '&.card': {
//         borderRadius: 0,
//         backgroundColor: theme.palette.background.secondary.main,
//         color: theme.palette.common.lighterBlack,
//         padding: `${(theme.spacing(0.2), theme.spacing(0.4))}`,

//         '&:hover': {
//             backgroundColor: theme.palette.common.darkenBlack,
//         },
//     },
//     '&.auth': {
//         backgroundColor: theme.palette.text.primary.main,
//         fontSize: theme.fontSizes.md,
//         '&:hover:enabled': {
//             backgroundColor: theme.palette.text.primary.darken,
//         },
//     },
// }));

export default StyledButton;
