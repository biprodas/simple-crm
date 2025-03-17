import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContactDto, FilterContactDto, UpdateContactDto } from '../dtos';
import { ContactEntity } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  private logger = new Logger(ContactService.name);

  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepo: Repository<ContactEntity>,
  ) {}

  getContacts(
    _ctx: RequestContextDto,
    dto: FilterContactDto,
  ): Promise<ContactEntity[]> {
    this.logger.log(`${this.getContacts.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.contactRepo.find({ where: reqQuery });
  }

  async getContact(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<ContactEntity> {
    this.logger.log(`${this.getContact.name} Service Called`);

    const contact = await this.contactRepo.findOne({ where: { id } });
    if (!contact) {
      throw new NotFoundException(`Contact of id ${id} not found.`);
    }

    return contact;
  }

  async createContact(
    _ctx: RequestContextDto,
    dto: CreateContactDto,
  ): Promise<ContactEntity> {
    this.logger.log(`${this.createContact.name} Service Called`);

    const contact = this.contactRepo.create(dto);

    return this.contactRepo.save(contact);
  }

  async updateContact(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateContactDto,
  ): Promise<ContactEntity> {
    this.logger.log(`${this.updateContact.name} Service Called`);

    const contact = await this.getContact(ctx, id);
    this.contactRepo.merge(contact, dto);

    return this.contactRepo.save(contact);
  }

  async deleteContact(
    ctx: RequestContextDto,
    id: string,
  ): Promise<ContactEntity> {
    this.logger.log(`${this.deleteContact.name} Service Called`);

    const contact = await this.getContact(ctx, id);

    return this.contactRepo.remove(contact);
  }
}
