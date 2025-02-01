import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserBodyDto } from './createUser.dto';

const ExcludedUserFields = ['password'] as const;

export class UpdateBodyUserDto extends OmitType(
  PartialType(CreateUserBodyDto),
  ExcludedUserFields,
) {}
