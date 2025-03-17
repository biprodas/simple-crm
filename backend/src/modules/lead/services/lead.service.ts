import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateLeadDto, FilterLeadDto, UpdateLeadDto } from '../dtos';
import { LeadEntity } from '../entities/lead.entity';

@Injectable()
export class LeadService {
  private logger = new Logger(LeadService.name);

  constructor(
    @InjectRepository(LeadEntity)
    private readonly leadRepo: Repository<LeadEntity>,
  ) {}

  getLeads(_ctx: RequestContextDto, dto: FilterLeadDto): Promise<LeadEntity[]> {
    this.logger.log(`${this.getLeads.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.leadRepo.find({ where: reqQuery });
  }

  async getLead(_ctx: RequestContextDto, id: string): Promise<LeadEntity> {
    this.logger.log(`${this.getLead.name} Service Called`);

    const lead = await this.leadRepo.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead of id ${id} not found.`);
    }

    return lead;
  }

  async createLead(
    _ctx: RequestContextDto,
    dto: CreateLeadDto,
  ): Promise<LeadEntity> {
    this.logger.log(`${this.createLead.name} Service Called`);

    const lead = this.leadRepo.create(dto);

    return this.leadRepo.save(lead);
  }

  async updateLead(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateLeadDto,
  ): Promise<LeadEntity> {
    this.logger.log(`${this.updateLead.name} Service Called`);

    const lead = await this.getLead(ctx, id);
    this.leadRepo.merge(lead, dto);

    return this.leadRepo.save(lead);
  }

  async deleteLead(ctx: RequestContextDto, id: string): Promise<LeadEntity> {
    this.logger.log(`${this.deleteLead.name} Service Called`);

    const lead = await this.getLead(ctx, id);

    return this.leadRepo.remove(lead);
  }
}
