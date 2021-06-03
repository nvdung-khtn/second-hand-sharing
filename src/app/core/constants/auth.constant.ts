import { environment } from 'src/environments/environment';
import { UserInfo } from './user.constant';

const baseUrl = environment.apiUrl;
export const URL_LOGIN = `${baseUrl}/Identity/authenticate`;
export const URL_REGISTER = `${baseUrl}/Identity/register`;
export const URL_FORGOT_PW = `${baseUrl}/Identity/forgot-password`;
export const URL_CONFIRM_EMAIL = `${baseUrl}/Identity/confirm-email`;
export const URL_RESET_PW = `${baseUrl}/Identity/reset-password`;

export class LoginRequest {
    email: string;
    password: string;
}

export class Login {
    jwToken: string;
    expiration: Date;
    roles: string;
    isVerified: boolean;
    userInfo: UserInfo;
}

export class RegisterRequest {
    email: string;
    password: string;
    fullName: string;
    dob: string;
    phoneNumber: string;
}

export class ResetPwRequest {
    email: string;
    token: string;
    password: string;
    confirmPassword: string;
}

export class ConfirmEmailRequest {
    userId: string;
    code: string;
}