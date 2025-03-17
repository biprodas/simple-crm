import { Expose } from 'class-transformer';

export class InvoiceResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  acronym: string;

  @Expose()
  website: string;

  @Expose()
  ranking: string;

  @Expose()
  details: string;
}
