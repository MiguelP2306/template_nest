import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { QueryOptionsDto, ROLES } from '@app/commons';
import { IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

const ExcludedUserFields = [
  'password',
  'transformRoleToLowerCase',
  'hashPassword',
] as const;

export class UserDto extends OmitType(UserEntity, ExcludedUserFields) {}

export class FilterUserListDto extends QueryOptionsDto {
  @IsEnum(ROLES)
  @IsOptional()
  @Type(() => String)
  role?: ROLES;
}
