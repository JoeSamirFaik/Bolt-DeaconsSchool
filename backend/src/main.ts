import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });
  
  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe());
  
  // Set global prefix
  app.setGlobalPrefix('api');
  
  await app.listen(3001);
  console.log('🚀 Backend server is running on http://localhost:3001');
}
bootstrap();