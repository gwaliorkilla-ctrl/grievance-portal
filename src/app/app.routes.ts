import { Auth } from './features/auth/auth';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ComplaintListComponent } from './features/complaintList/complaintList';
import { ComplaintCreateComponent } from './features/complaintCreate/complaintCreate';
import { ComplaintDetailComponent } from './features/complaintDetail/complaintDetail';
import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'complaints',
    component: ComplaintListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'complaints/new',
    component: ComplaintCreateComponent,
    canActivate: [authGuard],
  },
  {
    path: 'complaints/:id',
    component: ComplaintDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

