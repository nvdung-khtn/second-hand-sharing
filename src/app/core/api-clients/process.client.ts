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

    unsubscribeItem(requestId) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/cancel-receive`;
        return this.http.put(url, { requestId });
    }

    approveReceiver(requestId) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/accept`;
        return this.http.put(url, { requestId });
    }

    rejectReceiver(requestId) {
        const url = `${this.baseUrl}/ReceiveItem/${requestId}/cancel-receiver`;
        return this.http.put(url, { requestId });
    }
}
