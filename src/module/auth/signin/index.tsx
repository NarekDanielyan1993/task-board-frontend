import ThirdPartySignIn from '../thirdPartySignIn';
import LoginForm from './signInForm';
import {
    StyledSignInContainer,
    StyledSignInHeader,
    StyledSignInWrapper,
} from './style';

function LogIn() {
    return (
        <StyledSignInContainer>
            <StyledSignInWrapper>
                <StyledSignInHeader>Log In</StyledSignInHeader>
                <LoginForm />
                <ThirdPartySignIn />
            </StyledSignInWrapper>
        </StyledSignInContainer>
    );
}

export default LogIn;
