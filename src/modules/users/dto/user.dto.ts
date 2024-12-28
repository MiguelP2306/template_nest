import { OmitType } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { QueryOptionsDto, ROLES } from "@app/commons";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

const ExcludedUserFields = ['password', 'transformRoleToLowerCase', 'hashPassword'] as const

export class UserDto extends OmitType(User, ExcludedUserFields) {}

export class FilterUserListDto extends QueryOptionsDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  countryCode?: string;

  @IsEnum(ROLES)
  @IsOptional()
  @Type(() => String)
  role?: ROLES;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  isVerify?: Number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  isActive?: Number;
}

export class SummaryUsersDto {
  @IsNumber()
  @Type(() => Number)
  totalUsers: number;

  @IsNumber()
  @Type(() => Number)
  totalClients: number;

  @IsNumber()
  @Type(() => Number)
  totalSuppliers: number;

  @IsNumber()
  @Type(() => Number)
  totalSalesAgents: number;
}
