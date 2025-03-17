import { JwtAuthGuard, JwtRefreshGuard } from '@admin/auth/guards';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthTokenResponseDto } from '../dtos/auth-token-response.dto';
import { CreateRefreshTokenDto } from '../dtos/create-rtoken.dto';
import { FilterRefreshTokenDto } from '../dtos/filter-rtoken.dto';
import { RefreshTokenDto } from '../dtos/rtoken.dto';
import { RefreshTokenResponseDto } from '../dtos/rtoken-response.dto';
import { TokenRefreshRequestDto } from '../dtos/token-refresh-request.dto';
import { UpdateRefreshTokenDto } from '../dtos/update-rtoken.dto';
import { SecurityScheme } from '../enums/auth-sceme.type';
import { TokenGenerateBy } from '../enums/token-generate-by.enum';
import { RevokeGrant } from '../enums/revoke-grant.enum';
import { TokenType } from '../enums/token-type.enum';
import { TokenService } from '../services/token.service';

@Controller('tokens')
export class TokenController {
  private logger = new Logger(TokenController.name);

  constructor(private tokenService: TokenService) {}

  @Get('/')
  async getTokens(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterTokenDto: FilterRefreshTokenDto,
  ): Promise<BaseApiSuccessResponse<RefreshTokenDto[]>> {
    this.logger.verbose(
      `User "Unknown" retieving all tokens. Query: ${JSON.stringify(
        filterTokenDto,
      )}`,
    );

    const rtokens = await this.tokenService.getTokens(ctx, filterTokenDto);

    return {
      success: true,
      statusCode: ``,
      message: `List of tokens`,
      data: rtokens,
    };
  }

  @Get('/:id')
  async getToken(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) tokenId: string,
  ): Promise<BaseApiSuccessResponse<RefreshTokenDto>> {
    this.logger.verbose(
      `User "Unknown" retieving refresh token details of id: ${tokenId}`,
    );

    const token = await this.tokenService.getToken(ctx, tokenId);

    return {
      success: true,
      statusCode: ``,
      message: `Details of token of id ${token.id}`,
      data: token,
    };
  }

  @Post('/')
  async createToken(
    @RequestContext() ctx: RequestContextDto,
    @Body() createTokenDto: CreateRefreshTokenDto,
  ): Promise<BaseApiSuccessResponse<RefreshTokenDto>> {
    this.logger.verbose(
      `User "Unknown" creating a new refresh token. Data: ${JSON.stringify(
        createTokenDto,
      )}`,
    );

    const rtoken = await this.tokenService.createToken(ctx, createTokenDto);

    return {
      success: true,
      statusCode: ``,
      message: `New refresh token of id: ${rtoken.id} created`,
      data: rtoken,
    };
  }

  @Put('/:id')
  async updateToken(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) tokenId: string,
    @Body() updateTokenDto: UpdateRefreshTokenDto,
  ): Promise<BaseApiSuccessResponse<RefreshTokenDto>> {
    this.logger.verbose(
      `User "Unknown" updating token of id #${tokenId}. Data: ${JSON.stringify(
        updateTokenDto,
      )}`,
    );

    const token = await this.tokenService.updateToken(
      ctx,
      tokenId,
      updateTokenDto,
    );

    return {
      success: true,
      statusCode: ``,
      message: `Token of id ${token.id} updated`,
      data: token,
    };
  }

  @Put('/update/many')
  async updateManyToken(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterTokenDto: FilterRefreshTokenDto,
    @Body() updateTokenDto: UpdateRefreshTokenDto,
  ) {
    const tokens = await this.tokenService.updateManyToken(
      ctx,
      filterTokenDto,
      updateTokenDto,
    );

    return {
      success: true,
      statusCode: ``,
      message: `Tokens updated`,
      data: tokens,
    };
  }

  @Delete('/:id')
  async deleteToken(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) tokenId: string,
  ): Promise<BaseApiSuccessResponse<RefreshTokenDto>> {
    this.logger.verbose(`User "Unknown" deleting a token. of id: ${tokenId}`);

    const token = await this.tokenService.deleteToken(ctx, tokenId);

    return {
      success: true,
      statusCode: '',
      message: `Token of id ${token.id} deleted`,
      data: token,
    };
  }

  // move to authController

  // Refresh refresh and access token:
  // 1. get refreshtoken from body or cookie
  // 2. get refresh token instance from db
  // 3. replace old refreshtoken with new one / revoke old refresh token and generate new refresh token
  // 4. generate new access token from new refresh token
  @Patch('/refresh')
  @ApiOperation({ summary: 'Refresh access token API' })
  @ApiResponse({
    status: HttpStatus.OK,
    // type: SwaggerBaseApiResponse(AuthTokenOutput),
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    // type: BaseApiErrorResponse,
  })
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtRefreshGuard)
  async refreshToken(
    @RequestContext() ctx: RequestContextDto,
    @Body() tokenRefreshRequestDto: TokenRefreshRequestDto,
  ): Promise<BaseApiSuccessResponse<AuthTokenResponseDto>> {
    this.logger.log(`${this.refreshToken.name} was called`);
    const { refreshToken, refreshAll } = tokenRefreshRequestDto;
    // const authToken = await this.authService.refreshToken(ctx);

    // cookie te set korte hobe
    const accessToken =
      await this.tokenService.createAccessTokenFromRefreshToken(
        ctx,
        refreshToken,
      );

    const tokenPaylod: AuthTokenResponseDto = {
      type: SecurityScheme.Bearer,
      [TokenType.AccessToken]: accessToken,
      [TokenType.RefreshToken]: refreshToken,
    };

    return {
      success: true,
      statusCode: '',
      message: ``,
      data: tokenPaylod,
    };
  }

  @Patch('/revoke')
  revokeToken(@Body('refreshToken') refreshToken: string) {
    // Revoke refresh token:
    // 1. accept token from request body or cookie
    // 2. users can revoke their own tokens and admins can revoke any tokens
    // 3. get refresh token instance from db
    // 4. revoke the token
    // return this.tokenService.revokeRefreshToken(refreshToken, reqIp);
  }

  // @Patch('/refresh/:id')
  // async refreshRefreshToken(
  //   @Param('id', ParseUUIDPipe) rtokenId: string,
  //   @Body() refreshRefreshTokenDto: RefreshRefreshTokenDto
  // ): Promise<BaseApiSuccessResponse<RefreshTokenResponseDto>> {
  //   this.logger.verbose(`User "Unknown" refreshing refresh token of id #${rtokenId}. Data: ${JSON.stringify(refreshRefreshTokenDto)}`);

  //   const rtoken = await this.rtokenService.refreshRefreshToken(rtokenId, refreshRefreshTokenDto);

  //   return {
  //     success: true,
  //     statusCode: ``,
  //     message: `Refresh token of id ${rtoken.id} revoked`,
  //     data: rtoken
  //   }
  // }

  // @Patch('/revoke/:id')
  // async revokeRefreshToken(
  //   @Param('id', ParseUUIDPipe) rtokenId: string,
  //   @Body() revokeRefreshTokenDto: RevokeRefreshTokenDto
  // ): Promise<BaseApiSuccessResponse<RefreshTokenResponseDto>> {
  //   this.logger.verbose(`User "Unknown" revoking refresh token of id #${rtokenId}. Data: ${JSON.stringify(revokeRefreshTokenDto)}`);

  //   const rtoken = await this.rtokenService.revokeRefreshToken(rtokenId, revokeRefreshTokenDto);

  //   return {
  //     success: true,
  //     statusCode: ``,
  //     message: `Refresh token of id ${rtoken.id} revoked`,
  //     data: rtoken
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/test/token-service')
  async tokenServiceTest(@RequestContext() ctx: RequestContextDto) {
    const input = {
      revokeFor: RevokeGrant.One,
      generateBy: TokenGenerateBy.RefreshToken,
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzgzNTk3MDgsImV4cCI6MTYzODk2NDUwOCwiYXVkIjoiYmlwcm8xMGNzZUBnbWFpbC5jb20iLCJpc3MiOiJiaXByb2Rhcy5jc2VAZ21haWwuY29tIiwic3ViIjoiYjJlYWJlNGMtZjAzNC00N2RjLTlmYmYtMzgyN2RlMjJiNmUzIiwianRpIjoiYzgxODY3MDctZmM4Zi00NzYyLTg1NTMtYmJhYTFiNDk0NjJkIn0.bqsOn8OpDNnagl4zekJ5dltrFyprl57OXHJBbd9GS1Q',
    };

    return this.tokenService.getAuthToken(ctx, input);
  }
}
