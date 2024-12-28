import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBodyDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly dni: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly whatsApp: string;

  @IsNotEmpty()
  @IsString()
  readonly countryCode: string;
}

export class ChangeUserPasswordBodyDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
