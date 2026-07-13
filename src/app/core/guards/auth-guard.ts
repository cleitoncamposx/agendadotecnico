import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const section = authService.current;
  const router = inject(Router);
  
  if(section.access_token)  return true;

  return router.createUrlTree(['/login']);
};
