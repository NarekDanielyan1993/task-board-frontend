import SubTaskForm from './subTaskCreate';

function SubTask({
    taskId,
    stageId,
    children,
}: {
    taskId: string;
    stageId: string;
    children: React.ReactNode;
}) {
    return (
        <>
            <SubTaskForm stageId={stageId} taskId={taskId} />
            {children}
        </>
    );
}

export default SubTask;
