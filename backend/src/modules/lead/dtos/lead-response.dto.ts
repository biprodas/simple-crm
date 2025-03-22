import { Expose } from 'class-transformer';

export class LeadResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  contactName: string;

  @Expose()
  jobTitle: string;

  @Expose()
  source: string;
}
