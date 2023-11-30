import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ILink } from 'src/types/button';

function Link({ to, children, variant }: ILink) {
    return (
        <ChakraLink variant={variant}>
            <RouterLink to={to}>{children}</RouterLink>
        </ChakraLink>
    );
}

export default Link;
