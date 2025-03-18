import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateDealDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
