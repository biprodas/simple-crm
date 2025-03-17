import { Expose } from 'class-transformer';

export class DealResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
