import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    LoginRequest,
    Login,
    RegisterRequest,
    ResetPwRequest,
    ConfirmEmailRequest,
} from '../constants/auth.constant';
import { Observable } from 'rxjs';
import { ResponseModel } from '../constants/common.constant';
import { UserAward, UserInfo } from '../constants/user.constant';

@Injectable({
    providedIn: 'root',
})
export class AuthClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    login(loginForm: LoginRequest): Observable<ResponseModel<Login>> {
        const url = `${this.baseUrl}/Identity/authenticate`;
        return this.http.post<ResponseModel<Login>>(url, loginForm);
    }

    register(registerForm: RegisterRequest): Observable<ResponseModel<string>> {
        const url = `${this.baseUrl}/Identity/register`;
        return this.http.post<ResponseModel<string>>(url, registerForm);
    }

    sendEmail(email) {
        const url = `${this.baseUrl}/Identity/forgot-password`;
        return this.http.post(url, email);
    }

    resetPassword(resetForm: ResetPwRequest): Observable<ResponseModel<string>> {
        const url = `${this.baseUrl}/Identity/reset-password`;
        return this.http.post<ResponseModel<string>>(url, resetForm);
    }

    confirmEmail(form: ConfirmEmailRequest) {
        const url = `${this.baseUrl}/Identity/confirm-email`;
        return this.http.post<ResponseModel<string>>(url, form);
    }

    patchUserProfile(formData: UserInfo): Observable<ResponseModel<UserInfo>> {
        const url = `${this.baseUrl}/User`;

        return this.http.put<ResponseModel<UserInfo>>(url, { ...formData });
    }

    getUserProfile(): Observable<ResponseModel<UserInfo>> {
        const url = `${this.baseUrl}/User`;
        return this.http.get<ResponseModel<UserInfo>>(url);
    }

    getUserById(userId: number): Observable<ResponseModel<UserInfo>> {
        const url = `${this.baseUrl}/User/${userId}`;
        return this.http.get<ResponseModel<UserInfo>>(url);
    }

    updateAvatar(): Observable<ResponseModel<any>> {
        const url = `${this.baseUrl}/User/update-avatar`;
        return this.http.put<ResponseModel<any>>(url, null);
    }

    getTopAward(): Observable<ResponseModel<UserAward[]>> {
        const url = `${this.baseUrl}/User/Award`;
        return this.http.get<ResponseModel<UserAward[]>>(url);
    }
}
