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
  ContactResponseDto,
  CreateContactDto,
  FilterContactDto,
  UpdateContactDto,
} from '../dtos';
import { ContactService } from '../services/contact.service';

@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactController {
  private logger = new Logger(ContactController.name);

  constructor(private readonly contactService: ContactService) {}

  @Get('/')
  async getContacts(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterContactDto,
  ): Promise<BaseApiSuccessResponse<ContactResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all contacts. Query: ${JSON.stringify(dto)}`,
    );

    const contacts = await this.contactService.getContacts(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of contacts`,
      totalRecords: contacts.length,
      data: contacts,
    };
  }

  @Get('/:id')
  async getContact(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ContactResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving contact details. Id: ${id}`,
    );

    const contact = await this.contactService.getContact(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of contact of id: ${id}`,
      data: contact,
    };
  }

  @Post('/')
  async createContact(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateContactDto,
  ): Promise<BaseApiSuccessResponse<ContactResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new contact. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const contact = await this.contactService.createContact(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New contact of id: ${contact.id} created`,
      data: contact,
    };
  }

  @Put('/:id')
  async updateContact(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateContactDto,
  ): Promise<BaseApiSuccessResponse<ContactResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a contact. Id ${id}`,
    );

    const contact = await this.contactService.updateContact(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Contact of id "${id}" updated`,
      data: contact,
    };
  }

  @Delete('/:id')
  async deleteContact(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ContactResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a contact. Id: ${id}`,
    );

    const contact = await this.contactService.deleteContact(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Contact of id "${id}" deleted`,
      data: contact,
    };
  }
}
