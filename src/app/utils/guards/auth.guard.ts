import { inject } from '@angular/core';
import { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../../data-access/services/loading/loading.service';
import { AuthService } from '../../data-access/services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

class PermissionService {
  canActivate(state: any): boolean | UrlTree {
    let loadingService = inject(LoadingService);
    const router = inject(Router);
    const authService = inject(AuthService);
    loadingService.isLoading.next(true)
    const isAuthenticated: boolean = authService.isUserAuthenticated();
    const url = state.url;
    if (isAuthenticated && url.includes('login')) {
     return router.parseUrl('/'); // Redirect to admin if user is already logged in and tries to access the /auth route
    }
    if (!isAuthenticated && !url.includes('login')) {
      return router.parseUrl('/login'); // Redirect to login page if user is not logged in and tries to access any other page
    }

    loadingService.isLoading.next(false)
    return true;
  }
}

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  return inject(PermissionService).canActivate(state);
};
