import { ThemeOverride, extendTheme } from '@chakra-ui/react';
import Button from './components/button';
import Link from './components/link';
import borderRadius from './foundations/borderRadius';
import breakpoints from './foundations/breakpoints';
import kanbanColorScheme from './foundations/colors';
import fontSizes from './foundations/fontSizes';
import fontWeights from './foundations/fontWeights';
import shadows from './foundations/shadow';
import sizes from './foundations/sizes';
import spacing from './foundations/spaces';
import globalStyles from './globalStyles';
import withDefaultStyles from './withDefaultStyles';

const theme: ThemeOverride = extendTheme(...withDefaultStyles, {
    space: spacing,
    sizes: { ...spacing, ...sizes },
    fontSizes,
    shadows: { ...shadows },
    fontWeights,
    breakpoints,
    radii: borderRadius,
    colors: {
        brand: { ...kanbanColorScheme },
    },
    components: {
        Button,
        Link,
    },
    styles: {
        ...globalStyles,
    },
});

export type MainThemeTypes = typeof theme;

export default theme;
