import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageService} from '../../../services/image-service/image-service';
import {ProductService} from '../../../services/product-service/product-service';
import {Product} from '../../../entities/Product';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {CartItemService} from '../../../services/cartItem-service/cart-item-service';

@Component({
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private imageService = inject(ImageService);
  private productService = inject(ProductService);
  private cartItemService = inject(CartItemService);
  product = signal<Product | null >(null);
  private route = inject(ActivatedRoute)
  selectedImage = signal<string | null>(null);
  quantity = signal<number>(1);

  selectImage(imageUrl: string) {
    this.selectedImage.set(imageUrl);
  }

  increaseQuantity() {
    this.quantity.update(value => value + 1);
  }

  decreaseQuantity() {
    this.quantity.update(value => Math.max(1, value - 1));
  }



  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById(id);
  }


  getProductById(id: number) {
    this.productService.getProductById(id).subscribe({
      next: response => {
        this.product.set(response.data);
        this.selectedImage.set(response.data.images?.[0]?.imageUrl ?? null);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  deleteImage(imageId: number){
    if(confirm("Are you sure you want to delete this image?")){
      this.imageService.deleteImage(imageId).subscribe({
        next: (response)=> {
          alert(response.message);
        },
        error: (response)=> {
          alert(response.message);
        }
      })
    }
  }


  addProductToCart(cartId: number, productId: number, quantity: number) {
    this.cartItemService.addProductToCart(cartId, productId, quantity).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (error) => {
        console.error(error);
        alert(error.error?.message || 'Failed to add product to cart');
      }
    });
  }

}
