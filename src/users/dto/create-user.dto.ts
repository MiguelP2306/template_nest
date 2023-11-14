import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Esto es el nombre de un usuario' })
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Esto es el apellido de un usuario' })
  readonly last_name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'Esto es el email de un usuario' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Esto es la contraseña de un usuario' })
  password: string;
}
