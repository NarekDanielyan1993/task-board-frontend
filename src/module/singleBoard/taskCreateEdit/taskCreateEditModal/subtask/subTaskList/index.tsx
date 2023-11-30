import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    List,
    Text,
} from '@chakra-ui/react';
import { useBoardContext } from 'src/pages/board/context';
import { ISubTask } from 'src/types';
import SubTaskItem from '../subTaskItem';

function SubTaskList({ subTasks }: { subTasks: ISubTask[] }) {
    const { deleteSubTaskHandler } = useBoardContext();
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <AccordionButton
                    bgColor="brand.background.main"
                    color="brand.primary.lighten"
                    display="flex"
                    justifyContent="space-between"
                >
                    <Text as="p">Subtasks</Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <List display="flex" flexDir="column" gap={2}>
                        {Array.isArray(subTasks) &&
                            subTasks.length > 0 &&
                            subTasks.map((subtask) => {
                                return (
                                    <SubTaskItem
                                        onDelete={deleteSubTaskHandler}
                                        subtask={subtask}
                                    />
                                );
                            })}
                    </List>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}

export default SubTaskList;
