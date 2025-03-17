import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto, FilterInvoiceDto, UpdateInvoiceDto } from '../dtos';
import { InvoiceEntity } from '../entities/invoice.entity';

@Injectable()
export class InvoiceService {
  private logger = new Logger(InvoiceService.name);

  constructor(
    @InjectRepository(InvoiceEntity)
    private readonly universityRepo: Repository<InvoiceEntity>,
  ) {}

  getUniversities(
    _ctx: RequestContextDto,
    dto: FilterInvoiceDto,
  ): Promise<InvoiceEntity[]> {
    this.logger.log(`${this.getUniversities.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.universityRepo.find({ where: reqQuery });
  }

  async getInvoice(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<InvoiceEntity> {
    this.logger.log(`${this.getInvoice.name} Service Called`);

    const university = await this.universityRepo.findOne({ where: { id } });
    if (!university) {
      throw new NotFoundException(`Invoice of id ${id} not found.`);
    }

    return university;
  }

  async createInvoice(
    _ctx: RequestContextDto,
    dto: CreateInvoiceDto,
  ): Promise<InvoiceEntity> {
    this.logger.log(`${this.createInvoice.name} Service Called`);

    const university = this.universityRepo.create(dto);

    return this.universityRepo.save(university);
  }

  async updateInvoice(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateInvoiceDto,
  ): Promise<InvoiceEntity> {
    this.logger.log(`${this.updateInvoice.name} Service Called`);

    const university = await this.getInvoice(ctx, id);
    this.universityRepo.merge(university, dto);

    return this.universityRepo.save(university);
  }

  async deleteInvoice(
    ctx: RequestContextDto,
    id: string,
  ): Promise<InvoiceEntity> {
    this.logger.log(`${this.deleteInvoice.name} Service Called`);

    const university = await this.getInvoice(ctx, id);

    return this.universityRepo.remove(university);
  }
}
