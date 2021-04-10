import { environment } from "src/environments/environment"

const baseUrl = environment.apiUrl;
export const URL_LOGIN = `${baseUrl}/Identity/authenticate`;
export const URL_REGISTER = `${baseUrl}/Identity/register`;
// export interface LoginModel {
//     succeeded: boolean;
//     message: string;
//     errors: string;
//     data: {
//         jwToken: string;
//         expiration: string;
//     }
// }

export class LoginModel {
  email: string;
  password: string;
}

export class RegisterModel {
  userName: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dob: string;
  phoneNumber: string;
  address: string;
  email: string;
}
