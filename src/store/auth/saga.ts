import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AUTH_API } from 'src/constant/api';
import { NOTIFICATION_MESSAGES } from 'src/constant/notification';
import {
    ILogInPayload,
    ILogInResponse,
    IResetPasswordPayload,
    ISignUpPayload,
    IUpdatePasswordPayload,
} from 'src/types/auth';
import { IBoard } from 'src/types/board';
import { apiSagaRequest } from 'src/utills/apiRequest';
import { showNotification } from '../notification/reducer';
import {
    AUTH_GOOGLE_LOG_IN,
    AUTH_LOG_IN,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_SIGN_UP,
    AUTH_UPDATE_PASSWORD,
    LOG_OUT,
} from './action';
import {
    logInFailed,
    logInSuccess,
    logoutSuccess,
    refreshTokenFailed,
    refreshTokenInit,
    refreshTokenSuccess,
    setIsAuthLoading,
} from './reducer';

function* signUpGenerator(action: PayloadAction<ISignUpPayload>) {
    yield put(setIsAuthLoading(true));
    try {
        const authData = action.payload;
        const { data }: AxiosResponse<IBoard> = yield call(
            apiSagaRequest,
            'post',
            AUTH_API.SIGN_UP,
            authData
        );
        yield put(
            showNotification({
                message: NOTIFICATION_MESSAGES.SIGN_UP_SUCCESS,
                type: 'success',
            })
        );
    } catch (error) {
        console.log(error);
        // yield put(addBoardFailure(error));
    }
    yield put(setIsAuthLoading(false));
}

function* logInGenerator(action: PayloadAction<ILogInPayload>) {
    yield put(setIsAuthLoading(true));
    try {
        const authData = action.payload;
        const { data }: AxiosResponse<ILogInResponse> = yield call(
            apiSagaRequest,
            'post',
            AUTH_API.LOG_IN,
            authData,
            { withCredentials: true }
        );
        yield put(logInSuccess(data));
    } catch (error) {
        yield put(logInFailed());
        console.log(error);
    }
    yield put(setIsAuthLoading(false));
}

function* logInWithGoogleGenerator() {
    yield put(setIsAuthLoading(true));
    try {
        const { data }: AxiosResponse<ILogInResponse> = yield call(
            apiSagaRequest,
            'get',
            AUTH_API.LOGIN_GOOGLE,
            {},
            { withCredentials: true }
        );
        yield put(logInSuccess(data));
    } catch (error) {
        yield put(logInFailed());
        console.log(error);
    }
    yield put(setIsAuthLoading(false));
}

function* refreshTokenGenerator() {
    yield put(refreshTokenInit());
    try {
        const { data }: AxiosResponse<ILogInResponse> = yield call(
            apiSagaRequest,
            'put',
            AUTH_API.REFRESH_TOKEN,
            {},
            { withCredentials: true }
        );
        yield put(refreshTokenSuccess(data));
    } catch (error) {
        yield put(refreshTokenFailed());
        console.log(error);
    }
    yield put(setIsAuthLoading(false));
}

function* resetPasswordGenerator(action: PayloadAction<IResetPasswordPayload>) {
    yield put(setIsAuthLoading(true));
    try {
        const authData = action.payload;
        yield call(apiSagaRequest, 'post', AUTH_API.RESET_PASSWORD, authData);
        yield put(
            showNotification({
                type: 'success',
                message:
                    NOTIFICATION_MESSAGES.PASSWORD_RESET_EMAIL_LINK_SUCCESS,
            })
        );
    } catch (error) {
        // yield put(logInFailed());
        console.log(error);
    }
    yield put(setIsAuthLoading(false));
}

function* updatePasswordGenerator(
    action: PayloadAction<IUpdatePasswordPayload>
) {
    yield put(setIsAuthLoading(true));
    try {
        const authData = action.payload;
        yield call(apiSagaRequest, 'post', AUTH_API.UPDATE_PASSWORD, authData);
        yield put(
            showNotification({
                type: 'success',
                message: NOTIFICATION_MESSAGES.PASSWORD_RESET_SUCCESS,
            })
        );
    } catch (error) {
        console.log(error);
    }
    yield put(setIsAuthLoading(false));
}

function* logoutTokenGenerator() {
    try {
        yield call(
            apiSagaRequest,
            'post',
            AUTH_API.LOG_OUT,
            {},
            { withCredentials: true }
        );
        yield put(logoutSuccess());
    } catch (error) {
        console.log(error);
    }
}

export default function* watchAuth() {
    yield takeLatest(AUTH_SIGN_UP, signUpGenerator);
    yield takeLatest(AUTH_LOG_IN, logInGenerator);
    yield takeLatest(AUTH_GOOGLE_LOG_IN, logInWithGoogleGenerator);
    yield takeLatest(AUTH_REFRESH_TOKEN, refreshTokenGenerator);
    yield takeLatest(LOG_OUT, logoutTokenGenerator);
    yield takeLatest(AUTH_RESET_PASSWORD, resetPasswordGenerator);
    yield takeLatest(AUTH_UPDATE_PASSWORD, updatePasswordGenerator);
}
