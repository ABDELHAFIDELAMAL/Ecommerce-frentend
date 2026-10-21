import {Component, inject, signal} from '@angular/core';
import {ImageService} from '../../../services/image-service/image-service';
import {Image} from '../../../entities/Image';
import {NgOptimizedImage} from '@angular/common';

@Component({
  imports: [
    NgOptimizedImage
  ],
  selector: 'app-image-list',
  styleUrl: './image-list.css',
  templateUrl: './image-list.html',
})
export class ImageList {
  imageService = inject(ImageService);
  images = signal<Image[]>([]);

  ngOnInit() {
    this.getAllImages();
  }

  getAllImages(){
    this.imageService.getAllImages().subscribe({
      next: response => {
        console.log(response.message);
        this.images.set(response.data);
        console.log("Images : " , response.data);
      },
      error: error => {
        console.log("Error getAllImages :" , error);
      }
    })
  }
}
