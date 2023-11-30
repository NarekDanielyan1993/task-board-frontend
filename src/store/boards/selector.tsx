import { IAppState } from '@/types/store';

export const boardsSelectorBoards = (state: IAppState) =>
    state.boardsState.boards;
export const boardsSelector = (state: IAppState) => state.boardsState;
