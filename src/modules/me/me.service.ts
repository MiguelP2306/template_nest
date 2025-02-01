import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Commons
import { ErrorManager } from '../../commons/utils/error.manager';
import { IUserAuth } from '../../commons/Interface/auth.interface';

// Entity
import { UserEntity } from '../users/entities/user.entity';

// DTO'S
import { UpdateBodyMeDto } from './dto/updateMe.dto';
// import { ResponseUserDto } from '../users/dto/responseUser.dto';

@Injectable()
export class MeService {
  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
  ) {}

  async getMe({ me }: { me: IUserAuth }): Promise<UserEntity> {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          id: me.sub,
        },
      });

      if (!user) {
        throw new ErrorManager({
          type: HttpStatus.NOT_FOUND,
          message: `User was not found`,
        });
      }

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async updateMe({
    me,
    body,
  }: {
    me: IUserAuth;
    body: UpdateBodyMeDto;
  }): Promise<UpdateBodyMeDto> {
    try {
      await this.usersRepository.update(me.sub, body);
      return body;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
