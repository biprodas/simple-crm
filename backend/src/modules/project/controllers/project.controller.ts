import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@admin/auth/guards';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import {
  ProjectResponseDto,
  CreateProjectDto,
  FilterProjectDto,
  UpdateProjectDto,
} from '../dtos';
import { ProjectService } from '../services/project.service';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  private logger = new Logger(ProjectController.name);

  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  async getProjects(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterProjectDto,
  ): Promise<BaseApiSuccessResponse<ProjectResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all projects. Query: ${JSON.stringify(dto)}`,
    );

    const projects = await this.projectService.getProjects(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of projects`,
      totalRecords: projects.length,
      data: projects,
    };
  }

  @Get('/:id')
  async getProject(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProjectResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving project details. Id: ${id}`,
    );

    const project = await this.projectService.getProject(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of project of id: ${id}`,
      data: project,
    };
  }

  @Post('/')
  async createProject(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateProjectDto,
  ): Promise<BaseApiSuccessResponse<ProjectResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new project. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const project = await this.projectService.createProject(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New project of id: ${project.id} created`,
      data: project,
    };
  }

  @Put('/:id')
  async updateProject(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProjectDto,
  ): Promise<BaseApiSuccessResponse<ProjectResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a project. Id ${id}`,
    );

    const project = await this.projectService.updateProject(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Project of id "${id}" updated`,
      data: project,
    };
  }

  @Delete('/:id')
  async deleteProject(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProjectResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a project. Id: ${id}`,
    );

    const project = await this.projectService.deleteProject(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Project of id "${id}" deleted`,
      data: project,
    };
  }
}
