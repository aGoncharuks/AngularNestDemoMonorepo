/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: environment.CLIENT_ORIGIN,
      maxAge: 7200
    }
  });
  const port = process.env.PORT || 3333;
  await app.listen(port, () => {
    Logger.log(`Listening...`);
  });
}

bootstrap();
