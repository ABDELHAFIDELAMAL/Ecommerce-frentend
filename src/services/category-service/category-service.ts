import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Category } from '../../entities/Category';
import { ApiResponse } from '../../response/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `${environment.apiUrl}/categories`;
  private http = inject(HttpClient);

  getAllCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(this.apiUrl);
  }

  getCategoryById(id: number): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(
      `${this.apiUrl}/${id}`
    );
  }

  createCategory(category: Category): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(
      `${this.apiUrl}/create`,
      category
    );
  }

  updateCategory(id: number, category: Category): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(
      `${this.apiUrl}/update/${id}`,
      category
    );
  }

  deleteCategory(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/delete/${id}`
    );
  }

  searchCategories(text: string): Observable<ApiResponse<Category[]>> {
    const params = new HttpParams().set('text', text);

    return this.http.get<ApiResponse<Category[]>>(
      `${this.apiUrl}/search`,
      {params}
    );
  }
}
