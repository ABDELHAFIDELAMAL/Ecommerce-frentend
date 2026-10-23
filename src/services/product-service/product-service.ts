import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Product } from '../../entities/Product';
import { ApiResponse } from '../../response/ApiResponse';
import { Review } from '../../entities/Review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  getAllProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(this.apiUrl);
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.apiUrl}/create`, product);
  }

  updateProduct(id: number, product: Product): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/update/${id}`, product);
  }

  searchProduct(text: string): Observable<ApiResponse<Product[]>> {
    const params = new HttpParams().set('text', text);
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/search`, { params });
  }

  deleteProduct(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/by/category/${categoryId}`);
  }

  getAvailableProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/available`);
  }

  getTopRatedProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/top/rating`);
  }

  updateProductQuantity(productId: number, quantity: number): Observable<ApiResponse<void>> {
    const params = new HttpParams().set('quantity', quantity);
    return this.http.put<ApiResponse<void>>(
      `${this.apiUrl}/update/quantity/${productId}`,
      null,
      { params }
    );
  }

  getProductReviews(productId: number): Observable<ApiResponse<Review[]>> {
    return this.http.get<ApiResponse<Review[]>>(`${this.apiUrl}/reviews/${productId}`);
  }

}
