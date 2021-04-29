import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient) {}

  uploadSingleImage(url, image) {
    const headers = {
      contentTypeHeader: 'image/png',
    };

    return this.http.put(url, image, {headers});
  }
}
