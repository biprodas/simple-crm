import { IsOptional, IsString } from 'class-validator';

export class FilterLeadDto {
  @IsString()
  @IsOptional()
  name: string;
}
