import { IsOptional, IsString } from 'class-validator';

export class FilterCustomerDto {
  @IsString()
  @IsOptional()
  name: string;
}
