export const URL_LOGIN = 'Identity/authenticate';
export interface LoginModel {
    succeeded: boolean;
    message: string;
    errors: string;
    data: {
        jwToken: string;
        expiration: string;
    }
}