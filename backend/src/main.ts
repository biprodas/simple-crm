import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { swaggerInit } from './api-docs.swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/config.type';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app')!;

  const logger = new Logger('Bootstrap Logger');

  const corsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Swagger
  await swaggerInit(app, appConfig.versioning.version);

  // Listen
  await app.listen(appConfig.http.port, appConfig.http.host);

  logger.log(`==================================================`);

  logger.log(`Job is ${appConfig.jobEnable}`);
  logger.log(
    `Http is ${appConfig.http.enable ? '' : 'not'} enabled, ${
      appConfig.http.enable ? 'Routes registered' : 'No routes registered'
    }`,
  );
  logger.log(
    `Http versioning is ${!appConfig.versioning.enable || 'not'} enabled`,
  );

  logger.log(`Http Server running on ${await app.getUrl()}`);

  logger.log(`==================================================`);

  return app;
}

bootstrap();
