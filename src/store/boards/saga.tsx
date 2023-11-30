import type { PayloadAction } from '@reduxjs/toolkit';
import { implementPromiseAction } from '@teroneko/redux-saga-promise';
import type { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import BOARD_API from 'src/constant/api';
import { IBoard, IRemoveBoardPayload } from 'src/types';
import { apiSagaRequest } from 'src/utills/apiRequest';
import { GET_BOARDS, REMOVE_BOARD, addBoardPromise } from './action';
import {
    addBoardSuccess,
    getBoardsFailure,
    getBoardsInit,
    getBoardsSuccess,
    removeBoardSuccess,
    toggleBoardLoading,
} from './reducer';

function* getBoardsGenerator() {
    yield put(getBoardsInit());
    try {
        const { data }: AxiosResponse<IBoard[]> = yield call(
            apiSagaRequest,
            'get',
            BOARD_API.GET_BOARDS,
            {},
            { withCredentials: true }
        );
        yield put(getBoardsSuccess(data));
    } catch (error) {
        yield put(getBoardsFailure());
    }
}

function* addBoardPromiseGenerator(
    action: typeof addBoardPromise.types.triggerAction
) {
    yield call(implementPromiseAction, action, function* addBoard() {
        yield put(toggleBoardLoading(true));
        try {
            const response: AxiosResponse<IBoard> = yield call(
                apiSagaRequest,
                'post',
                BOARD_API.ADD_BOARD,
                action.payload
            );
            yield put(addBoardSuccess(response.data));
            yield put(toggleBoardLoading(false));
            return response.data;
        } catch (error) {
            yield put(toggleBoardLoading(false));
            return error;
        }
    });
}

function* removeBoardGenerator(action: PayloadAction<IRemoveBoardPayload>) {
    yield put(toggleBoardLoading(true));
    try {
        const { id } = action.payload;
        yield call(apiSagaRequest, 'delete', BOARD_API.REMOVE_BOARD, {
            data: action.payload,
        });

        yield put(removeBoardSuccess(id));
    } catch (error) {
        // yield put(addBoardFailure(error));
    }
    yield put(toggleBoardLoading(false));
}

function* watchBoards() {
    yield takeLatest(GET_BOARDS, getBoardsGenerator);
    yield takeLatest(addBoardPromise.type, addBoardPromiseGenerator);
    yield takeLatest(REMOVE_BOARD, removeBoardGenerator);
}
export default watchBoards;
