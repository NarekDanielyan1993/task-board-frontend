import { NumberInput, NumberInputField } from '@chakra-ui/react';

function NumberField({
    value,
    onChange,
}: {
    value: number;
    onChange: (valueAsString: string, valueAsNumber: number) => void;
}) {
    return (
        <NumberInput onChange={onChange} value={value}>
            <NumberInputField />
        </NumberInput>
    );
}

export default NumberField;
