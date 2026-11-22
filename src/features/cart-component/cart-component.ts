import {Component, inject, signal} from '@angular/core';
import {CartService} from '../../services/cart-service/cart-service';
import {Router, RouterLink} from '@angular/router';
import {Cart} from '../../entities/Cart';
import {DecimalPipe} from '@angular/common';
import {CartItemService} from '../../services/cartItem-service/cart-item-service';

@Component({
  imports: [
    DecimalPipe,
    RouterLink
  ],
  selector: 'app-cart-component',
  styleUrl: './cart-component.css',
  templateUrl: './cart-component.html',
})
export class CartComponent {
  private cartService = inject(CartService);
  private cartItemService = inject(CartItemService);
  private route = inject(Router);
  cart = signal<Cart | null>(null);
  carts = signal<Cart[]>([]);

  ngOnInit() {
    this.getCartByUserById(1);
  }

  getAllCarts() : void {
    this.cartService.getAllCarts().subscribe({
      next: (response) => {
        console.log(response);
        this.carts.set(response.data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getCartByUserById(id : number) : void {
    this.cartService.getCartByUserById(id).subscribe({
      next: (response) => {
        console.log(response);
        this.cart.set(response.data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteItemFromCart(id : number) : void {
    if(confirm("Are you sure you want to delete this item?")){
      this.cartItemService.deleteCartItem(id).subscribe({
        next: (response) => {
          alert(response.message);
        },
        error: (error) => {
          console.error(error);
        }
      })
    }
  }

  clearCart() : void {
    if(confirm("Are you sure you want to clear your cart ?")){
      this.cartService.clearCart(1).subscribe({
        next: (response) => {
          alert(response.message);
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }


}

