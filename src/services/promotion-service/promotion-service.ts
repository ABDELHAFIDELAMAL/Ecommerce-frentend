import {inject, Service} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../response/ApiResponse';
import {Promotion} from '../../entities/Promotion';
import {DiscountType} from '../../enums/DiscountType.enum';

@Service()
export class PromotionService {
  private apiUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getAllPromotions() : Observable<ApiResponse<Promotion[]>>{
    return this.http.get<ApiResponse<Promotion[]>>(this.apiUrl);
  }

  createPromotion(promotion : Promotion) : Observable<ApiResponse<Promotion>>{
    return this.http.post<ApiResponse<Promotion>>(`${this.apiUrl}/create`, promotion);
  }

  getActivePromotions(): Observable<ApiResponse<Promotion[]>>{
    return this.http.get<ApiResponse<Promotion[]>>(`${this.apiUrl}/active`);
  }

  getPromotionById(id : number ) : Observable<ApiResponse<Promotion>>{
    return this.http.get<ApiResponse<Promotion>>(`${this.apiUrl}/${id}`);
  }

  updatePromotion(promotionId : number , promotion : Promotion): Observable<ApiResponse<Promotion>>{
    return this.http.put<ApiResponse<Promotion>>(`${this.apiUrl}/${promotionId}`, promotion);
  }

  deletePromotion(promotionId : number) : Observable<ApiResponse<void>>{
    return this.http.get<ApiResponse<void>>(`${this.apiUrl}/delete/${promotionId}`);
  }

  getPromotionsByDiscountType(discountType : DiscountType) : Observable<ApiResponse<Promotion[]>>{
    const params = new HttpParams();
    params.append('discountType', discountType);
    return this.http.get<ApiResponse<Promotion[]>>(`${this.apiUrl}/discountType` , { params});
  }
}
