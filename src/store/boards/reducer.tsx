/* eslint-disable no-param-reassign */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IBoard, IBoardsState } from 'src/types';

const initialState: IBoardsState = {
    boards: {
        isFetched: false,
        isLoading: false,
        data: [],
    },
    isLoading: false,
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        toggleBoardLoading: (
            state: IBoardsState,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload;
        },
        getBoardsInit: (state: IBoardsState) => {
            state.boards.isLoading = true;
            state.boards.isFetched = true;
            state.boards.data = [];
        },
        addBoardSuccess: (
            state: IBoardsState,
            action: PayloadAction<IBoard>
        ) => {
            state.boards.data = [...state.boards.data, action.payload];
        },
        getBoardsSuccess: (
            state: IBoardsState,
            action: PayloadAction<IBoard[]>
        ) => {
            state.boards.isLoading = false;
            state.boards.isFetched = true;
            state.boards.data = action.payload;
        },
        getBoardsFailure: (state: IBoardsState) => {
            state.boards.isLoading = false;
            state.boards.isFetched = true;
            state.boards.data = [];
        },
        removeBoardSuccess: (
            state: IBoardsState,
            action: PayloadAction<string>
        ) => {
            state.boards.data = state.boards.data.filter(
                // eslint-disable-next-line no-underscore-dangle
                (item: IBoard) => item._id !== action.payload
            );
        },
    },
});

export const {
    getBoardsSuccess,
    addBoardSuccess,
    getBoardsFailure,
    getBoardsInit,
    toggleBoardLoading,
    removeBoardSuccess,
} = boardsSlice.actions;

export default boardsSlice.reducer;
