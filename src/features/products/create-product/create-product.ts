import {Component, inject} from '@angular/core';
import {ProductService} from '../../../services/product-service/product-service';
import {Product} from '../../../entities/Product';
import {Router} from '@angular/router';

@Component({
  imports: [],
  selector: 'app-create-product',
  styleUrl: './create-product.css',
  templateUrl: './create-product.html',
})
export class CreateProduct {
  private route = inject(Router);
  productService = inject(ProductService);


  createProduct(product : Product){
    console.log("product i sent to server : " , product);
    this.productService.createProduct(product).subscribe({
      next: (response) =>{
        alert(response.message);
      }, error: error => {
        console.log("Error when create product :" , error);
      }
    })
  }
}
