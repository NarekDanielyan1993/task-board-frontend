import { IAppState } from 'src/types';

const authSelector = (state: IAppState) => state.authState;
export const refreshTokenSelector = (state: IAppState) =>
    state.authState.refreshToken;
export default authSelector;
