import { AddressIdModel } from './address.constant';
export class UserInfo {
    id: number;
    fullName: string;
    dob: Date;
    phoneNumber: string;
    avatar: string | null;
    address: AddressIdModel;
    email: string;
}
