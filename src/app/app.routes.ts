import { Routes } from '@angular/router';
import {Store} from '../components/store/store';
import {ProductList} from '../features/products/product-list/product-list';
import {About} from '../components/about/about';
import {CreateProduct} from '../features/products/create-product/create-product';
import {CartComponent} from '../features/cart-component/cart-component';
import {UploadImageForm} from '../features/images/upload-image-form/upload-image-form';

export const routes: Routes = [
  { path: 'store', component: ProductList} ,
  { path: 'about' , component : About },
  { path: 'create/product' , component : CreateProduct},
  { path: 'my/cart' , component : CartComponent},
  { path: 'upload/image' , component : UploadImageForm}
];
