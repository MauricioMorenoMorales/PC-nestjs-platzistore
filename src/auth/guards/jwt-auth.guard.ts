import { ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_PUBLICK_KEY } from '../decorators/public.decorator';

// Salta la verificacion de un jwt
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLICK_KEY, context.getHandler());
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
