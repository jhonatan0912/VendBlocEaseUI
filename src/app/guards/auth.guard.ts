import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let isAuthenticated : boolean = false;
  const auth = inject(AuthService);
  const router = inject(Router);
  auth.isAuthenticated$.subscribe((result) => {
   isAuthenticated = result;
  })
  if(!isAuthenticated){
    router.navigate(['login'])
  }
  return isAuthenticated;
};
