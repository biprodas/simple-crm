import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CustomerStatus } from '../enums/status.enum';
import { CustomerType } from '../enums/customer-type.enum';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
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
  @IsString()
  @IsOptional()
  address: string;

  @Transform(({ value }) => value || null)
  @IsNumberString()
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
