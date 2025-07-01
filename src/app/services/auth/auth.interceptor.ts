import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const token = localStorage.getItem('accessToken');
  const authService = inject(OAuthService);
  const router = inject(Router);
  

  if (token && authService.hasValidAccessToken()) {
    if (req.url.startsWith(environment.BACKEND_URL)) {
      const authReq = req.clone({
        setHeaders: { accessToken: token }
      });
      return next(authReq);
    } else {
      return next(req);
    }
  }
  
  router.navigate(['/login']);
  return next(req);

};
