import { CheckIcon } from '@chakra-ui/icons';
import Link from 'src/component/button/link';
import { AUTH_ROUTES } from 'src/constant';
import {
    StyledSignUpCompletionContainer,
    StyledSignUpCompletionHeader,
    StyledSignUpCompletionText,
    StyledSignUpCompletionWrapper,
} from './style';

function CompletionSignUp() {
    return (
        <StyledSignUpCompletionContainer>
            <StyledSignUpCompletionWrapper>
                <CheckIcon
                    color="brand.secondary.main"
                    height={20}
                    width={20}
                />
                <StyledSignUpCompletionHeader>
                    thank you
                </StyledSignUpCompletionHeader>
                <StyledSignUpCompletionText as="span">
                    Thank you for signing up. To get started, you can click on
                    the link below to go to the Log in page.
                </StyledSignUpCompletionText>
                <Link to={AUTH_ROUTES.LOGIN} variant="primary">
                    login
                </Link>
            </StyledSignUpCompletionWrapper>
        </StyledSignUpCompletionContainer>
    );
}

export default CompletionSignUp;
