import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

function ModalWrapper({
    isOpen,
    size = 'xl',
    onClose,
    children,
}: {
    isOpen: boolean;
    onClose: () => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    children: React.ReactNode;
}) {
    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior="inside"
            size={size}
        >
            <ModalOverlay />
            <ModalContent whiteSpace="pre-wrap">{children}</ModalContent>
        </Modal>
    );
}

export default ModalWrapper;
