import { AddressIdModel } from './address.constant';

// Models
export class Item {
    id: number;
    itemName: string;
    receiveAddress?: AddressIdModel;
    address?: AddressIdModel;
    postTime: string;
    description: string;
    imageUrl: string[];
    donateAccountId: number;
    donateAccountName: string;
    userRequestId: number;
    status: ItemStatus;
    avatarUrl?: string | null;
}
export class CreateItemRequest {
    itemName: string;
    receiveAddress: AddressIdModel;
    categoryId: number;
    description: string;
    imageNumber: number;
}

export class CreateItem {
    id: number;
    imageUploads: imageUpload[];
}

export class imageUpload {
    imageName: string;
    presignUrl: string;
}

export enum ItemStatus {
    NEW,
    PROCESSING,
    COMPLETED,
}
