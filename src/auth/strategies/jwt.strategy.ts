import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
import { PayloadToken } from '../models/token.model';

//Las estrategias se crean completamente en este archivo y se usan con un @UseGuard(AuthGuard('<nombre de la strategy>'))
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }
  public validate(payload: PayloadToken) {
    return payload;
  }
}
