import {Component, inject} from '@angular/core';
import {ImageService} from '../../../services/image-service/image-service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {validate} from '@angular/forms/signals';

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-upload-image-form',
  styleUrl: './upload-image-form.css',
  templateUrl: './upload-image-form.html',
})
export class UploadImageForm {
  private imageService = inject(ImageService);
  private route = inject(Router);

  uploadImageForm = new FormGroup({
    altText: new FormControl('', Validators.required),
    file: new FormControl<File | null>(null, Validators.required)
  });

  previewUrl: string | null = null;
  productId = 5;
  onFileSelected(event: any) {
    const file = event.target.files[0] as File;
    if (!file) return;

    this.uploadImageForm.patchValue({ file: file });
    this.uploadImageForm.get('file')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result as string;
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.uploadImageForm.invalid) return;

    const file = this.uploadImageForm.value.file!;
    const altText = this.uploadImageForm.value.altText!;

    this.imageService.uploadImage(4, file, altText).subscribe({
      next: (res) => {
        console.log('success', res);
        this.uploadImageForm.reset();
        this.previewUrl = null;
      },
      error: (err) => console.error(err)
    });
  }

















  uploadImage(productId : number , file : File , altText : string) : void {
    this.imageService.uploadImage(productId , file , altText ).subscribe({
      next: response => {
        alert(response.message);
        this.route.navigate(['/store']).then();
      },
      error: error => {
        alert(error.message);
      }
    })
  }
}
