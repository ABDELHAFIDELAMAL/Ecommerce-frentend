import { Routes } from '@angular/router';
import {Store} from '../components/store/store';
import {ProductList} from '../features/products/product-list/product-list';
import {About} from '../components/about/about';

export const routes: Routes = [
  { path: 'store', component: ProductList} ,
  { path: 'about' , component : About }
];
