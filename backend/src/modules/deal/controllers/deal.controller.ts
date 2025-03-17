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
  DealResponseDto,
  CreateDealDto,
  FilterDealDto,
  UpdateDealDto,
} from '../dtos';
import { DealService } from '../services/deal.service';

@UseGuards(JwtAuthGuard)
@Controller('deals')
export class DealController {
  private logger = new Logger(DealController.name);

  constructor(private readonly dealService: DealService) {}

  @Get('/')
  async getDeals(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterDealDto,
  ): Promise<BaseApiSuccessResponse<DealResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving all deals. Query: ${JSON.stringify(
        dto,
      )}`,
    );

    const deals = await this.dealService.getDeals(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of deals`,
      totalRecords: deals.length,
      data: deals,
    };
  }

  @Get('/:id')
  async getDeal(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<DealResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving deal details. Id: ${id}`,
    );

    const deal = await this.dealService.getDeal(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of deal of id: ${id}`,
      data: deal,
    };
  }

  @Post('/')
  async createDeal(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateDealDto,
  ): Promise<BaseApiSuccessResponse<DealResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new deal. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const deal = await this.dealService.createDeal(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New deal of id: ${deal.id} created`,
      data: deal,
    };
  }

  @Put('/:id')
  async updateDeal(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDealDto,
  ): Promise<BaseApiSuccessResponse<DealResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating a deal. Id ${id}`);

    const deal = await this.dealService.updateDeal(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Deal of id "${id}" updated`,
      data: deal,
    };
  }

  @Delete('/:id')
  async deleteDeal(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<DealResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" deleting a deal. Id: ${id}`);

    const deal = await this.dealService.deleteDeal(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Deal of id "${id}" deleted`,
      data: deal,
    };
  }
}
