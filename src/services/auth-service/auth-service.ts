import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {ApiResponse} from '../../entities/ApiResponse';
import {Observable, tap} from 'rxjs';

@Service()
export class AuthService {
  private apiUrl: string = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  login(data: { email: string; password: string }): Observable<ApiResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          localStorage.setItem('token', response.data.token);
        }
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
