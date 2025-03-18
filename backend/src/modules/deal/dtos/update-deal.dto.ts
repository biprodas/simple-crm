import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDealDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
