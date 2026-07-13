import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';
import { Section } from '../models/section';
import { environment } from '../environments/environment';
import { switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);
  const section: Section = authService.current;

  //-- Requisição de geração de token não precisa de token
  if (section?.access_token?.length <= 0) return next(req);

  //-- Requisição com token válido.
  if (section.expires_token > Date.now()) {
    const newReq = req.clone({setHeaders: {
      Authorization: `Bearer ${section.access_token}`, 
      tenantId: environment.tenantId,
      username: `Integracao`
    }});
    return next(newReq);
  }

  // Exetuca o refresh e segue com a requisição com o novo token.
  return authService.refreshSection().pipe(switchMap(newSection => {
    const newReq = req.clone({setHeaders: {
      Authorization: `Bearer ${newSection.access_token}`, 
      tenantId: environment.tenantId,
      username: `Integracao`
    }});
    return next(newReq);
  }));

  return next(req);
};
