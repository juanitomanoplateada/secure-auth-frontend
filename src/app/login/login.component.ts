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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
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
            },
            error: (err) => {
              this.errorMessage =
                err.error?.detail || '❌ Error al iniciar sesión';
              this.successMessage = '';
            },
          });
        },
        error: () => {
          this.errorMessage = '❌ Error generando token HMAC';
          this.successMessage = '';
        },
      });
  }

  onRegister(): void {
    const { username, password } = this.loginForm.value;

    // Validación básica
    if (!username || !password) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
      return;
    }

    const payload = {
      username,
      password,
      email: `${username}@secureauth.com` // o un input real si decides agregarlo luego
    };

    this.http.post(`${this.backendUrl}/register`, payload).subscribe({
      next: () => {
        this.successMessage = '✅ Registro exitoso. Ahora puedes iniciar sesión.';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage =
          err.error?.detail || '❌ Error al registrar usuario.';
        this.successMessage = '';
      }
    });
  }

}
