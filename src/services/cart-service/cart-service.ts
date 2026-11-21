import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../entities/ApiResponse';
import {Cart} from '../../entities/Cart';

@Service()
export class CartService {
  private apiUrl = `${environment.apiUrl}/carts`;
  private http = inject(HttpClient);


  getAllCarts():Observable<ApiResponse<Cart[]>>{
    return this.http.get<ApiResponse<Cart[]>>(this.apiUrl);
  }

  getCartByUserById(id : number) : Observable<ApiResponse<Cart>>{
    return this.http.get<ApiResponse<Cart>>(`${this.apiUrl}/user/${id}`);
  }

  clearCart(cartId : number) : Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${cartId}/clear`);
  }

  getNumberOfCartItemsByCartId(cartId : number) : Observable<ApiResponse<number>>{
    return this.http.get<ApiResponse<number>>(`${this.apiUrl}/countItems/${cartId}`);
  }
}
