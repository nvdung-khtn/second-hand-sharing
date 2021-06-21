import { AddressIdModel } from './address.constant';
export class UserInfo {
    id: number;
    fullName: string;
    dob: Date | string;
    phoneNumber: string;
    avatarUrl: string | null;
    address: AddressIdModel;
    email: string;
}
