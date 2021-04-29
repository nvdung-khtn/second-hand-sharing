import { environment } from 'src/environments/environment';
import { Address } from './address.constant';

// URLs
const baseUrl = environment.apiUrl;
export const URL_GET_ITEMS = `${baseUrl}/Item?PageNumber=1&PageSize=100`;
export const URL_POST_ITEM = `${baseUrl}/Item`;

// Models
export class Item {
  id: number;
  itemName: string;
  receiveAddress: Address;
  postTime: Date; // Có thể phát sinh lỗi
  description: string;
  imageUrl: string;
  donateAccountName: string;
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
