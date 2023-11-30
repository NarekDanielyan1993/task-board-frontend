import { all, fork } from 'redux-saga/effects';
import watchAuth from './auth/saga';
import watchBoard from './board/saga';
import watchBoards from './boards/saga';

function* rootSaga() {
    yield all([fork(watchBoards), fork(watchBoard), fork(watchAuth)]);
}

export default rootSaga;
