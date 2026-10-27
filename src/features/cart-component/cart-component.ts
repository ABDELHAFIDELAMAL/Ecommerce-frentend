import {Component, inject, signal} from '@angular/core';
import {CartService} from '../../services/cart-service/cart-service';
import {Router} from '@angular/router';
import {Cart} from '../../entities/Cart';

@Component({
  imports: [],
  selector: 'app-cart-component',
  styleUrl: './cart-component.css',
  templateUrl: './cart-component.html',
})
export class CartComponent {
  private cartService = inject(CartService);
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


}

