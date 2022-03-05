import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard) // puedes usarlo para un metodo especifico o para todo el controlador
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  // @SetMetadata('isPublic', true) // con el uso del reflector puedes acceder a esta info saltandote el APIKeyGuard
  @Public() // Lo mismo de arriba pero con un decorador
  @Get('nuevo')
  public newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('/ruta/')
  public hello() {
    return 'con /sas/';
  }

  @Get('/tasks/')
  public getTasks() {
    return this.appService.getTasks();
  }
}
