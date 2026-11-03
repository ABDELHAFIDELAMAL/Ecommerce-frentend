import {inject, Service} from '@angular/core';
import {environment} from '../../environment/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../response/ApiResponse';
import {Cart} from '../../entities/Cart';
import {CartItem} from '../../entities/CartItem';

@Service()
export class CartItemService {
  private apiUrl : string = `${environment.apiUrl}/cartItems` ;
  private http = inject(HttpClient);

  getAllCartItems():Observable<ApiResponse<CartItem[]>>{
    return this.http.get<ApiResponse<CartItem[]>>(this.apiUrl);
  }

  addProductToCart(cartId : number , productId : number , quantity : number ) : Observable<ApiResponse<Cart>>{
    const params = new HttpParams()
      .set('cartId' , cartId)
      .set('productId' , productId)
      .set('quantity' , quantity);
    return this.http.post<ApiResponse<Cart>>(`${this.apiUrl}/addToCart` , { params });
  }

  getCartItemById(id : number) : Observable<ApiResponse<CartItem>>{
    return this.http.get<ApiResponse<CartItem>>(`${this.apiUrl}/${id}`);
  }

  updateCartItem(id : number , cartItem : CartItem) : Observable<ApiResponse<CartItem>>{
    return this.http.put<ApiResponse<CartItem>>(`${this.apiUrl}/update/${id}`, cartItem);
  }

  clearCartItems(id : number):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/clear/${id}`);
  }

  deleteCartItem(id : number):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }

  getCartItemByCartAndProduct(cartId : number , productId : number) : Observable<ApiResponse<Cart>>{
    return this.http.get<ApiResponse<Cart>>(`${this.apiUrl}/cart/${cartId}/product/${productId}`);
  }


}
