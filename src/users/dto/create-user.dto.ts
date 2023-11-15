import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

// Commons
import { ROLES } from 'src/commons/models';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  readonly role: ROLES;
}

export class ResponseCreateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  deleteAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
