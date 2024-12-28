// Dto's
import { ResponseDto } from '../../../commons/dtos/response.dto';
import { SummaryUsersDto, UserDto } from '../../users/dto';

export class ResponseUserDto implements ResponseDto {
  success?: boolean;
  data: UserDto
}

export class ResponseUsersDto implements ResponseDto {
  success?: boolean;
  data: UserDto[];
  count: number;
}


export class ResponseSummaryUsersDto implements ResponseDto {
  success?: boolean;
  data: SummaryUsersDto;
}
