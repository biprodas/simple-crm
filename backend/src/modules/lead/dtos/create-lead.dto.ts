import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { LeadStatus } from '../enums/status.enum';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string;

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
  contactName: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  jobTitle: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  source: string;

  @IsEnum(LeadStatus)
  @IsOptional()
  status: LeadStatus;
}
