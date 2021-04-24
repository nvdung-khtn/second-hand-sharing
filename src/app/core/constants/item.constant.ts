import { environment } from "src/environments/environment";
import { Address } from "./address.constant";

const baseUrl = environment.apiUrl;
export const URL_GET_ITEMS = `${baseUrl}/Item`;

export class Item {
  id: number;
  itemName: string;
  receiveAddress: Address;
  postTime: Date;  // Có thể phát sinh lỗi
  description: string;
  imageUrl: string;
  donateAccountName: string;
}
