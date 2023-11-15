import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

// Strategies
import { LOCAL_STRATEGY } from '../strategies/local.strategy';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard(LOCAL_STRATEGY))
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
