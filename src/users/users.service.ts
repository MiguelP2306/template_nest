import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTO'S
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const newUser = this.usersRepository.create(data);
    return this.usersRepository.save(newUser);
  }

  // findAll() {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  findByEmail({ email }: { email: string }) {
    return this.usersRepository.findOne({ where: { email } });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
