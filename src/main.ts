import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

// Module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle(' APY')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag(' API')
    .addServer(`http://localhost:${configService.get('APP_PORT')}`, 'Local server')
    .addServer('https://example.com', 'Production server')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(configService.get('APP_PORT') || 3001);
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
