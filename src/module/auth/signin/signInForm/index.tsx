import { Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Link from 'src/component/button/link';
import { AUTH_ROUTES } from 'src/constant';
import BOARD_ROUTES from 'src/constant/route';
import useDidUpdate from 'src/hooks/useDidUpdate';
import useForm from 'src/hooks/useForm';
import { logIn } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import {
    loginValidationSchema,
    signInValidationSchemaType,
} from 'src/utills/validation/auth';
import { StyledSignInLink } from '../style';

function LoginForm() {
    const dispatch = useAppDispatch();
    const { isLoading, accessToken } = useAppSelector(authSelector);
    const navigate = useNavigate();
    console.log(8989);
    const defaultValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const { FormField, handleSubmit } = useForm<signInValidationSchemaType>({
        defaultValues,
        validationSchema: loginValidationSchema,
    });

    const formSubmitHandler = (formData: signInValidationSchemaType) => {
        const data = { ...formData };
        dispatch(logIn(data));
    };

    useDidUpdate(() => {
        if (!isLoading && accessToken) {
            navigate(BOARD_ROUTES.boards);
        }
    }, [isLoading]);

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <SimpleGrid columns={1} spacing={6}>
                {FormField({
                    label: 'Email',
                    name: 'email',
                })}
                {FormField({
                    label: 'Password',
                    name: 'password',
                    type: 'password',
                })}
            </SimpleGrid>
            <Flex justify="flex-start">
                <Link to={AUTH_ROUTES.RESET_PASSWORD} variant="tertiary">
                    Forgot password
                </Link>
            </Flex>
            <Button
                isLoading={isLoading}
                mt={4}
                type="submit"
                variant="primary"
                w="full"
            >
                signIn
            </Button>
            <StyledSignInLink>
                Do not have an account?
                <Link to={AUTH_ROUTES.SIGN_UP} variant="secondary">
                    Sign up
                </Link>
            </StyledSignInLink>
        </form>
    );
}

export default LoginForm;
