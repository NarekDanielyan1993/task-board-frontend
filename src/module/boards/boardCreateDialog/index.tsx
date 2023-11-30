import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import Loader from 'src/component/loader';
import useForm from 'src/hooks/useForm';
import { useBoardsContext } from 'src/pages/boards/context';
import { IBoard } from 'src/types/board';
import { IBoardCreate } from 'src/types/boards';

function BoardCreateDialog({ isOpen, onClose }: IBoardCreate) {
    const { addBoard, isBoardsLoading } = useBoardsContext();

    const defaultValues = {
        name: '',
    };

    const { FormField, handleSubmit } = useForm<IBoard>({
        defaultValues,
    });

    const formSubmitHandler = (data: IBoard) => {
        addBoard(data);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {isBoardsLoading && <Loader />}
                <ModalHeader fontSize="2xl" fontWeight="extrabold">
                    Create board
                </ModalHeader>
                <ModalBody>
                    <form
                        id="board-form"
                        onSubmit={handleSubmit(formSubmitHandler)}
                    >
                        {FormField({
                            name: 'name',
                            label: 'Board Name',
                            type: 'text',
                        })}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Flex gap={2}>
                        <Button
                            form="board-form"
                            type="submit"
                            variant="secondary"
                        >
                            Submit
                        </Button>
                        <Button onClick={onClose} size="md" variant="secondary">
                            Close
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default BoardCreateDialog;
