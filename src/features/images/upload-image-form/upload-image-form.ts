import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../../services/image-service/image-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  selector: 'app-upload-image-form',
  styleUrl: './upload-image-form.css',
  templateUrl: './upload-image-form.html',
})
export class UploadImageForm {

  private imageService = inject(ImageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  productId = Number(this.route.snapshot.paramMap.get('id'));

  uploadImageForm = new FormGroup({
    altText: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null, Validators.required)
  });

  previewUrl: string | null = null;
  selectedFileName = '';

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.uploadImageForm.patchValue({ file });
    this.uploadImageForm.get('file')?.updateValueAndValidity();
    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.uploadImageForm.invalid || !this.productId) {
      this.uploadImageForm.markAllAsTouched();
      return;
    }

    const file = this.uploadImageForm.getRawValue().file!;
    const altText = this.uploadImageForm.getRawValue().altText!;

    this.imageService.uploadImage(this.productId, file, altText).subscribe({
      next: response => {
        alert(response.message);
        this.router.navigate(['/store']);
        this.uploadImageForm.reset();
        this.previewUrl = null;
      },
      error: error => {
        console.error('Error uploading image:', error);
        alert(error.error?.message || 'Failed to upload image');
      }
    });
  }
}
