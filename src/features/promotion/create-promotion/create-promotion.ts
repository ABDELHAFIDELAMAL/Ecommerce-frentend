import {Component, inject} from '@angular/core';
import {Promotion} from '../../../entities/Promotion';
import {PromotionService} from '../../../services/promotion-service/promotion-service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-create-promotion',
  styleUrl: './create-promotion.css',
  templateUrl: './create-promotion.html',
})
export class CreatePromotion {
  promotionForm = new FormGroup({

  });
  private promotionService = inject(PromotionService);


  createPromotion(promotion : Promotion) {
    this.promotionService.createPromotion(promotion).subscribe({
      next: response => {
        alert(response.message);
        console.log(response.data);
      },
      error: error => console.log(error),
    })
  }

  updatePromotion(promotionId : number , promotion : Promotion) {
    this.promotionService.updatePromotion(promotionId , promotion).subscribe({
      next: response => {
        alert(response.message);
        console.log(response.data);
      },
      error: error => console.log(error),
    })
  }

}
