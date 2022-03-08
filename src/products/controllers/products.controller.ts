import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  // ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from './../../common/mongo-id.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';
import { ProductsService } from './../services/products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard) // tambien puede ser @UseGuards(AuthGuard('jwt')) pero no permitira publicos
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List of products' })
  public getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  public getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.OK)
  public getOne(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
