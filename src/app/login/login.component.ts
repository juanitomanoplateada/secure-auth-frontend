import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  backendUrl = 'https://secureauth-production.up.railway.app';
  successMessage = '';
  isLoading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { username, password } = this.loginForm.value;
    const payload = { username, password, hmac_token: '' };

    this.http
      .post<{ hmac_token: string }>(`${this.backendUrl}/generate-hmac`, {
        username,
        password,
        hmac_token: '',
      })
      .subscribe({
        next: (res) => {
          payload.hmac_token = res.hmac_token;

          this.http.post(`${this.backendUrl}/login`, payload).subscribe({
            next: () => {
              this.successMessage = '✅ Inicio de sesión exitoso';
              this.errorMessage = '';
              this.isLoading = false;
            },
            error: (err) => {
              this.errorMessage =
                err.error?.detail || '❌ Error al iniciar sesión';
              this.successMessage = '';
              this.isLoading = false;
            },
          });
        },
        error: () => {
          this.errorMessage = '❌ Error generando token HMAC';
          this.successMessage = '';
          this.isLoading = false;
        },
      });
  }

  onRegister(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const { username, password } = this.loginForm.value;

    const payload = {
      username,
      password,
      email: `${username}@secureauth.com`,
    };

    this.http.post(`${this.backendUrl}/register`, payload).subscribe({
      next: () => {
        this.successMessage =
          '✅ Registro exitoso. Ahora puedes iniciar sesión.';
        this.errorMessage = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err.error?.detail || '❌ Error al registrar usuario.';
        this.successMessage = '';
        this.isLoading = false;
      },
    });
  }
}
