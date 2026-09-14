import { HttpClient,HttpHeaders } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../../shared/models/user.type';
import { expiresInMins } from '../config/config';

@Service()
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(this.getValidSession());

  isLoggedIn = computed(() => this.currentUser() !== null);

  handleLogin(username: string, password: string) {

    return this.http.post<User>(
      'https://dummyjson.com/auth/login',
      {
        username,
        password,
        expiresInMins,
      },
      {
        withCredentials: true,
      }
    ).pipe(
      tap((user) => {
        const expiryTime = Date.now() + expiresInMins * 60 * 1000;

        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_user_expiry', expiryTime.toString());

        this.currentUser.set(user);
      })
    );
  }
  fetchCurrentUser() {
    const token = this.currentUser()?.accessToken || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<User>(
      'https://dummyjson.com/auth/me',
      {
        headers,
        withCredentials: true,
      }
    );
  }
  logout() {
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_user_expiry');
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }

  private getValidSession(): User | null {
    const userStr = localStorage.getItem('auth_user');
    const expiryStr = localStorage.getItem('auth_user_expiry');

    if (!userStr || !expiryStr) {
      return null;
    }

    const expiryTime = Number(expiryStr);
    const now = Date.now();

    if (now > expiryTime) {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_user_expiry');
      return null;
    }

    return JSON.parse(userStr);
  }
}