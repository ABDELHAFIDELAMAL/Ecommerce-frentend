import {Component, inject} from '@angular/core';
import {ViewportScroller} from '@angular/common';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private viewportScroller = inject(ViewportScroller);

  exploreProducts(): void {
    this.viewportScroller.scrollToAnchor('products');
  }

  discoverMore(): void {
    this.viewportScroller.scrollToAnchor('about');
  }
}
