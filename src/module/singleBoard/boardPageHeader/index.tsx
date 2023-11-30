import { Box } from '@chakra-ui/react';
import PageHeader from 'src/component/pageHeader';
import { stagesSelector } from 'src/store/board/selector';
import { useAppSelector } from 'src/store/createStore';
import StageCreate from '../stageCreate';
import TaskCreateEdit from '../taskCreateEdit';
import TaskSearchInput from '../taskSearchInput';

function BoardPageHeader() {
    const { data: stages } = useAppSelector(stagesSelector);
    return (
        <PageHeader>
            <Box
                alignItems="flex-start"
                display="flex"
                gap={4}
                justifyContent="center"
            >
                <TaskSearchInput isDisabled={!(stages.length > 0)} />
                <TaskCreateEdit
                    isDisabled={!(stages.length > 0)}
                    title="Create Task"
                />
                <StageCreate />
            </Box>
        </PageHeader>
    );
}

export default BoardPageHeader;
