import {HttpClient, HttpParams} from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../entities/Image';
import { ApiResponse } from '../../response/ApiResponse';
import {environment} from '../../environment/environment';

@Service()
export class ImageService {
  private apiUrl = `${environment.apiUrl}/images`;
  private http = inject(HttpClient);


  getAllImages(): Observable<ApiResponse<(Image)[]>> {
    return this.http.get<ApiResponse<(Image)[]>>(this.apiUrl);
  }

  uploadImage(productId: number, file: File, altText: string): Observable<ApiResponse<Image>> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('altText', altText);

    const data = new FormData();
    data.append('file', file);

    return this.http.post<ApiResponse<Image>>(`${this.apiUrl}/upload`, data, { params });
  }
}
