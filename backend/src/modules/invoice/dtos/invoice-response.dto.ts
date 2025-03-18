import { Expose } from 'class-transformer';

export class InvoiceResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
