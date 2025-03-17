import { Expose } from 'class-transformer';

export class ContactResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
