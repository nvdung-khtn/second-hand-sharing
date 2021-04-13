import { environment } from "src/environments/environment"

const baseUrl = environment.apiUrl;
export const URL_LOGIN = `${baseUrl}/Identity/authenticate`;
export const URL_REGISTER = `${baseUrl}/Identity/register`;
export class LoginModel {
  email: string;
  password: string;
}

export class RegisterModel {
  email: string;
  password: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
}
