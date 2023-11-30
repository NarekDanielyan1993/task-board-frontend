import ResetPasswordForm from './resetPasswordForm';
import {
    StyledResetPasswordContainer,
    StyledResetPasswordHeader,
    StyledResetPasswordWrapper,
} from './style';

function ResetPassword() {
    return (
        <StyledResetPasswordContainer>
            <StyledResetPasswordWrapper>
                <StyledResetPasswordHeader>
                    Reset Password
                </StyledResetPasswordHeader>
                <ResetPasswordForm />
            </StyledResetPasswordWrapper>
        </StyledResetPasswordContainer>
    );
}

export default ResetPassword;
