import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
} from '@nestjs/common';

// Commons
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { MeService } from './me.service';

// DTO'S
import { ResponseUserDto } from '../users/dto/responseUser.dto';

// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

// Decorators
import { AllRoles } from '../auth/decorators/roles.decorator';
import { UserToken } from '../auth/decorators/user.decorator';

// Interceptors
import { ResponseInterceptor } from '../../commons/interceptors/response.interceptor';

// Interface
import { IUserAuth } from '../../commons/Interface/auth.interface';

@ApiTags('Me')
@Controller('me')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ResponseInterceptor)
@ApiBearerAuth()
export class MeController {
  constructor(private readonly meService: MeService) {}

  @AllRoles()
  @Get()
  @ApiOperation({
    summary: 'Get me.',
    description: 'this endpoint is for get me information.',
  })
  async getUserById(@UserToken() me: IUserAuth): Promise<ResponseUserDto> {
    const meInformation = await this.meService.getMe({ me });

    return {
      data: meInformation
    }
  }
}
