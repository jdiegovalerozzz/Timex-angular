import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Registro</h1>
        
        <form class="auth-form" (submit)="onSubmit()">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              id="username"
              type="text"
              class="form-control"
              [(ngModel)]="form.user"
              name="user"
              required
              placeholder="Crea un nombre de usuario">
          </div>
          
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              class="form-control"
              [(ngModel)]="form.email"
              name="email"
              required
              placeholder="Ingresa tu correo electrónico">
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              class="form-control"
              [(ngModel)]="form.password"
              name="password"
              required
              placeholder="Crea una contraseña segura">
          </div>
          
          <button type="submit" class="btn-primary">Registrarse</button>
          
          <p *ngIf="error" class="error-message">{{ error }}</p>
        </form>
        
        <div class="auth-link">
          ¿Ya tienes cuenta? 
          <button class="link-btn" (click)="goToLogin()">Iniciar sesión</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../auth-styles.css']
})
export class Register {
  form = { user: '', email: '', password: '' };
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.register(
      this.form.user,
      this.form.password,
      this.form.email
    ).subscribe({
      error: (err) => this.error = err.error?.msg || 'Error en el registro'
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}