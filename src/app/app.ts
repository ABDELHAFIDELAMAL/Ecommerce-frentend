import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from '../components/header/header';
import {ProductList} from '../features/products/product-list/product-list';
import {ImageList} from '../features/images/image-list/image-list';
import {UploadImageForm} from '../features/images/upload-image-form/upload-image-form';
import {ProductDetails} from '../features/products/product-details/product-details';

@Component({
  imports: [RouterOutlet, Header, ProductList, ImageList, UploadImageForm, ProductDetails],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App{

}
