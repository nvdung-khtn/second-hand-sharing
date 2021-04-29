import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadImageService {
  constructor(private http: HttpClient) {}

  uploadSingleImage(url, image) {
    const headers = new HttpHeaders({ 
      'Content-Type': 'image/png',
      'Access-Control-Allow-Origin': '*'
    })

    return this.http.put(url, image,{headers});
  }
}
