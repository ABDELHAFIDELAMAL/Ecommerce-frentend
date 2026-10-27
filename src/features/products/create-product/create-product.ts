import {Component, inject, signal} from '@angular/core';
import {ProductService} from '../../../services/product-service/product-service';
import {Product} from '../../../entities/Product';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Category} from '../../../entities/Category';
import {CategoryService} from '../../../services/category-service/category-service';

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-create-product',
  styleUrl: './create-product.css',
  templateUrl: './create-product.html',
})

export class CreateProduct {
  private route = inject(Router);
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  categories = signal<Category[]>([]);

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
    category: new FormControl<number | null>(null, [
      Validators.required
    ]),
    active: new FormControl(true)
  });



  ngOnInit() {
    this.getAllCategories();
  }



  createProduct(product : Product){
    console.log("product sent to server : " , product);
    this.productService.createProduct(product).subscribe({
      next: (response) =>{
        alert(response.message);
      }, error: error => {
        console.log("Error when create product :" , error);
      }
    })
  }

  protected onSubmit() {
    console.log(this.productForm.value);
  }

  getAllCategories() : void{
    this.categoryService.getAllCategories().subscribe({
      next: (response) =>{
        this.categories.set(response.data);
        console.log(this.categories);
      },
      error: error => {
        console.log("Error when getAllCategories :" , error);
      }
    })
  }
}
