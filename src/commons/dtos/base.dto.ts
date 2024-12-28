import { ApiProperty } from "@nestjs/swagger";

export class BaseDto {
  @ApiProperty({ type: Date, description: 'Create date', example: '2024-06-03T03:13:05.649Z' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'Update date', example: '2024-06-03T03:13:05.649Z' })
  updatedAt: Date;

  @ApiProperty({ type: Date, description: 'Delete date', example: '2024-06-03T03:13:05.649Z' })
  deleteAt: Date;
}
