import { Button, Flex } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { AUTH_API } from 'src/constant';

function ThirdPartySignIn() {
    const googleLogin = () => {
        window.location.href = `${'http://localhost:5000/api'}${
            AUTH_API.LOGIN_GOOGLE
        }`;
    };

    return (
        <Flex direction="column" gap={4}>
            <Button
                leftIcon={<FcGoogle />}
                onClick={googleLogin}
                variant="outline"
                w="full"
            >
                Sign In With Google
            </Button>
        </Flex>
    );
}

export default ThirdPartySignIn;
