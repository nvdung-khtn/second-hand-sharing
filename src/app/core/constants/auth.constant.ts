import { environment } from "src/environments/environment"
import { UserInfo } from "./user.constant";

const baseUrl = environment.apiUrl;
export const URL_LOGIN = `${baseUrl}/Identity/authenticate`;
export const URL_REGISTER = `${baseUrl}/Identity/register`;

export class LoginRequest {
  email: string;
  password: string;
}

export class Login {
  jwToken: string;
  expiration: Date;
  roles: string;
  isVerified: boolean;
  userInfo: UserInfo
}

export class RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
}
