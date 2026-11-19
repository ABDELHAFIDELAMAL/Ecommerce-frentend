import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../entities/Product';
import { ProductService } from '../../../services/product-service/product-service';
import { ImageService } from '../../../services/image-service/image-service';
import {Image} from '../../../entities/Image';
import {Category} from '../../../entities/Category';
import {CategoryService} from '../../../services/category-service/category-service';
import {RouterLink} from '@angular/router';
import {Observable} from 'rxjs';
import {CartItemService} from '../../../services/cartItem-service/cart-item-service';
import {CartService} from '../../../services/cart-service/cart-service';

@Component({
  imports: [
    RouterLink
  ],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  imageService = inject(ImageService);
  cartItemService = inject(CartItemService);
  cartService = inject(CartService);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedImages = signal<{ [productId: number]: string }>({});
  loading = signal(true);
  skeletons = Array.from({ length: 8 });

  ngOnInit() {
    this.getAllProducts();
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories.set(response.data);
      },
      error: (response) => console.log(response)
    })
  }

  protected getAllProducts() {
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


  deleteImageById(id: number){
    if(confirm('Are you sure you want to delete this image?')){
      this.imageService.deleteImage(id).subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (response) => {
          console.log(response.message);
        },
      })
    }
  }

  deleteAllProducts() : void {
    if(confirm('Are you sure you want to delete All products?')){
      this.productService.deleteAllProducts().subscribe({
        next: (response) => {
          alert(response.message);
          this.getAllProducts();
        },
        error: (response) => {
          console.log(response.message);
        }
      })
    }
  }

  getSelectedImage(product: Product) {
    const selectedUrl = this.selectedImages()[product.id];
    return product.images.find(
      image => image.imageUrl === selectedUrl
    ) ?? product.images[0];
  }

  cartId: number | null = 1;

  getCartByUserId(userId: number) {
    this.cartService.getCartByUserById(userId).subscribe({
      next: (response) => {
        this.cartId = response.data.id;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addProductToCart(productId: number, quantity: number) {
    if (this.cartId === null) {
      console.error('Cart not found');
      return;
    }
    this.cartItemService.addProductToCart(this.cartId, productId, quantity).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
