import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1 class="auth-title">Iniciar Sesión</h1>
        
        <form class="auth-form" (submit)="onSubmit()">
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              id="username"
              type="text"
              class="form-control"
              [(ngModel)]="credentials.user"
              name="user"
              required
              placeholder="Ingresa tu usuario">
          </div>
          
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              class="form-control"
              [(ngModel)]="credentials.password"
              name="password"
              required
              placeholder="Ingresa tu contraseña">
          </div>
          
          <button type="submit" class="btn-primary">Entrar</button>
          
          <p *ngIf="error" class="error-message">{{ error }}</p>
        </form>
        
        <div class="auth-link">
          ¿No tienes cuenta? 
          <button class="link-btn" (click)="goToRegister()">Crear una cuenta</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../auth-styles.css']
})
export class Login {
  credentials = { user: '', password: '' };
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    this.auth.login(this.credentials.user, this.credentials.password)
      .subscribe({
        error: (err) => this.error = err.error?.msg || 'Error en el inicio de sesión'
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}