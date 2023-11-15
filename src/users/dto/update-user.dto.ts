import { PartialType } from '@nestjs/swagger';

// DTO'S
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
