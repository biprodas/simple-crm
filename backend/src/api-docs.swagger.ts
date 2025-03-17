import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerInit(app: INestApplication, apiVersion: string) {
  const options = new DocumentBuilder()
    .setTitle('Simple CRM')
    .setDescription('Backend API for CRM management')
    .setVersion(apiVersion)
    .addTag('simple-crm')
    .addBearerAuth()
    .addCookieAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const path = `api/v${apiVersion}/docs`;
  SwaggerModule.setup(path, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(
    `Documentation: http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}/${process.env.HTTP_API_PREFIX}/v${apiVersion}/docs`,
  );
}
