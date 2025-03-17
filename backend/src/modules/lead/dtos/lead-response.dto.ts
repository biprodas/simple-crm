import { Expose } from 'class-transformer';

export class LeadResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
