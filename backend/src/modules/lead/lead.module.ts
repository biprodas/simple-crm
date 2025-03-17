import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LeadController } from './controllers/lead.controller';
import { LeadEntity } from './entities/lead.entity';
import { LeadService } from './services/lead.service';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  controllers: [LeadController],
  providers: [LeadService],
  exports: [],
})
export class LeadModule {}
