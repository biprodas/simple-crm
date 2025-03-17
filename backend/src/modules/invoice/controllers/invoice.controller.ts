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
  InvoiceResponseDto,
  CreateInvoiceDto,
  FilterInvoiceDto,
  UpdateInvoiceDto,
} from '../dtos';
import { InvoiceService } from '../services/invoice.service';

@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoiceController {
  private logger = new Logger(InvoiceController.name);

  constructor(private readonly universityService: InvoiceService) {}

  @Get('/')
  async getUniversities(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterInvoiceDto,
  ): Promise<BaseApiSuccessResponse<InvoiceResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all invoices. Query: ${JSON.stringify(dto)}`,
    );

    const invoices = await this.universityService.getUniversities(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of invoices`,
      totalRecords: invoices.length,
      data: invoices,
    };
  }

  @Get('/:id')
  async getInvoice(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<InvoiceResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving university details. Id: ${id}`,
    );

    const university = await this.universityService.getInvoice(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of university of id: ${id}`,
      data: university,
    };
  }

  @Post('/')
  async createInvoice(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateInvoiceDto,
  ): Promise<BaseApiSuccessResponse<InvoiceResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" creating new university. Data: ${JSON.stringify(dto)}`,
    );

    const university = await this.universityService.createInvoice(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New university of id: ${university.id} created`,
      data: university,
    };
  }

  @Put('/:id')
  async updateInvoice(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateInvoiceDto,
  ): Promise<BaseApiSuccessResponse<InvoiceResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a university. Id ${id}`,
    );

    const university = await this.universityService.updateInvoice(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Invoice of id "${id}" updated`,
      data: university,
    };
  }

  @Delete('/:id')
  async deleteInvoice(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<InvoiceResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a university. Id: ${id}`,
    );

    const university = await this.universityService.deleteInvoice(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Invoice of id "${id}" deleted`,
      data: university,
    };
  }
}
