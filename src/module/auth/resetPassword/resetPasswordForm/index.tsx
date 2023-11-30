import { Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from 'src/component/button/link';
import { AUTH_API } from 'src/constant';
import useCookie from 'src/hooks/useCookie';
import useDidUpdate from 'src/hooks/useDidUpdate';
import useForm from 'src/hooks/useForm';
import { resetPassword, updatePassword } from 'src/store/auth/action';
import authSelector from 'src/store/auth/selector';
import { useAppDispatch, useAppSelector } from 'src/store/createStore';
import { isExists } from 'src/utills/helper';
import {
    CombinePasswordReset,
    resetPasswordValidationSchema,
    updatePasswordValidationSchema,
} from 'src/utills/validation/auth';

function ResetPasswordForm() {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(authSelector);
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const token = params.get('token');
    const { deleteCookie } = useCookie();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isExists(token) && type) {
            navigate(AUTH_API.LOG_IN);
        }
    }, []);

    const defaultValues = useMemo(() => {
        if (type) {
            return {
                password: '',
                confirmPassword: '',
            };
        }
        return {
            email: '',
        };
    }, []);

    const { FormField, reset, handleSubmit } = useForm<CombinePasswordReset>({
        defaultValues,
        validationSchema: type
            ? updatePasswordValidationSchema
            : resetPasswordValidationSchema,
    });

    const formSubmitHandler = (formData: CombinePasswordReset) => {
        const data = { ...formData };
        if (type && isExists<string>(token)) {
            dispatch(updatePassword({ password: data.password, token }));
            return;
        }
        deleteCookie('isLoggedIn');
        dispatch(resetPassword(data));
    };

    useDidUpdate(() => {
        if (!isLoading) {
            reset();
        }
    }, [isLoading]);

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)}>
            <SimpleGrid columns={1} spacing={6}>
                {type ? (
                    <>
                        {FormField({
                            name: 'password',
                            type: 'password',
                            label: 'Password',
                        })}
                        {FormField({
                            name: 'confirmPassword',
                            type: 'password',
                            label: 'Confirm Password',
                        })}
                    </>
                ) : (
                    FormField({
                        label: 'Email',
                        name: 'email',
                    })
                )}
            </SimpleGrid>
            {type ? (
                <Flex justify="center" mt={4}>
                    <Link to={AUTH_API.LOG_IN} variant="tertiary">
                        redirect to log in
                    </Link>
                </Flex>
            ) : null}
            <Button
                isLoading={isLoading}
                mt={4}
                type="submit"
                variant="primary"
                w="full"
            >
                reset
            </Button>
        </form>
    );
}

export default ResetPasswordForm;
