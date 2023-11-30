/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthState, ILogInResponse } from 'src/types/auth';

const initialState: IAuthState = {
    isLoading: false,
    accessToken: null,
    refreshToken: {
        isLoading: false,
        isFetched: false,
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthLoading: (
            state: IAuthState,
            action: PayloadAction<boolean>
        ) => {
            state.isLoading = action.payload;
        },
        logInSuccess: (
            state: IAuthState,
            action: PayloadAction<ILogInResponse>
        ) => {
            state.accessToken = action.payload.accessToken;
        },
        logInFailed: (state: IAuthState) => {
            state.accessToken = null;
        },
        refreshTokenInit: (state: IAuthState) => {
            state.refreshToken.isLoading = true;
        },
        refreshTokenSuccess: (
            state: IAuthState,
            action: PayloadAction<ILogInResponse>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken.isLoading = false;
        },
        refreshTokenFailed: (state: IAuthState) => {
            state.refreshToken.isLoading = false;
            state.accessToken = null;
        },
        logoutSuccess: (state: IAuthState) => {
            state.accessToken = null;
        },
    },
});

export const {
    setIsAuthLoading,
    logInSuccess,
    logInFailed,
    refreshTokenFailed,
    refreshTokenInit,
    refreshTokenSuccess,
    logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
