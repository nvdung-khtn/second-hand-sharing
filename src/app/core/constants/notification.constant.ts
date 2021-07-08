export enum NotifyType {
    NONE,
    MESSAGE,
    RECEIVE_REQUEST,
    CANCEL_RECEIVE_REQUEST,
    REQUEST_STATUS,
    SEND_THANKS,
    CONFIRM_SENT,
    INVITE_MEMBER,
    ACCEPT_INVITATION,
    JOIN_REQUEST
}

export class Notification {
    id: number;
    type: number;
    data: string;
    userId: number;
    createTime: string;
}
