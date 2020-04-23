import * as dotenv from 'dotenv';               // caution: place dotenv always on top of this file
dotenv.config();                                 // do not comment or change this line

// import in built dependencies
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import local dependencies required
import { AppModule } from './app.module';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  // nest instance init with app module
  const app = await NestFactory.create(AppModule);

  // make validation global for app routes
  app.useGlobalPipes(new ValidationPipe());

  // swagger init
  const options = new DocumentBuilder()
    .setTitle('Stolen Bike Cases')
    .setDescription('The Stolen Bike Cases API description')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
