export interface IDragItem {
    id: string;
    columnId: string;
    index: number;
}

export interface IDndTask {
    sourceId: string;
    destinationId: string;
    type: 'task' | 'stage';
}
