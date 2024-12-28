// CONFIG
import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ type: Date, description: 'Create date', example: '2024-06-03T03:13:05.649Z' })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'Update date', example: '2024-06-03T03:13:05.649Z' })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty({ type: Date, description: 'Delete date', example: '2024-06-03T03:13:05.649Z' })
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
  })
  deleteAt: Date;
}
