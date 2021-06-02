export enum ModalType {
    REGISTER,
    THANKS,
}

export enum ModalStatus {
    OPEN,
    CLOSE,
}

export class Modal {
    type: ModalType;
    message: string;
    status: ModalStatus;

    constructor(type: ModalType, message: string, status: ModalStatus) {
        this.type = type;
        this.message = message;
        this.status = status;
    }
}
