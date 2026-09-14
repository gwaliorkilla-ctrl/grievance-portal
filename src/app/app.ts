import { Component, signal } from '@angular/core';
import { AppLayout } from './layout/appLayout/appLayout';
@Component({
  imports: [AppLayout],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');
}
