import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProcessClient {
    constructor(private http: HttpClient) {}
    private baseUrl = environment.apiUrl;

    subscribeItem(formData) {
        const url = `${this.baseUrl}/ReceiveItem`;
        return this.http.post(url, formData);
    }

    unsubscribeItem(requestId: number) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/cancel-receive`;
        return this.http.put(url, { requestId });
    }

    approveReceiver(requestId: number) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/accept`;
        return this.http.put(url, { requestId });
    }

    rejectReceiver(requestId: number) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/cancel-receiver`;
        return this.http.put(url, { requestId });
    }

    sendThanksMessage(requestId: number, thanksMsg: string) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/send-thanks`;
        return this.http.put(url, { thanks: thanksMsg });
    }
}
