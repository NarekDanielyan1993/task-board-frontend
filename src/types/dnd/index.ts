export interface IDragItem {
    id: string;
    columnId: string;
    index: number;
}

export interface IDndTask {
    sourceIndex: number;
    destinationIndex: number;
    stageId: string;
    type: 'task' | 'stage';
}
