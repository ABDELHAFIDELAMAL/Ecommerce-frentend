import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Order } from '../../entities/Order';
import { ApiResponse } from '../../response/ApiResponse';
import {OrderStatus} from '../../enums/OrderStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;
  private http = inject(HttpClient);

  createOrder(userId: number): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(
      `${this.apiUrl}/create/${userId}`,
      null
    );
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(
      `${this.apiUrl}/${id}`
    );
  }

  getAllOrders(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(
      this.apiUrl
    );
  }

  getOrdersByUserId(userId: number): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(
      `${this.apiUrl}/user/${userId}`
    );
  }

  getOrdersByStatus(status: OrderStatus): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(
      `${this.apiUrl}/status/${status}`
    );
  }

  updateOrderStatus(
    id: number,
    status: OrderStatus
  ): Observable<ApiResponse<Order>> {
    const params = new HttpParams().set('status', status);

    return this.http.put<ApiResponse<Order>>(
      `${this.apiUrl}/${id}/status`,
      null,
      { params }
    );
  }

  cancelOrder(id: number): Observable<ApiResponse<Order>> {
    return this.http.put<ApiResponse<Order>>(
      `${this.apiUrl}/${id}/cancel`,
      null
    );
  }

  getOrderTotal(id: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(
      `${this.apiUrl}/${id}/total`
    );
  }

  deleteOrder(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/${id}`
    );
  }
}
