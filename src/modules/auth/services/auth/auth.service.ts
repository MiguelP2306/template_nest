import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Entity
import { UserEntity } from '../../../users/entities/user.entity';

// Interfaces
import {
  IAuthLogin,
  PayloadToken,
} from '../../../../commons/Interface/auth.interface';
import { ErrorManager } from '../../../../commons/utils/error.manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
  ) {}

  async validateUser({ email, password }: IAuthLogin) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email }
      });

      if (!user)
        throw new ErrorManager({
          type: HttpStatus.UNAUTHORIZED,
          message: 'Email or password are incorrect',
        });

      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        return this.generateJwt({ user });
      }

      throw new ErrorManager({
        type: HttpStatus.UNAUTHORIZED,
        message: 'Email or password are incorrect',
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  generateJwt({ user }: { user: UserEntity }) {
    const payload: PayloadToken = {
      role: user.role,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
