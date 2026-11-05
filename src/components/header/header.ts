import {Component, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Category} from '../../entities/Category';
import {CategoryService} from '../../services/category-service/category-service';
import {ProductService} from '../../services/product-service/product-service';
import {CartService} from '../../services/cart-service/cart-service';

@Component({
  imports: [
    RouterLink
  ],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  categories= signal<Category[]>([]) ;
  categoryService = inject(CategoryService);
  cartService = inject(CartService);
  productService = inject(ProductService);
  isMenuOpen = false;

  ngOnInit() {
    this.getAllCategories();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }


  getAllCategories() : void {
    this.categoryService.getAllCategories().subscribe({
      next: response => {
        console.log(response);
        this.categories.set(response.data);
      },
      error: err => {
        console.log(err);
      }
    })
  }

}
