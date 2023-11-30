import { TypeOptions } from 'react-toastify';

export type NotificationMessageTypesUnion =
    | 'success'
    | 'error'
    | 'info'
    | 'warning';

export type NotificationTypes = {
    message: string;
    type: NotificationMessageTypesUnion;
};

export interface INotificationState {
    message: string;
    type: TypeOptions;
}
