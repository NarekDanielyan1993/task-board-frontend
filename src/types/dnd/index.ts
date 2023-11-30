export interface IDragItem {
    id: string;
    columnId: string;
    index: number;
    // type: (typeof DND_ITEMS_TYPE)[keyof typeof DND_ITEMS_TYPE];
}

export interface IDropData {
    id: string;
    from: string;
    to: string;
}
