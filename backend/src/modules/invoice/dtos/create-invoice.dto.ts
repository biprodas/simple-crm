import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { InvoiceStatus } from '../enums/status.enum';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  invoiceNo: string;

  @IsNumberString()
  @IsOptional()
  amount: number;

  @IsNumberString()
  @IsOptional()
  discount: number;

  // invoiceDate
  @IsDateString()
  @IsOptional()
  issueDate: Date;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(InvoiceStatus)
  @IsOptional()
  status: InvoiceStatus;
}
