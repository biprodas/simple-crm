import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCredentialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  loginUrl: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  username: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  email: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  password: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  secret: string;

  @Transform(({ value }) => value || null)
  @IsBoolean()
  @IsOptional()
  isEnabled2FA: boolean;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  owner2FA: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  notes: string;
}
