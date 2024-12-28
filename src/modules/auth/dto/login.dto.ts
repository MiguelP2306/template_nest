import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ResponseUserDto } from '../../users/dto';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty({ type: String, example: 'example@gmail.com' })
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, example: 'Qwerty1$' })
    password: string
}

export class ResponseLoginUser {
    access_token: string;
    user: ResponseUserDto
}
