import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CredentialController } from './controllers/credential.controller';
import { CredentialEntity } from './entities/credential.entity';
import { CredentialService } from './services/credential.service';

@Module({
  imports: [TypeOrmModule.forFeature([CredentialEntity])],
  controllers: [CredentialController],
  providers: [CredentialService],
  exports: [],
})
export class CredentialModule {}
