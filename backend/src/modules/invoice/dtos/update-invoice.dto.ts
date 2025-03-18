import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
