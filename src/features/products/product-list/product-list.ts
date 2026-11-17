import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../entities/Product';
import { ProductService } from '../../../services/product-service/product-service';
import { ImageService } from '../../../services/image-service/image-service';
import {Image} from '../../../entities/Image';
import {Category} from '../../../entities/Category';
import {CategoryService} from '../../../services/category-service/category-service';

@Component({
  imports: [],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
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
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
      },
      error: (response) => console.log(response)
    })
  }


  selectImage(productId: number, imageUrl: string): void {
    this.selectedImages.update(images => ({
      ...images,
      [productId]: imageUrl
    }));
  }

  deleteProductById(id: number): void {
    if(confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (response) => {
          alert(response.message);
        }
      })
    }
  }

  getProductsByCategory(categoryId : number){
    this.productService.getProductsByCategory(categoryId).subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (response) => console.log(response)
    })
  }

  searchProducts(text : string) {
    this.productService.searchProducts(text).subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (response) => {
        console.log(response.message);
      }
    })
  }

  getAvailableProducts(){
    this.productService.getAvailableProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (response) => {
        alert(response.message);
      }
    })
  }

  getTopRatedProducts(){
    this.productService.getTopRatedProducts().subscribe({
      next: (response) => {
        this.products.set(response.data);
      },
      error: (response) => {
        alert(response.message);
      }
    })
  }

  applyPromotionToProduct(productId: number, promotionId: number){
    this.productService.applyPromotionToProduct(productId, promotionId).subscribe({
      next: (response) => {},
      error: (response) => {
        alert(response.message);
      },
    })
  }

  calculateDiscountedPrice(productId: number, promotionId: number){
    this.productService.calculateDiscountedPrice(productId, promotionId).subscribe({
      next: (response) => {},
      error: (response) => {},
    })
  }
}
