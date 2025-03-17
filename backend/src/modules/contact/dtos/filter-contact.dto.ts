import { IsOptional, IsString } from 'class-validator';

export class FilterContactDto {
  @IsString()
  @IsOptional()
  name: string;
}
