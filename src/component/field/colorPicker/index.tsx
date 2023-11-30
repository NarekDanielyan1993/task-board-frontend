import {
    Box,
    Button,
    Flex,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/react';
import { HexColorPicker } from 'react-colorful';
import ModalWrapper from 'src/component/modalWrapper';
import useToggle from 'src/hooks/useToggle';

function ColorPicker({
    onChange,
    value = 'transparent',
    label = '',
}: {
    onChange: () => void;
    value: string;
    label: string;
}) {
    const { value: isOpen, toggle } = useToggle(false);
    return (
        <>
            <Flex alignItems="center" p={2}>
                <Text fontSize="md" mr={2}>
                    {label}
                </Text>
                <Box
                    bgColor={value}
                    border="4px solid black"
                    borderRadius="xs"
                    cursor="pointer"
                    h="20px"
                    onClick={() => toggle()}
                    w="40px"
                />
            </Flex>
            <ModalWrapper isOpen={isOpen} onClose={toggle}>
                <ModalBody py={4}>
                    <HexColorPicker
                        color={value}
                        onChange={onChange}
                        style={{ width: '100%', height: '250px' }}
                    />
                    <ModalFooter pb={0} pr={0}>
                        <Button onClick={() => toggle()} variant="primary">
                            apply
                        </Button>
                    </ModalFooter>
                </ModalBody>
            </ModalWrapper>
        </>
    );
}

export default ColorPicker;
