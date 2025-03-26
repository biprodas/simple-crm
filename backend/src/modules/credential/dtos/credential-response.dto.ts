import { Expose } from 'class-transformer';

export class CredentialResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

}
