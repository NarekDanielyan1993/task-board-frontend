import theme from 'src/styles/chakra/theme';

import { ChakraProvider } from '@chakra-ui/react';
import Notification from 'src/component/notification';
import AuthRoute from 'src/component/route/authRoute';
import MainRoute from 'src/component/route/mainRoute';

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <AuthRoute />
                <MainRoute />
            </ChakraProvider>
            <Notification />
        </>
    );
}

export default App;
