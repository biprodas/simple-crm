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

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  acronym: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  website: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  ranking: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  details: string;

  @IsUUID('4')
  countryId: string;

  @IsUUID('4')
  @IsOptional()
  stateId: string;
}
