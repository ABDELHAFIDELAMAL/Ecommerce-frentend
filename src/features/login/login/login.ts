import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html'
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  login(): void {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: response => {
        if (response.success) {
          alert(response.message);
          this.router.navigate(['/']);
        }
      },
      error: error => {
        console.error(error);
      }
    });
  }
}
