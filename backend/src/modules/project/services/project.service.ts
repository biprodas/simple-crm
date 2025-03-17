import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, FilterProjectDto, UpdateProjectDto } from '../dtos';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectService {
  private logger = new Logger(ProjectService.name);

  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  getProjects(
    _ctx: RequestContextDto,
    dto: FilterProjectDto,
  ): Promise<ProjectEntity[]> {
    this.logger.log(`${this.getProjects.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.projectRepo.find({ where: reqQuery });
  }

  async getProject(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<ProjectEntity> {
    this.logger.log(`${this.getProject.name} Service Called`);

    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project of id ${id} not found.`);
    }

    return project;
  }

  async createProject(
    _ctx: RequestContextDto,
    dto: CreateProjectDto,
  ): Promise<ProjectEntity> {
    this.logger.log(`${this.createProject.name} Service Called`);

    const project = this.projectRepo.create(dto);

    return this.projectRepo.save(project);
  }

  async updateProject(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    this.logger.log(`${this.updateProject.name} Service Called`);

    const project = await this.getProject(ctx, id);
    this.projectRepo.merge(project, dto);

    return this.projectRepo.save(project);
  }

  async deleteProject(
    ctx: RequestContextDto,
    id: string,
  ): Promise<ProjectEntity> {
    this.logger.log(`${this.deleteProject.name} Service Called`);

    const project = await this.getProject(ctx, id);

    return this.projectRepo.remove(project);
  }
}
