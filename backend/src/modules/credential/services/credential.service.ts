import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto, FilterCredentialDto, UpdateCredentialDto } from '../dtos';
import { CredentialEntity } from '../entities/credential.entity';

@Injectable()
export class CredentialService {
  private logger = new Logger(CredentialService.name);

  constructor(
    @InjectRepository(CredentialEntity)
    private readonly credentialRepo: Repository<CredentialEntity>,
  ) {}

  getCredentials(_ctx: RequestContextDto, dto: FilterCredentialDto): Promise<CredentialEntity[]> {
    this.logger.log(`${this.getCredentials.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.credentialRepo.find({ where: reqQuery });
  }

  async getCredential(_ctx: RequestContextDto, id: string): Promise<CredentialEntity> {
    this.logger.log(`${this.getCredential.name} Service Called`);

    const credential = await this.credentialRepo.findOne({ where: { id } });
    if (!credential) {
      throw new NotFoundException(`Credential of id ${id} not found.`);
    }

    return credential;
  }

  async createCredential(
    _ctx: RequestContextDto,
    dto: CreateCredentialDto,
  ): Promise<CredentialEntity> {
    this.logger.log(`${this.createCredential.name} Service Called`);

    const credential = this.credentialRepo.create(dto);

    return this.credentialRepo.save(credential);
  }

  async updateCredential(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateCredentialDto,
  ): Promise<CredentialEntity> {
    this.logger.log(`${this.updateCredential.name} Service Called`);

    const credential = await this.getCredential(ctx, id);
    this.credentialRepo.merge(credential, dto);

    return this.credentialRepo.save(credential);
  }

  async deleteCredential(ctx: RequestContextDto, id: string): Promise<CredentialEntity> {
    this.logger.log(`${this.deleteCredential.name} Service Called`);

    const credential = await this.getCredential(ctx, id);

    return this.credentialRepo.remove(credential);
  }
}
