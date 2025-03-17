import { Expose } from 'class-transformer';

export class CustomerResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
