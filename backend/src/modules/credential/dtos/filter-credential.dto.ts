import { IsOptional, IsString } from 'class-validator';

export class FilterCredentialDto {
  @IsString()
  @IsOptional()
  name: string;
}
