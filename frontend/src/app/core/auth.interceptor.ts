import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenStorage } from './token-storage';

/** Sematkan header Authorization: Bearer <token>; bila 401 saat sesi aktif, kembali ke login. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokens = inject(TokenStorage);
  const router = inject(Router);
  const token = tokens.get();
  const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && token) {
        tokens.clear();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};
