import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../../data-access/services/loading/loading.service';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class PermissionService{
  canActivate(): boolean{
    let loadingService = inject(LoadingService);
  const router = inject(Router);
  const authService = inject(AuthService);
  loadingService.isLoading.next(true)
  const isAuthenticated : boolean = authService.isUserAuthenticated();
  if(!isAuthenticated){
    loadingService.isLoading.next(false)
    router.navigate(['login'])
    return isAuthenticated;
  }
  loadingService.isLoading.next(false)
  return isAuthenticated;
  }
}

export const authGuard: CanActivateFn = (route, state) : Observable<boolean> |  Promise<boolean> | boolean => {
  return inject(PermissionService).canActivate();
};
