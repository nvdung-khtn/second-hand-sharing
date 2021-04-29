import { environment } from "src/environments/environment";


const baseUrl = environment.apiUrl;

export class UserInfo {
  id: number;
  fullname: string;
  dob: Date;
  phoneNumber: string;
  avatar: string | null;
  address: string;
}
