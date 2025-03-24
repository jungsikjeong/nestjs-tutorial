import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO(Data Transfer Object)에 정의되지 않은 속성을 자동으로 제거하는 기능을 활성화
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
