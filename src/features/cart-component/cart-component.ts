import { Component, inject, signal, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service/cart-service';
import { Router, RouterLink } from '@angular/router';
import { Cart } from '../../entities/Cart';
import { DecimalPipe } from '@angular/common';
import { CartItemService } from '../../services/cartItem-service/cart-item-service';

@Component({
  imports: [DecimalPipe, RouterLink],
  selector: 'app-cart-component',
  styleUrl: './cart-component.css',
  templateUrl: './cart-component.html',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);
  private cartItemService = inject(CartItemService);
  private route = inject(Router);

  cart = signal<Cart | null>(null);
  carts = signal<Cart[]>([]);

  ngOnInit(): void {
    this.getCartByUserById(1);
  }

  getCartByUserById(id: number): void {
    this.cartService.getCartByUserById(id).subscribe({
      next: (response) => {
        this.cart.set(response.data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private updateCartLocally(cartItems: Cart['cartItems']): void {
    this.cart.update(cart => {
      if (!cart) return cart;

      const totalPrice = cartItems.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0
      );

      return {
        ...cart,
        cartItems,
        totalPrice
      };
    });
  }

  deleteItemFromCart(id: number): void {
    if (!confirm('Are you sure you want to delete this item?')) return;
    this.cartItemService.deleteCartItem(id).subscribe({
      next: (response) => {
        if (response.success) {
          const currentCart = this.cart();
          if (!currentCart) return;
          const updatedItems = currentCart.cartItems.filter(
            item => item.id !== id
          );
          this.updateCartLocally(updatedItems);
        }
      },
      error: (error) => {
        console.error('Error deleting cart item:', error);
      }
    });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity < 1) return;
    this.cartItemService.updateQuantity(cartItemId, quantity).subscribe({
      next: (response) => {
        if (response.success) {
          const currentCart = this.cart();
          if (!currentCart) return;
          const updatedItems = currentCart.cartItems.map(item =>
            item.id === cartItemId
              ? { ...item, quantity }
              : item
          );
          this.updateCartLocally(updatedItems);
        }
      },
      error: (error) => {
        console.error('Error updating quantity:', error);
      }
    });
  }

  clearCart(): void {
    if (!confirm('Are you sure you want to clear your cart?')) return;
    this.cartService.clearCart(1).subscribe({
      next: (response) => {
        if (response.success) {
          this.cart.update(cart => {
            if (!cart) return cart;
            return {
              ...cart,
              cartItems: [],
              totalPrice: 0
            };
          });
        }
      },
      error: (error) => {
        console.error('Error clearing cart:', error);
      }
    });
  }
}
