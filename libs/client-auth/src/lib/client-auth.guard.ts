import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClientAuthService } from './client-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanLoad {
  constructor(private authService: ClientAuthService) {}

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated$.pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.authService.login(route.path);
        }
      })
    );
  }
}
