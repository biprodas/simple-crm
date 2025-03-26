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
  CredentialResponseDto,
  CreateCredentialDto,
  FilterCredentialDto,
  UpdateCredentialDto,
} from '../dtos';
import { CredentialService } from '../services/credential.service';

@UseGuards(JwtAuthGuard)
@Controller('credentials')
export class CredentialController {
  private logger = new Logger(CredentialController.name);

  constructor(private readonly credentialService: CredentialService) {}

  @Get('/')
  async getCredentials(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterCredentialDto,
  ): Promise<BaseApiSuccessResponse<CredentialResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving all credentials. Query: ${JSON.stringify(
        dto,
      )}`,
    );

    const credentials = await this.credentialService.getCredentials(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of credentials`,
      totalRecords: credentials.length,
      data: credentials,
    };
  }

  @Get('/:id')
  async getCredential(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CredentialResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving credential details. Id: ${id}`,
    );

    const credential = await this.credentialService.getCredential(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of credential of id: ${id}`,
      data: credential,
    };
  }

  @Post('/')
  async createCredential(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateCredentialDto,
  ): Promise<BaseApiSuccessResponse<CredentialResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new credential. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const credential = await this.credentialService.createCredential(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New credential of id: ${credential.id} created`,
      data: credential,
    };
  }

  @Put('/:id')
  async updateCredential(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCredentialDto,
  ): Promise<BaseApiSuccessResponse<CredentialResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating a credential. Id ${id}`);

    const credential = await this.credentialService.updateCredential(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Credential of id "${id}" updated`,
      data: credential,
    };
  }

  @Delete('/:id')
  async deleteCredential(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CredentialResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" deleting a credential. Id: ${id}`);

    const credential = await this.credentialService.deleteCredential(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Credential of id "${id}" deleted`,
      data: credential,
    };
  }
}
