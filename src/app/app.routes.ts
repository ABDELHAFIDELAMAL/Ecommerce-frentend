import { Routes } from '@angular/router';
import {Store} from '../components/store/store';
import {About} from '../components/about/about';
import {CreateProduct} from '../features/products/create-product/create-product';
import {CartComponent} from '../features/cart-component/cart-component';
import {UploadImageForm} from '../features/images/upload-image-form/upload-image-form';
import {CreatePromotion} from '../features/promotion/create-promotion/create-promotion';
import {ReviewList} from '../features/review/review-list/review-list';
import {ProductDetails} from '../features/products/product-details/product-details';
import {Home} from '../components/home/home';

export const routes: Routes = [
  { path : '' , component : Store },
  { path : 'home' , component : Home },
  { path: 'store', component: Store} ,
  { path: 'about' , component : About },

  { path: 'create/product' , component : CreateProduct},

  { path: 'my/cart' , component : CartComponent},
  { path: 'upload/image/:id' , component : UploadImageForm} ,
  { path: 'create/promotion' , component : CreatePromotion} ,
  { path: 'reviews' , component : ReviewList} ,

  { path: 'products/update/:id', component: CreateProduct },
  { path: 'products/details/:id', component: ProductDetails },
];
