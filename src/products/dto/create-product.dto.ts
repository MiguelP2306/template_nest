import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  price: number;
}
