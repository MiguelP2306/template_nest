// Dto's
import { ResponseDto } from '../../../commons/dtos/response.dto';
import { UserDto } from '../../users/dto';

export class ResponseUserDto implements ResponseDto {
  success?: boolean;
  data: UserDto
}

export class ResponseUsersDto implements ResponseDto {
  success?: boolean;
  data: UserDto[];
  count: number;
}
