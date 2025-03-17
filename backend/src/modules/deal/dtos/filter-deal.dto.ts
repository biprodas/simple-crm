import { IsString } from 'class-validator';

export class FilterDealDto {
  @IsString()
  name: string;
}
