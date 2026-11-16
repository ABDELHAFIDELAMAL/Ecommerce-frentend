import {inject, Service} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Review} from '../../entities/Review';
import {ApiResponse} from '../../response/ApiResponse';

@Service()
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/reviews`;
  private http = inject(HttpClient);

  getAllReviews(): Observable<ApiResponse<Review[]>> {
    return this.http.get<ApiResponse<Review[]>>(this.apiUrl);
  }
}
