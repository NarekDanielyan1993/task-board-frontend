import authReducer from 'src/store/auth/reducer';
import boardReducer from 'src/store/board/reducer';
import boardsReducer from 'src/store/boards/reducer';
import notificationReducer from 'src/store/notification/reducer';

export interface IAppState {
    boardState: ReturnType<typeof boardReducer>;
    boardsState: ReturnType<typeof boardsReducer>;
    authState: ReturnType<typeof authReducer>;
    notificationState: ReturnType<typeof notificationReducer>;
}
