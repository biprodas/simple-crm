import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
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
  LeadResponseDto,
  CreateLeadDto,
  FilterLeadDto,
  UpdateLeadDto,
} from '../dtos';
import { LeadService } from '../services/lead.service';

@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadController {
  private logger = new Logger(LeadController.name);

  constructor(private readonly leadService: LeadService) {}

  @Get('/')
  async getLeads(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterLeadDto,
  ): Promise<BaseApiSuccessResponse<LeadResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving all leads. Query: ${JSON.stringify(
        dto,
      )}`,
    );

    const leads = await this.leadService.getLeads(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of leads`,
      totalRecords: leads.length,
      data: leads,
    };
  }

  @Get('/:id')
  async getLead(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<LeadResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving lead details. Id: ${id}`,
    );

    const lead = await this.leadService.getLead(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of lead of id: ${id}`,
      data: lead,
    };
  }

  @Post('/')
  async createLead(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateLeadDto,
  ): Promise<BaseApiSuccessResponse<LeadResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new lead. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const lead = await this.leadService.createLead(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New lead of id: ${lead.id} created`,
      data: lead,
    };
  }

  @Put('/:id')
  async updateLead(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateLeadDto,
  ): Promise<BaseApiSuccessResponse<LeadResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating a lead. Id ${id}`);

    const lead = await this.leadService.updateLead(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Lead of id "${id}" updated`,
      data: lead,
    };
  }

  @Delete('/:id')
  async deleteLead(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<LeadResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" deleting a lead. Id: ${id}`);

    const lead = await this.leadService.deleteLead(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Lead of id "${id}" deleted`,
      data: lead,
    };
  }
}
