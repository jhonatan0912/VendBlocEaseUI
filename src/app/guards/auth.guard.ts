import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading/loading.service';

export const authGuard: CanActivateFn = (route, state) : Observable<boolean> |  Promise<boolean> | boolean => {
  const loadingService = inject(LoadingService);
  loadingService.isLoading.next(true)
  let isAuthenticated : boolean = false;
  const auth = inject(AuthService);
  const router = inject(Router);
  auth.isAuthenticated$.subscribe((result) => {
   isAuthenticated = result;
  })
  if(!isAuthenticated){
    loadingService.isLoading.next(false)
    router.navigate(['login'])
  }
  loadingService.isLoading.next(false)
  return isAuthenticated;
};
