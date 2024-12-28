import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Strategies
import { LOCAL_STRATEGY } from '../strategies/local.strategy';

// Dto
import { LoginUserDto } from '../dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({
    summary: 'Auth login user.',
    description: 'This endpoint is for login the user.',
  })
  @ApiBody({
    type: LoginUserDto,
    description: 'The fields to be login user.',
  })
  @UseGuards(AuthGuard(LOCAL_STRATEGY))
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
