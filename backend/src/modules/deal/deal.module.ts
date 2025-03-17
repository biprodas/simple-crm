import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DealController } from './controllers/deal.controller';
import { DealService } from './services/deal.service';
import { DealEntity } from './entities/deal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DealEntity])],
  controllers: [DealController],
  providers: [DealService],
  exports: [],
})
export class DealModule {}
