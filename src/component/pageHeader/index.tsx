import { Box } from '@chakra-ui/react';
import React from 'react';

function PageHeader({
    children,
    justify = 'center',
    gap = 0,
}: {
    children: React.ReactNode;
    justify?: string;
    gap?: number;
}) {
    return (
        <Box as="header" display="flex" gap={gap} justifyContent={justify}>
            {children}
        </Box>
    );
}

export default PageHeader;
