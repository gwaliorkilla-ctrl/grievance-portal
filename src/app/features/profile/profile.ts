import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/authService';
import { User } from '../../shared/models/user.type';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private authService = inject(AuthService);

  user = signal<User | null>(this.authService.currentUser());
  loading = signal<boolean>(true);
  errorMessage = signal<string | null>(null);

  defaultRole = 'District Administrator';

  ngOnInit() {
    this.authService.fetchCurrentUser().subscribe({
      next: (userData) => {
        this.user.set(userData);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
        this.errorMessage.set('Unable to retrieve official profile details.');
        this.loading.set(false);
      }
    });
  }
}