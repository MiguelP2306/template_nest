import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, ILike, Repository } from 'typeorm';

// DTO'S
import {
  CreateUserBodyDto,
  FilterUserListDto,
  ResponseUsersDto,
  UpdateBodyUserDto,
  UserDto,
} from './dto';

// Entity
import { User } from './entities/user.entity';

// Commons
import { ErrorManager, REJEXT_PASSWORD, ROLES } from '../../commons';
import { mergeAndOrConditionsHelpers } from '@app/commons/utils/helpers.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private validateUserPassword({ password }: { password: string }) {
    if (!REJEXT_PASSWORD.test(password)) {
      throw new ErrorManager({
        type: HttpStatus.BAD_REQUEST,
        message: `The password must have the following requirements: minimum 8 characters, 1 capital letter, 1 minuscule, 1 special character`,
      });
    }
  }

  async getAllUsers({
    queries,
  }: {
    queries: FilterUserListDto;
  }): Promise<ResponseUsersDto> {
    try {
      const { search = '', page = 1, limit = 10, role } = queries ?? {};

      const AND_CONDITIONAL: FindManyOptions<User> = {
        where: {
          ...(role && { role }),
        },
      };

      const OR_CONDITIONAL: FindManyOptions<User> = {
        where: [
          { firstName: ILike(`%${search}%`) },
          { lastName: ILike(`%${search}%`) },
          { email: ILike(`%${search}%`) },
        ],
      };

      const OPTIONS_CONDITIONAL = mergeAndOrConditionsHelpers<User>({
        and: AND_CONDITIONAL,
        or: OR_CONDITIONAL,
      });

      const [users, count] = await this.usersRepository.findAndCount({
        where: OPTIONS_CONDITIONAL,
        skip: (page - 1) * limit,
        take: limit,
      });

      return {
        data: users,
        count,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async getSummaryUsers() {
    try {
      const totalResults = await Promise.all([
        this.usersRepository.count(),
        this.usersRepository.count({ where: { role: ROLES.CLIENT } }),
        this.usersRepository.count({ where: { role: ROLES.SUPPLIER_CLIENT } }),
        this.usersRepository.count({ where: { role: ROLES.SALES_AGENT } }),
      ]);

      return {
        totalUsers: totalResults[0] || 0,
        totalClients: totalResults[1] || 0,
        totalSuppliers: totalResults[2] || 0,
        totalSalesAgents: totalResults[3] || 0,
      };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async create(body: CreateUserBodyDto): Promise<UserDto> {
    try {
      this.validateUserPassword({ password: body.password });

      const user = await this.findByEmail({ email: body.email });

      if (user) {
        throw new ErrorManager({
          type: HttpStatus.CONFLICT,
          message: 'The email already exists',
        });
      }

      const newUser = this.usersRepository.create(body);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findByEmail({ email }: { email: string }): Promise<User | null> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error);
    }
  }

  async getUserById({ id }: { id: string }): Promise<UserDto> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new ErrorManager({
          type: HttpStatus.NOT_FOUND,
          message: `User with id ${id} was not found`,
        });
      }

      // @ts-expect-error @ts-ignore
      delete user.password;

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async editUser({
    id,
    body,
  }: {
    id: string;
    body: UpdateBodyUserDto;
  }): Promise<UserDto> {
    try {
      if (!Object.values(body).length) {
        throw new ErrorManager({
          type: HttpStatus.BAD_REQUEST,
          message: 'To edit a user you need to send a body',
        });
      }

      const user = await this.getUserById({ id });

      const updateUser: UserDto = {
        ...user,
        ...body,
      };

      await this.usersRepository.update(id, updateUser);

      return updateUser;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async deleteUser({ id }: { id: string }): Promise<UserDto> {
    try {
      const user = await this.getUserById({ id });

      await this.usersRepository.softDelete(id);

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
