import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Stolen Bike Cases')
    .setDescription('The Stolen Bike Cases API description')
    .setVersion('2.0')
    // .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
