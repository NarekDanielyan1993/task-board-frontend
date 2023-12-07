import { IAppState } from 'src/types';

export const boardSelector = (state: IAppState) => state.boardState.board;

export const boardSelectorState = (state: IAppState) => state.boardState;

export const stagesSelector = (state: IAppState) => state.boardState.stages;

export const tasksSelector = (state: IAppState) => state.boardState.tasks;

export const prioritiesSelector = (state: IAppState) =>
    state.boardState.priorities;
