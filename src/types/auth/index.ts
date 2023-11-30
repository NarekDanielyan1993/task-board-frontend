import {
    AUTH_GOOGLE_LOG_IN,
    AUTH_LOG_IN,
    AUTH_REFRESH_TOKEN,
    AUTH_RESET_PASSWORD,
    AUTH_SIGN_UP,
    AUTH_UPDATE_PASSWORD,
    LOG_OUT,
} from 'src/store/auth/action';

export type AUTH_SING_UP_TYPE = typeof AUTH_SIGN_UP;
export type AUTH_LOG_IN_TYPE = typeof AUTH_LOG_IN;
export type AUTH_GOOGLE_LOG_IN_TYPE = typeof AUTH_GOOGLE_LOG_IN;
export type LOG_OUT_TYPE = typeof LOG_OUT;
export type AUTH_REFRESH_TOKEN_TYPE = typeof AUTH_REFRESH_TOKEN;
export type AUTH_RESET_PASSWORD_TYPE = typeof AUTH_RESET_PASSWORD;
export type AUTH_UPDATE_PASSWORD_TYPE = typeof AUTH_UPDATE_PASSWORD;

export interface ISignUpPayload {
    name: string;
    email: string;
    password: string;
}

export interface ISignUpAction {
    type: AUTH_SING_UP_TYPE;
    payload: ISignUpPayload;
}

export interface ILogInPayload {
    email: string;
    password: string;
}

export interface ILogInResponse {
    accessToken: string;
}

export interface ILogInAction {
    type: AUTH_LOG_IN_TYPE;
    payload: ILogInPayload;
}

export interface ILogInWithGoogleAction {
    type: AUTH_GOOGLE_LOG_IN_TYPE;
}

export interface IResetPasswordPayload {
    email: string;
}

export interface IResetPasswordAction {
    type: AUTH_RESET_PASSWORD_TYPE;
    payload: IResetPasswordPayload;
}

export interface IUpdatePasswordPayload {
    password: string;
    token: string;
}

export interface IUpdatePasswordAction {
    type: AUTH_UPDATE_PASSWORD_TYPE;
    payload: IUpdatePasswordPayload;
}

export interface IRefreshTokenAction {
    type: AUTH_REFRESH_TOKEN_TYPE;
}

export interface ILogout {
    type: LOG_OUT_TYPE;
}

export interface IAuthState {
    isLoading: boolean;
    accessToken: string | null;
    // isLoggedIn: boolean;
    refreshToken: {
        isLoading: boolean;
        isFetched: boolean;
    };
}
