import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { ModulesController } from './book.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [ModulesController],
  providers: [BookService, PrismaService],
})
export class ModulesModule {}
