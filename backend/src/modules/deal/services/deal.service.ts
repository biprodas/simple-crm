import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDealDto, FilterDealDto, UpdateDealDto } from '../dtos';
import { DealEntity } from '../entities/deal.entity';

@Injectable()
export class DealService {
  private logger = new Logger(DealService.name);

  constructor(
    @InjectRepository(DealEntity)
    private readonly dealRepo: Repository<DealEntity>,
  ) {}

  getDeals(_ctx: RequestContextDto, dto: FilterDealDto): Promise<DealEntity[]> {
    this.logger.log(`${this.getDeals.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.dealRepo.find({ where: reqQuery });
  }

  async getDeal(_ctx: RequestContextDto, id: string): Promise<DealEntity> {
    this.logger.log(`${this.getDeal.name} Service Called`);

    const deal = await this.dealRepo.findOne({ where: { id } });
    if (!deal) {
      throw new NotFoundException(`Deal of id ${id} not found.`);
    }

    return deal;
  }

  async createDeal(
    _ctx: RequestContextDto,
    dto: CreateDealDto,
  ): Promise<DealEntity> {
    this.logger.log(`${this.createDeal.name} Service Called`);

    const deal = this.dealRepo.create(dto);

    deal.name = dto.degree + ' in ' + dto.subject;

    return this.dealRepo.save(deal);
  }

  async updateDeal(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateDealDto,
  ): Promise<DealEntity> {
    this.logger.log(`${this.updateDeal.name} Service Called`);

    const deal = await this.getDeal(ctx, id);
    this.dealRepo.merge(deal, dto);

    return this.dealRepo.save(deal);
  }

  async deleteDeal(ctx: RequestContextDto, id: string): Promise<DealEntity> {
    this.logger.log(`${this.deleteDeal.name} Service Called`);

    const deal = await this.getDeal(ctx, id);

    return this.dealRepo.remove(deal);
  }
}
