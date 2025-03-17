import { IsOptional, IsString } from 'class-validator';

export class FilterInvoiceDto {
  @IsString()
  @IsOptional()
  name: string;
}
