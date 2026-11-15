import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApiResponse} from '../../response/ApiResponse';
import {Promotion} from '../../entities/Promotion';
import {environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/promotions`;

  createPromotion(promotion: Promotion): Observable<ApiResponse<Promotion>> {
    return this.http.post<ApiResponse<Promotion>>(`${this.apiUrl}/create`, promotion);
  }

  getAllPromotions(): Observable<ApiResponse<Promotion[]>> {
    return this.http.get<ApiResponse<Promotion[]>>(this.apiUrl);
  }

  getPromotionById(promotionId: number): Observable<ApiResponse<Promotion>> {
    return this.http.get<ApiResponse<Promotion>>(`${this.apiUrl}/${promotionId}`);
  }

  getActivePromotions(): Observable<ApiResponse<Promotion[]>> {
    return this.http.get<ApiResponse<Promotion[]>>(`${this.apiUrl}/active`);
  }

  updatePromotion(promotionId: number, promotion: Promotion): Observable<ApiResponse<Promotion>> {
    return this.http.put<ApiResponse<Promotion>>(
      `${this.apiUrl}/update/${promotionId}`,
      promotion
    );
  }

  deletePromotion(promotionId: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/delete/${promotionId}`);
  }

  getPromotionsByDiscountType(discountType: string): Observable<ApiResponse<Promotion[]>> {
    return this.http.get<ApiResponse<Promotion[]>>(`${this.apiUrl}/discountType`, {
      params: { discountType }
    });
  }
}
