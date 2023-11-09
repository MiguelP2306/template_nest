import { Inject, Injectable } from '@nestjs/common';

// DTO'S
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Services
import { ProductsService } from 'src/products/products.service';
import { ConfigType } from '@nestjs/config';

import config from '../../config';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
