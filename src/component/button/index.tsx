import { IButtonProps } from 'src/types';
import StyledButton from './style';

function Button({ variant = 'primary', onClick, children }: IButtonProps) {
    return (
        <StyledButton onClick={onClick} variant={variant}>
            {children}
        </StyledButton>
    );
}

export default Button;
