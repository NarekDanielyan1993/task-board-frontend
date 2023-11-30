import { Button } from '@chakra-ui/react';
import useDidUpdate from 'src/hooks/useDidUpdate';
import useToggle from 'src/hooks/useToggle';
import { useBoardContext } from 'src/pages/board/context';
import { boardSelectorState } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import StageModalCreate from './stageCreateModal';

function StageCreate() {
    const { value, toggle } = useToggle(false);
    const { addStageHandler } = useBoardContext();
    const { isStageLoading } = useAppSelector(boardSelectorState);

    useDidUpdate(() => {
        if (!isStageLoading && value) {
            toggle(false);
        }
    }, [isStageLoading]);

    return (
        <>
            <Button onClick={() => toggle()} variant="primary">
                create stage
            </Button>
            {value ? (
                <StageModalCreate
                    isLoading={isStageLoading}
                    isOpen={value}
                    onClose={() => toggle()}
                    onSubmit={addStageHandler}
                    title="create stage"
                />
            ) : null}
        </>
    );
}

export default StageCreate;
