import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// Dto's
export class UpdateBodyMeDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, example: 'Miguel' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, example: 'Perez' })
  readonly lastName: string;
}

