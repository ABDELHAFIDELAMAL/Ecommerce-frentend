import {inject, Service} from '@angular/core';
import {environment} from '../environment/environment';
import {HttpClient} from '@angular/common/http';

@Service()
export class PromotionService {
  private apiUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

}
