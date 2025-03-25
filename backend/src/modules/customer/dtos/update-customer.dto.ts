import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CustomerType } from '../enums/customer-type.enum';
import { CustomerStatus } from '../enums/status.enum';

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CustomerType)
  @IsOptional()
  type: CustomerType;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  email: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  phone: string;

  @Transform(({ value }) => value || null)
  @IsNumberString()
  @IsOptional()
  address: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  billRate: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  leadId: string;

  @IsEnum(CustomerStatus)
  @IsOptional()
  status: CustomerStatus;
}
