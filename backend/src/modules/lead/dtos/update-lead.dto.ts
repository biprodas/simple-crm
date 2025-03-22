import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateLeadDto {
  @IsString()
  @IsNotEmpty()
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
}
