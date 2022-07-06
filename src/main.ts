import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  //   {
  //   origin: [
  //     'http://localhost:3030/',
  //     'http://localhost:3030',
  //     'https://codigo-fonte.vercel.app/login/',
  //   ],
  //   methods: ['POST', 'PUT', 'DELETE', 'GET'],
  //   credentials: true,
  // }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
