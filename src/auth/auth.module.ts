import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  providers: [AuthService, LocalStrategy],
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
})
export class AuthModule {}
