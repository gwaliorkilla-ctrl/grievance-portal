import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../core/services/layoutService';
import { AuthService } from '../../core/services/authService';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  isOpen = this.layoutService.isSidebarOpen;
  onNavClick() {
    this.layoutService.closeSidebar();
  }
}