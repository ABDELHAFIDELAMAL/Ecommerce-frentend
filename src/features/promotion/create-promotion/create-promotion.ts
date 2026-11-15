import { Component, inject } from '@angular/core';
import { Promotion } from '../../../entities/Promotion';
import { PromotionService } from '../../../services/promotion-service/promotion-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DiscountType } from '../../../enums/DiscountType.enum';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-create-promotion',
  styleUrl: './create-promotion.css',
  templateUrl: './create-promotion.html',
})
export class CreatePromotion {
  private fb = inject(FormBuilder);
  private promotionService = inject(PromotionService);

  discountTypes = Object.values(DiscountType);
  successMessage = '';
  errorMessage = '';
  loading = false;

  promotionForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    discountValue: [0, [
      Validators.required,
      Validators.min(0.01)
    ]],
    discountType: [DiscountType.PERCENTAGE, Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    active: [true]
  });

  get discountValue() {
    return this.promotionForm.get('discountValue');
  }

  onSubmit(): void {
    if (this.promotionForm.invalid) {
      this.promotionForm.markAllAsTouched();
      return;
    }

    const formValue = this.promotionForm.getRawValue();

    if (
      formValue.discountType === DiscountType.PERCENTAGE &&
      Number(formValue.discountValue) > 100
    ) {
      this.errorMessage = 'Discount percentage cannot exceed 100%.';
      return;
    }

    if (
      new Date(formValue.endDate!) <= new Date(formValue.startDate!)
    ) {
      this.errorMessage = 'End date must be after start date.';
      return;
    }

    const promotion = {
      ...formValue,
      discountValue: Number(formValue.discountValue)
    };

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // @ts-ignore
    this.promotionService.createPromotion(promotion).subscribe({
      next: () => {
        this.successMessage = 'Promotion created successfully!';
        this.promotionForm.reset({
          name: '',
          description: '',
          discountValue: 0,
          discountType: DiscountType.PERCENTAGE,
          startDate: '',
          endDate: '',
          active: true
        });
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'An error occurred while creating promotion.';
        this.loading = false;
      }
    });
  }

  updatePromotion(promotionId: number, promotion: Promotion) {
    this.promotionService.updatePromotion(promotionId, promotion).subscribe({
      next: response => {
        alert(response.message);
        console.log(response.data);
      },
      error: error => console.log(error)
    });
  }
}
