import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserBodyDto } from './createUser.dto';
import { IsBoolean, IsOptional } from 'class-validator';

const ExcludedUserFields = ['password'] as const;

export class UpdateBodyUserDto extends OmitType(
  PartialType(CreateUserBodyDto),
  ExcludedUserFields,
) {
  @IsBoolean()
  @IsOptional()
  readonly isVerify?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isDangerous?: boolean;
}
