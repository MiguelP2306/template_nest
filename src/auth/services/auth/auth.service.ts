import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Services
import { UsersService } from '../../../users/users.service';

// Entity
import { User } from '../../../users/entities/user.entity';

// Models
import { PayloadToken } from '../../models/token.model';

// Interfaces
import { IAuthLogin } from 'src/commons/Interface/auth.interface';
import { ErrorManager } from 'src/commons/utils/error.manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: IAuthLogin) {
    try {
      const user = await this.usersService.findByEmail({ email });

      if (!user)
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Email or password are incorrect',
        });

      const isMatch = await bcrypt.compare(password, user.password);

      if (user && isMatch) {
        return this.generateJwt({ user });
      }

      throw new ErrorManager({
        type: 'UNAUTHORIZED',
        message: 'Email or password are incorrect',
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  generateJwt({ user }: { user: User }) {
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
