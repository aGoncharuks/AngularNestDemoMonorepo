import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StatusCodes } from 'http-status-codes';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ClientAuthService } from './client-auth.service';

@Injectable()
export class ClientAuthInterceptor implements HttpInterceptor {
  constructor(private authService: ClientAuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getTokenSilently$().pipe(
      switchMap(authToken => {
        const cloned = req.clone({
          headers: new HttpHeaders({
            'authorization': authToken
          })
        });
        return next.handle(cloned);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === StatusCodes.FORBIDDEN) {
          this.router.navigate(['']);
          return EMPTY;
        }
        return next.handle(req);
      })
    );
  }
}
