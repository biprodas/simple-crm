import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerInit(app: INestApplication, apiVersion: string) {
  const config = new DocumentBuilder()
    .setTitle('Simple CRM')
    .setDescription('Backend API for Simple CRM.')
    .setVersion(apiVersion)
    .addTag('crm')
    .addBearerAuth()
    .addCookieAuth('access_token', { type: 'apiKey', in: 'cookie' })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const path = `api/v${apiVersion}/docs`;
  SwaggerModule.setup(path, app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(
    `Documentation: http://${process.env.HTTP_HOST}:${process.env.HTTP_PORT}/${process.env.HTTP_API_PREFIX}/v${apiVersion}/docs`,
  );
}
