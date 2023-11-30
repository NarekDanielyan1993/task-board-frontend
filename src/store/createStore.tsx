import { configureStore, type Store } from '@reduxjs/toolkit';
import { promiseMiddleware } from '@teroneko/redux-saga-promise';
import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook,
} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import config from 'src/utills/config';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store: Store = configureStore({
    reducer: rootReducer,
    devTools: config.isDev,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false,
            serializableCheck: false,
        }).concat(promiseMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
