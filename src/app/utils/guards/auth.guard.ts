import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../../data-access/services/loading/loading.service';
import { AuthService } from '../../data-access/services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) : Observable<boolean> |  Promise<boolean> | boolean => {
  let loadingService = inject(LoadingService);
  const router = inject(Router);
  const authService = inject(AuthService);
  loadingService.isLoading.next(true)
  const isAuthenticated : boolean = authService.isUserAuthenticated();
  if(!isAuthenticated){
    loadingService.isLoading.next(false)
    router.navigate(['login'])
  }
  loadingService.isLoading.next(false)
  return isAuthenticated;
};
