import { environment } from 'src/environments/environment';
import { Address } from './address.constant';

const baseUrl = environment.apiUrl;

export class UserInfo {
  id: number;
  fullname: string;
  dob: Date;
  phoneNumber: string;
  avatar: string | null;
  address: Address;
}
