import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import LoggerServiceAdapter from './logger/logger.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(LoggerServiceAdapter));

  await app.listen(3000);
}
bootstrap();
