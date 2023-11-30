import { Button, SimpleGrid } from '@chakra-ui/react';
import Link from 'src/component/button/link';
import { AUTH_ROUTES } from 'src/constant';
import useDidUpdate from 'src/hooks/useDidUpdate';
import useForm from 'src/hooks/useForm';
import { signUp } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import {
    signUpValidationSchema,
    signUpValidationSchemaType,
} from 'src/utills/validation/auth';
import { StyledSignUpLink } from '../style';

function SignUpForm() {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const { FormField, handleSubmit, reset } =
        useForm<signUpValidationSchemaType>({
            defaultValues,
            validationSchema: signUpValidationSchema,
        });

    const formSubmitHandler = (formData: signUpValidationSchemaType) => {
        const data = { ...formData };
        console.log(data);
        dispatch(signUp(data));
    };

    useDidUpdate(() => {
        if (!isLoading) {
            reset();
        }
    }, [isLoading]);

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <SimpleGrid columns={2} spacing={4}>
                {FormField({
                    label: 'Name',
                    name: 'name',
                })}
                {FormField({
                    label: 'Email',
                    name: 'email',
                })}
                {FormField({
                    label: 'Password',
                    name: 'password',
                    type: 'password',
                })}
                {FormField({
                    label: 'Confirm Password',
                    name: 'confirmPassword',
                    type: 'password',
                })}
            </SimpleGrid>
            <Button
                isLoading={isLoading}
                mt={4}
                type="submit"
                variant="primary"
                w="full"
            >
                signUp
            </Button>
            <StyledSignUpLink>
                Do not have an account?
                <Link to={AUTH_ROUTES.LOGIN} variant="secondary">
                    Log in
                </Link>
            </StyledSignUpLink>
        </form>
    );
}

export default SignUpForm;
