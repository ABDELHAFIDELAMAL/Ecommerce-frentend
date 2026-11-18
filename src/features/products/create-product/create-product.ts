
import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product-service/product-service';
import { Product } from '../../../entities/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-create-product',
  styleUrl: './create-product.css',
  templateUrl: './create-product.html',
})
export class CreateProduct implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  productService = inject(ProductService);

  isEditMode = signal(false);
  productId = signal<number | null>(null);
  isSubmitting = signal(false);

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100)
    ]),
    price: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(1000000)
    ]),
    quantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ]),
    description: new FormControl('', [
      Validators.minLength(10),
      Validators.maxLength(500)
    ]),
    brand: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    category: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    active: new FormControl(true)
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode.set(true);
      this.productId.set(Number(id));
      this.loadProduct(Number(id));
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: response => {
        const product = response.data;

        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          description: product.description,
          brand: product.brand,
          category: product.category?.name ?? '',
          active: product.active
        });
      },
      error: error => {
        console.error('Error loading product:', error);
        alert(error.error?.message || 'Failed to load product');
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.getRawValue();

    const product = {
      name: formValue.name!,
      price: formValue.price!,
      quantity: formValue.quantity!,
      description: formValue.description,
      brand: formValue.brand,
      reviewsCount: 0,
      averageRating: 0,
      active: formValue.active!,
      category: {
        name: formValue.category!
      }
    } as unknown as Product;

    if (this.isEditMode()) {
      const id = this.productId();

      if (id !== null) {
        this.updateProduct(id, product);
      }
    } else {
      this.createProduct(product);
    }
  }

  createProduct(product: Product): void {
    this.isSubmitting.set(true);

    this.productService.createProduct(product).subscribe({
      next: response => {
        alert(response.message);
        this.productForm.reset({
          name: '',
          price: null,
          quantity: 0,
          description: '',
          brand: '',
          category: '',
          active: true
        });
        this.router.navigate(['/products']);
      },
      error: error => {
        console.error('Error creating product:', error);
        alert(error.error?.message || 'Failed to create product');
      },
      complete: () => this.isSubmitting.set(false)
    });
  }

  updateProduct(id: number, product: Product): void {
    this.isSubmitting.set(true);

    this.productService.updateProduct(id, product).subscribe({
      next: response => {
        alert(response.message);
        this.router.navigate(['/products']);
      },
      error: error => {
        console.error('Error updating product:', error);
        alert(error.error?.message || 'Failed to update product');
      },
      complete: () => this.isSubmitting.set(false)
    });
  }

  resetForm(): void {
    this.productForm.reset({
      name: '',
      price: null,
      quantity: 0,
      description: '',
      brand: '',
      category: '',
      active: true
    });
  }
}
