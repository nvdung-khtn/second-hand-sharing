// Models
export class ReceiveRequest {
    // Important!!! match model vs BE
    id: number;
    receiveReason: string;
    receiverId: number;
    receiverName: string;
    receiveStatus: ReceiveStatus;
}

export enum ReceiveStatus {
    PENDING,
    APPROVED,
}
