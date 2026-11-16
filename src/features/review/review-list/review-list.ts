import {Component, inject, signal} from '@angular/core';
import {Review} from '../../../entities/Review';
import {ReviewService} from '../../../services/review-service/review-service';
import {ApiResponse} from '../../../response/ApiResponse';
import {DatePipe} from '@angular/common';

@Component({
  imports: [
    DatePipe
  ],
  selector: 'app-review-list',
  styleUrl: './review-list.css',
  templateUrl: './review-list.html',
})
export class ReviewList {
  reviews = signal<Review[]>([]);
  private reviewService = inject(ReviewService);

  ngOnInit() {
    this.getAllReviews();
  }

  getAllReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (response : ApiResponse<Review[]>) => {
        console.log(response);
        this.reviews.set(response.data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  deleteReviewById(id : number) {

  }

}
