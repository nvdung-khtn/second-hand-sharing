import { UserInfo } from './user.constant';

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
    userId: string;
    token: string;
    password: string;
    confirmPassword: string;
}

export class ConfirmEmailRequest {
    userId: string;
    code: string;
}
