import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../entities/Product';
import { ProductService } from '../../../services/product-service/product-service';
import { ImageService } from '../../../services/image-service/image-service';
import {Image} from '../../../entities/Image';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  productService = inject(ProductService);
  imageService = inject(ImageService);
  products = signal<Product[]>([]);

  selectedImages = signal<{ [productId: number]: string }>({});


  loading = signal(true);
  skeletons = Array.from({ length: 8 });

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }


  selectImage(productId: number, imageUrl: string): void {
    this.selectedImages.update(images => ({
      ...images,
      [productId]: imageUrl
    }));
  }
}
