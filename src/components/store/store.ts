import { Component } from '@angular/core';
import {ProductList} from '../../features/products/product-list/product-list';

@Component({
  imports: [
    ProductList
  ],
  selector: 'app-store',
  styleUrl: './store.css',
  templateUrl: './store.html',
})
export class Store {}
