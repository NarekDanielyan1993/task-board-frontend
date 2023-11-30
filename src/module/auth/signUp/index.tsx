import SignUpForm from './signUpForm';
import {
    StyledAuthContainer,
    StyledSignUpHeader,
    StyledSignUpWrapper,
} from './style';

function SignUp() {
    return (
        <StyledAuthContainer>
            <StyledSignUpWrapper>
                <StyledSignUpHeader>Sign up</StyledSignUpHeader>
                <SignUpForm />
            </StyledSignUpWrapper>
        </StyledAuthContainer>
    );
}

export default SignUp;
