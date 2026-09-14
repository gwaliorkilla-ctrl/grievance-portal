import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../core/services/layoutService';
import { AuthService } from '../../core/services/authService';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  toggle(){
    this.layoutService.toggleSidebar();
  }
}