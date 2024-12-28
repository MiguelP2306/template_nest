import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Get,
  // Delete,
  Patch,
  Query,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// Swagger
import {
  // ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  // ApiCreatedResponse,
  // ApiNotFoundResponse,
  // ApiOkResponse,
  ApiOperation,
  // ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// Services
import { UsersService } from './users.service';

// DTO'S
import {
  CreateUserBodyDto,
  FilterUserListDto,
  UpdateBodyUserDto,
  ResponseUserDto,
  ResponseUsersDto,
  ResponseSummaryUsersDto,
  // ChangeUserPasswordBodyDto,
} from './dto';

// Guards
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

// Commons
import {
  QueryOptionsDto,
  ROLES,
  // ResponseBadRequest,
  // ResponseConflict,
  // ResponseNotFound,
  ResponseInterceptor,
  IUserAuth,
} from '../../commons';

// Decorators
import {
  // AllRoles,
  Roles } from '../auth/decorators/roles.decorator';
import { UserToken } from '../auth/decorators/user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseInterceptors(ResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ---------------------------GET ALL USERS------------------------------------

  @ApiOperation({
    summary: 'Get all users.',
    description: 'this endpoint is for return all users.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.SUPERADMIN)
  @Get()
  getAllUsers(
    @Query() queries: FilterUserListDto,
  ): Promise<ResponseUsersDto> {
    return this.usersService.getAllUsers({ queries });
  }

  // -----------------------------GET SUMMARY USERS -------------------------------
  @ApiOperation({
    summary: 'Get summary users.',
    description: 'this endpoint is for return summary users.',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(ROLES.SUPERADMIN)
  @Get('summary')
  async getSummaryUsers(): Promise<ResponseSummaryUsersDto> {
    const result = await this.usersService.getSummaryUsers();

    return {
      data: result
    }
  }

  // -----------------------------POST CREATE USER--------------------------

  @ApiOperation({
    summary: 'Create user.',
    description: 'this endpoint is for create a user.',
  })
  @ApiBody({
    type: CreateUserBodyDto,
    description: 'The fields to be created.',
  })
  @Roles(ROLES.SUPERADMIN)
  @Post()
  async create(@Body() body: CreateUserBodyDto): Promise<ResponseUserDto> {
    const createUser = await this.usersService.create(body);

    return {
      data: createUser
    }
  }

  // --------------------------GET DETAILS USER------------------------------------

  @ApiOperation({
    summary: 'Get user by id.',
    description: 'This endpoint is to bring a user through the id.',
  })
  @Roles(ROLES.SUPERADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ResponseUserDto> {
    const user = await this.usersService.getUserById({ id });

    return {
      data: user
    }
  }

  // ------------------------------PATCH EDIT USER-----------------------------------

  @ApiOperation({
    summary: 'Edit user.',
    description: 'This endpoint is for editing the user.',
  })
  @ApiBody({
    type: UpdateBodyUserDto,
    description: 'The fields to be edit user.',
  })
  @Roles(ROLES.SUPERADMIN)
  @Patch(':id')
  async editUser(
    @Param('id') id: string,
    @Body() body: UpdateBodyUserDto,
  ): Promise<ResponseUserDto> {
    const user = await this.usersService.editUser({ id, body });

    return {
      data: user
    }
  }

  // -------------------------------DELETE USER-------------------------------

  // @ApiOperation({
  //   summary: 'Delete user.',
  //   description: 'This endpoint is for delete the user.',
  // })
  // @ApiOkResponse({
  //   type: ResponseUserDto,
  //   description: 'delete user successfully.',
  // })
  // @ApiNotFoundResponse({
  //   type: ResponseNotFound,
  //   description: 'User with id ${id} was not found',
  // })
  // @ApiBadRequestResponse({
  //   type: ResponseConflict,
  //   description: 'The id is required',
  // })
  // @Delete(':id')
  // @Roles(ROLES.SUPERADMIN, ROLES.CLIENT)
  // deleteUser(@Param('id') id: string): Promise<ResponseUserDto> {
  //   return this.usersService.deleteUser({ id });
  // }
}
