import { Center, Spinner } from '@chakra-ui/react';

function Loader({
    position = 'absolute',
    margin = 0,
    sizes = 'xl',
    withOverlay = false,
}: {
    position?: 'fixed' | 'relative' | 'absolute';
    margin?: number;
    sizes?: string;
    withOverlay?: boolean;
}) {
    return (
        <Center
            alignItems="center"
            display="flex"
            inset={0}
            margin={margin}
            position={position}
            {...(withOverlay && { bg: 'rgba(0, 0, 0, 0.5)' })}
            zIndex={9999}
        >
            <Spinner
                color="brand.primary.main"
                emptyColor="gray.200"
                size={sizes}
                speed="0.65s"
                thickness="4px"
            />
        </Center>
    );
}

export default Loader;
