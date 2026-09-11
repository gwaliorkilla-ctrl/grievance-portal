import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, Routes } from '@angular/router';
// import { Board } from './board/board';
// import { Login } from './login/login';
// import { Profile } from './component/profile/profile';
// import { UserSearch } from './component/user/user';
// import { TaskComponent } from './component/task/task';
import {AuthService} from './core/services/authService';
import { Auth } from './features/auth/auth';

/**
 * Route guard for protected routes (e.g. /board, /profile, /user):
 * - If user is logged in, access is granted.
 * - If user is NOT logged in, redirects to the login page ('/').
 * - If applied to the root login route (''), automatically redirects logged-in users to home ('/board').
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();

  // If applied to login page
  if (route.routeConfig?.path === '') {
    return isLoggedIn ? router.createUrlTree(['/board']) : true;
  }

  // If applied to protected routes
  return isLoggedIn ? true : router.createUrlTree(['/']);
};

/**
 * Route guard for public/guest routes (e.g. login):
 * - If user is already logged in, redirects to the home page ('/board').
 * - If user is NOT logged in, allows visiting the login page.
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};

export const routes: Routes = [
//   {
//     path: 'board',
//     component: Board,
//     // canActivate: [authGuard],
//   },
  {
    path: '',
    component: Auth,
    // canActivate: [guestGuard],
  },
//   {
//     path: 'profile',
//     component: Profile,
//     // canActivate: [authGuard],
//   },
//   {
//     path: 'user',
//     component: UserSearch,
//     // canActivate: [authGuard],
//   },
//   { 
//     path: 'task/:id',
//     component: TaskComponent, 
//   },
  {
    path: '**',
    redirectTo: '',
  },
];

