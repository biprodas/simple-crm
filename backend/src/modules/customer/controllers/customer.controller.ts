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
  CustomerResponseDto,
  CreateCustomerDto,
  FilterCustomerDto,
  UpdateCustomerDto,
} from '../dtos';
import { CustomerService } from '../services/customer.service';

@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerController {
  private logger = new Logger(CustomerController.name);

  constructor(private readonly customerService: CustomerService) {}

  @Get('/')
  async getCustomers(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterCustomerDto,
  ): Promise<BaseApiSuccessResponse<CustomerResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all customers. Query: ${JSON.stringify(dto)}`,
    );

    const customers = await this.customerService.getCustomers(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of customers`,
      totalRecords: customers.length,
      data: customers,
    };
  }

  @Get('/:id')
  async getCustomer(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CustomerResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving customer details. Id: ${id}`,
    );

    const customer = await this.customerService.getCustomer(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of customer of id: ${id}`,
      data: customer,
    };
  }

  @Post('/')
  async createCustomer(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateCustomerDto,
  ): Promise<BaseApiSuccessResponse<CustomerResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new customer. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const customer = await this.customerService.createCustomer(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New customer of id: ${customer.id} created`,
      data: customer,
    };
  }

  @Put('/:id')
  async updateCustomer(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<BaseApiSuccessResponse<CustomerResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a customer. Id ${id}`,
    );

    const customer = await this.customerService.updateCustomer(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Customer of id "${id}" updated`,
      data: customer,
    };
  }

  @Delete('/:id')
  async deleteCustomer(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CustomerResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a customer. Id: ${id}`,
    );

    const customer = await this.customerService.deleteCustomer(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Customer of id "${id}" deleted`,
      data: customer,
    };
  }
}
