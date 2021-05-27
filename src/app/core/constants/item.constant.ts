import { Address } from './address.constant';

// Models
export class Item {
  id: number;
  itemName: string;
  receiveAddress: Address;
  postTime: Date; // Có thể phát sinh lỗi
  description: string;
  imageUrl: string[];
  donateAccountId: number;
  donateAccountName: string;
  userRequestId: number;
  status: ItemStatus;
}

export class CreateItemRequest {
  itemName: string;
  receiveAddress: Address;
  categoryId: number;
  description: string;
  imageNumber: number;
}

export class CreateItem {
  id: number;
  imageUploads: imageUpload[];
}

class imageUpload {
  imageName: string;
  presignUrl: string;
}

enum ItemStatus {
  NEW,
  PROCESSING,
  COMPLETED,
}
