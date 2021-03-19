import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { compose } from 'ramda';
import { Observable, of } from 'rxjs';

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor() {
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return of(
      compose(
        Boolean,
        ctx => ctx.switchToHttp().getRequest().userId,
      )(context)
    )
  }
}
