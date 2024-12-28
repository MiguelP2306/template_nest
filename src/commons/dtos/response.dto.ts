import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto {
  @ApiProperty({ type: Boolean, description: 'Indicates whether the operation was successfully', example: true })
  success?: boolean;

  @ApiProperty({ type: Object, description: 'Data response' })
  data: object;

  @ApiProperty({ type: Number, description: 'Quantity items', example: 10 })
  count?: number;
}

export class ResponseBadRequest {
  @ApiProperty({ type: Number, description: 'Indicates whether the operation was failed', example: 400 })
  statusCode: number;

  @ApiProperty({ type: [String], description: 'Indicates all errors', example: ['{field} should not be empty', '{field} must be an {type}'] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string
}

export class ResponseNotFound {
  @ApiProperty({ type: Number, description: 'Indicates whether the operation was failed', example: 404 })
  statusCode: number;

  @ApiProperty({ type: String, description: 'Indicates the resource was not found.', example: "NOT_FOUND :: {message}" })
  message: string;
}

export class ResponseUnauthorized {
  @ApiProperty({ type: Number, description: 'indicates that the user don\'t have an authentication token (JWT).', example: 401 })
  statusCode: number;

  @ApiProperty({ type: String, description: 'indicates that the user don\'t have an authentication token (JWT).', example: "Unauthorized" })
  message: string;
}
export class ResponseUnauthorizedByEmailOrPassword {
  @ApiProperty({ type: String, description: 'indicates that the user gave an incorrect password or email.', example: "UNAUTHORIZED :: Email or password are incorrect" })
  message: string;

  @ApiProperty({ type: Number, description: 'indicates that the user gave an incorrect password or email.', example: 401 })
  statusCode: number;
}
export class ResponseForbiddenResources {
  @ApiProperty({ type: String, description: 'Indicates that the user don\'t have permissions to consume this service.', example: "You don't have permissions for this endpoint." })
  message: string;

  @ApiProperty({ type: String, description: 'Indicates that the error.', example: "Forbidden" })
  error: string

  @ApiProperty({ type: Number, description: 'Indicates that the user don\'t have permissions to consume this service.', example: 403 })
  statusCode: number;
}

export class ResponseConflict {
  @ApiProperty({ type: Number, description: 'Indicates whether the operation was conflict.', example: 409 })
  statusCode: number;

  @ApiProperty({ type: String, description: 'Indicates errors if exist or not.', example: "CONFLICT :: {message} " })
  message: string;
}

export class ResponseSuccessDto {
  @ApiProperty({ type: Boolean, description: 'Indicates whether the operation was successfully', example: true })
  success: boolean
}
