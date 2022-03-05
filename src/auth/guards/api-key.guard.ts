import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ConfigType } from '@nestjs/config';

import { Request } from 'express';
import { IS_PUBLICK_KEY } from '../decorators/public.decorator';

import config from '../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLICK_KEY, context.getHandler()); // Con un set metadata te puedes saltar esto
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.header('Auth');
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) throw new UnauthorizedException('Not allowed');
    return true;
  }
}
