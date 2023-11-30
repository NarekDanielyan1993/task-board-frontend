/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INotificationState, NotificationTypes } from 'src/types';

const initialState: INotificationState = {
    message: '',
    type: 'success',
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<NotificationTypes>) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        hideNotification: (state) => {
            state.message = '';
            state.type = 'success';
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
