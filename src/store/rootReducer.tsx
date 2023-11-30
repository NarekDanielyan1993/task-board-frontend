import { combineReducers } from '@reduxjs/toolkit';
import { IAppState } from 'src/types';
import authReducer from './auth/reducer';
import boardReducer from './board/reducer';
import boardsReducer from './boards/reducer';
import notificationReducer from './notification/reducer';

const rootReducer = combineReducers<IAppState>({
    boardState: boardReducer,
    boardsState: boardsReducer,
    authState: authReducer,
    notificationState: notificationReducer,
});

export default rootReducer;
