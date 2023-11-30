import {
    ILogInAction,
    ILogInPayload,
    ILogInWithGoogleAction,
    ILogout,
    IRefreshTokenAction,
    IResetPasswordAction,
    IResetPasswordPayload,
    ISignUpAction,
    ISignUpPayload,
    IUpdatePasswordAction,
    IUpdatePasswordPayload,
} from 'src/types/auth';

export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_LOG_IN = 'AUTH_LOG_IN';
export const AUTH_GOOGLE_LOG_IN = 'AUTH_GOOGLE_LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN';
export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD';
export const AUTH_UPDATE_PASSWORD = 'AUTH_UPDATE_PASSWORD';

export const signUp = (data: ISignUpPayload): ISignUpAction => {
    return {
        type: AUTH_SIGN_UP,
        payload: data,
    };
};

export const logIn = (data: ILogInPayload): ILogInAction => {
    return {
        type: AUTH_LOG_IN,
        payload: data,
    };
};

export const signWithGoogle = (): ILogInWithGoogleAction => {
    return {
        type: AUTH_GOOGLE_LOG_IN,
    };
};

export const refreshToken = (): IRefreshTokenAction => {
    return {
        type: AUTH_REFRESH_TOKEN,
    };
};

export const resetPassword = (
    data: IResetPasswordPayload
): IResetPasswordAction => {
    return {
        type: AUTH_RESET_PASSWORD,
        payload: data,
    };
};

export const updatePassword = (
    data: IUpdatePasswordPayload
): IUpdatePasswordAction => {
    return {
        type: AUTH_UPDATE_PASSWORD,
        payload: data,
    };
};

export const logout = (): ILogout => {
    return {
        type: LOG_OUT,
    };
};
