import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  isSidebarOpen = signal<boolean>(false);

  toggleSidebar() {
    this.isSidebarOpen.update(open => !open);
    console.log("Toggled",this.isSidebarOpen())
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}