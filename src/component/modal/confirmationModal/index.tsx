import { Button, ModalBody, ModalFooter, ModalHeader } from '@chakra-ui/react';
import ModalWrapper from 'src/component/modalWrapper';
import useDidUpdate from 'src/hooks/useDidUpdate';

function ConfirmationModal({
    isOpen,
    onClose,
    header,
    content,
    actionFn,
    actionButtonText = 'OK',
    isLoading = false,
}: {
    isOpen: boolean;
    onClose: () => void;
    header?: string;
    content: string;
    actionFn: () => void;
    actionButtonText?: string;
    isLoading?: boolean;
}) {
    useDidUpdate(() => {
        if (!isLoading) {
            onClose();
        }
    }, [isLoading]);

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose}>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody fontSize="md">{content}</ModalBody>
            <ModalFooter gap={2}>
                <Button onClick={onClose} variant="primary">
                    Cancel
                </Button>
                <Button
                    isLoading={isLoading}
                    onClick={actionFn}
                    variant="primary"
                >
                    {actionButtonText}
                </Button>
            </ModalFooter>
        </ModalWrapper>
    );
}

export default ConfirmationModal;
