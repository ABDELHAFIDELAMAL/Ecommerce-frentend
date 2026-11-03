import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ImageService} from '../../../services/image-service/image-service';
import {ProductService} from '../../../services/product-service/product-service';

@Component({
  imports: [],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private imageService = inject(ImageService);
  private productService = inject(ProductService);
  private route = inject(Router);


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

}
