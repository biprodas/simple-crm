import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dtos';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
  private logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepo: Repository<CustomerEntity>,
  ) {}

  getCustomers(
    _ctx: RequestContextDto,
    dto: FilterCustomerDto,
  ): Promise<CustomerEntity[]> {
    this.logger.log(`${this.getCustomers.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.customerRepo.find({ where: reqQuery });
  }

  async getCustomer(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<CustomerEntity> {
    this.logger.log(`${this.getCustomer.name} Service Called`);

    const customer = await this.customerRepo.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer of id ${id} not found.`);
    }

    return customer;
  }

  async createCustomer(
    _ctx: RequestContextDto,
    dto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    this.logger.log(`${this.createCustomer.name} Service Called`);

    const customer = this.customerRepo.create(dto);

    return this.customerRepo.save(customer);
  }

  async updateCustomer(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    this.logger.log(`${this.updateCustomer.name} Service Called`);

    const customer = await this.getCustomer(ctx, id);
    this.customerRepo.merge(customer, dto);

    return this.customerRepo.save(customer);
  }

  async deleteCustomer(
    ctx: RequestContextDto,
    id: string,
  ): Promise<CustomerEntity> {
    this.logger.log(`${this.deleteCustomer.name} Service Called`);

    const customer = await this.getCustomer(ctx, id);

    return this.customerRepo.remove(customer);
  }
}
