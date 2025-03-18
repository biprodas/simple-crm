import { IsString } from 'class-validator';

export class FilterProjectDto {
  @IsString()
  name: string;
}
