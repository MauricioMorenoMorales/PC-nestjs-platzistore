import { Injectable, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject('MONGO') private databaseMongo: Db,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  public findAll() {
    return this.userModel.find().exec();
  }

  public getTasks() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    return tasksCollection.find().toArray();
  }

  public async findOne(id: string) {
    return this.userModel.findById(id);
  }

  public async getOrdersByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: [],
    };
  }

  public create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    return newModel.save();
  }

  public update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
  }

  public remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
