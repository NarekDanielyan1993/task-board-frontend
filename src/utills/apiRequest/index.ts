/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import axios, { type AxiosRequestConfig } from 'axios';
import { CANCEL } from 'redux-saga';
import refresh from 'src/store/api/auth';
import { logout } from 'src/store/auth/action';
import { logInSuccess } from 'src/store/auth/reducer';
import { store } from 'src/store/createStore';

export const axiosInstance = axios.create({
    baseURL: process.env.SERVER_BASE_URL as string,
    timeout: 30000,
});

console.log(process.env.SERVER_BASE_URL);

axiosInstance.interceptors.request.use(
    (config) => {
        if (!config.headers.Authorization) {
            const state = store.getState();
            config.headers.Authorization = `Bearer ${state.authState.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error.config;
        if (
            [403, 401].includes(error?.response?.status) &&
            !prevRequest._retry
        ) {
            prevRequest._retry = true;
            const data = await refresh();
            prevRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            store.dispatch(logInSuccess(data));
            return axiosInstance(prevRequest);
        }
        if (prevRequest._retry && [403, 401].includes(error?.response.status)) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

type UrlMethodTypes = 'get' | 'post' | 'delete' | 'put' | 'patch';

export const apiSagaRequest = (
    method: UrlMethodTypes,
    url: string,
    data: object = {},
    options: AxiosRequestConfig = {}
) => {
    const abortController = new AbortController();
    const hasData = method === 'get';
    const settings: AxiosRequestConfig = hasData ? data : options;
    settings.signal = abortController.signal;
    const request = hasData
        ? (axiosInstance as any)[method](url, settings)
        : (axiosInstance as any)[method](url, data, settings);
    request[CANCEL] = () => abortController.abort();
    return request;
};

// export const apiRequest = async <T>(
//     method: UrlMethodTypes,
//     url: string,
//     data: T,
//     options?: AxiosRequestConfig
// ): Promise<T> => {
//     const abortController = new AbortController();
//     let bodyData = data;
//     if (method === 'get') {
//         bodyData = { params: data };
//     }
//     const requestOptions: AxiosRequestConfig = {
//         ...bodyData,
//         signal: abortController.signal,
//         cancelToken: abortController.abort,
//     };

//     return (axiosInstance as any)[method](url, data, requestOptions);
// };
