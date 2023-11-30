import { Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import IconButton from 'src/component/button/iconButton';
import useToggle from 'src/hooks/useToggle';
import { ITextField } from 'src/types/input';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '../style';

function PasswordField({ name, onChange, value, label, error }: ITextField) {
    const { value: passwordToggle, toggle } = useToggle(false);

    const togglePasswordHandler = () => {
        toggle();
    };

    return (
        <Flex display="flex" flexDir="column" mb={2} w="full">
            <StyledFormControl>
                <InputGroup>
                    <StyledInput
                        id={name}
                        name={name}
                        onChange={onChange}
                        placeholder=" "
                        type={passwordToggle ? 'text' : 'password'}
                        value={value}
                    />
                    <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>
                    <InputRightElement onClick={togglePasswordHandler}>
                        {passwordToggle ? (
                            <IconButton
                                ariaLabel="show-password"
                                iconName="view"
                            />
                        ) : (
                            <IconButton
                                ariaLabel="hide-passwrod"
                                iconName="viewOff"
                            />
                        )}
                    </InputRightElement>
                </InputGroup>
            </StyledFormControl>
            <StyledErrorText>{error && error}</StyledErrorText>
        </Flex>
    );
}

export default PasswordField;
