import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalService } from '../data-access/services/local/local.service';
import { catchError, throwError } from 'rxjs';

export const httptokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.url);
  const localStorage = inject(LocalService);
  
  const authToken = localStorage.getData('token');
  if(authToken === null)return next(req);

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
       Authorization: `Bearer ${authToken}`
    }
  });
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {      
          console.error('Unauthorized request:', err);
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err); 
    }))
};
