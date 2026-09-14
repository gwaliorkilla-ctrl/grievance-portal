import { Auth } from './features/auth/auth';
import { Dashboard } from './features/dashboard/dashboard';
import { ComplaintList } from './features/complaintList/complaintList';
import { ComplaintCreate } from './features/complaintCreate/complaintCreate';
import { ComplaintDetail } from './features/complaintDetail/complaintDetail';
import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  {
    path: '',
    component: Auth,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard],
  },
  {
    path: 'complaints',
    component: ComplaintList,
    canActivate: [authGuard],
  },
  {
    path: 'complaints/new',
    component: ComplaintCreate,
    canActivate: [authGuard],
  },
  {
    path: 'complaints/:id',
    component: ComplaintDetail,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

