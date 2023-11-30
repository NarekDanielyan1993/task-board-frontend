import { Flex } from '@chakra-ui/react';
import { ITextField } from 'src/types/input';
import {
    StyledErrorText,
    StyledFormControl,
    StyledFormLabel,
    StyledInput,
} from '../style';

function TextField({ name, onChange, value, label, error }: ITextField) {
    return (
        <Flex display="flex" flexDir="column" mb={2} w="full">
            <StyledFormControl>
                <StyledInput
                    id={name}
                    name={name}
                    onChange={onChange}
                    placeholder=" "
                    value={value}
                />
                <StyledFormLabel htmlFor={name}>{label}</StyledFormLabel>
            </StyledFormControl>
            <StyledErrorText>{error && error}</StyledErrorText>
        </Flex>
    );
}

export default TextField;
