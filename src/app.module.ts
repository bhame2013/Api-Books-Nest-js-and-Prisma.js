import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { PrismaService } from './prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CategoriesModule,
    PrismaService,
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
