import {Component, inject, signal} from '@angular/core';
import {Promotion} from '../../../entities/Promotion';
import {PromotionService} from '../../../services/promotion-service/promotion-service';
import {DiscountType} from '../../../enums/DiscountType.enum';

@Component({
  imports: [],
  selector: 'app-promotion-list',
  styleUrl: './promotion-list.css',
  templateUrl: './promotion-list.html',
})
export class PromotionList {
  promotions = signal<Promotion[]>([]) ;
  private promotionService = inject(PromotionService);

  ngOnInit() {
    this.getAllPromotions();
  }

  getAllPromotions() {
    this.promotionService.getAllPromotions().subscribe({
      next: response => {
        console.log(response);
        this.promotions.set(response.data);
      } ,
      error: error => console.log(error),
    })
  }

  getPromotionsByDiscountType(discountType: DiscountType) {
    this.promotionService.getPromotionsByDiscountType(discountType).subscribe({
      next: response => {
        console.log(response);
        this.promotions.set(response.data);
      },
      error: error => console.log(error),
    })
  }
}
