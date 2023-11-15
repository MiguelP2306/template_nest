import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../../../users/users.service';
import { User } from '../../../users/entities/user.entity';
import { PayloadToken } from '../../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: { email: string; password: string }) {
    const user = await this.usersService.findByEmail({ email });

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return this.generateJwt({ user });
    }

    return null;
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
