import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

interface User {
  userId: number;
  user: string;
  profile: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {
    this.checkSession();
  }

  private checkSession() {
    this.http.get<{ sts: boolean; user?: User }>(`${this.apiUrl}/session`).subscribe({
      next: (response) => {
        if (response.sts && response.user) {
          this.currentUserSubject.next(response.user);
        } else {
          this.clearAuthState();
        }
      },
      error: () => this.clearAuthState()
    });
  }

  login(username: string, password: string) {
    return this.http.post<{ sts: boolean; msg: string; user?: User }>(
      `${this.apiUrl}/login`, 
      { user: username, password }
    ).pipe(
      tap(response => {
        if (response.sts && response.user) {
          this.currentUserSubject.next(response.user);
          this.router.navigate(['/']);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  register(username: string, password: string, email: string) {
    return this.http.post<{
      sts: boolean;
      msg: string;
      user?: { user_id: number; user_na: string; user_email: string };
    }>(`${this.apiUrl}/register`, { user: username, password, email }).pipe(
      tap(response => {
        if (response.sts) {
          this.router.navigate(['/login']);
        }
      }),
      catchError(error => {
        console.error('Register error:', error);
        return throwError(() => error);
      })
    );
  }

  logout() {
    this.clearAuthState();
    
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        console.log('Logout exitoso');
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Logout error:', error);
        this.router.navigate(['/login']);
        return throwError(() => error);
      })
    );
  }

  private clearAuthState() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('auth_state');
    sessionStorage.removeItem('auth_state');
  }

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}