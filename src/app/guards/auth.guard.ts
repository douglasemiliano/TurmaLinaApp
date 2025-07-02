import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth/auth-google.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthGoogleService); // Injeta o serviço de autenticação
  const router = inject(Router); // Injeta o Router para redirecionamento

  if (authService.isTokenValid()) {
    // Usuário autenticado, permite acesso
    return true;
  } else {
    // Usuário não autenticado, redireciona para a página de login
    router.navigate(['/login']);
    return false;
  }
};