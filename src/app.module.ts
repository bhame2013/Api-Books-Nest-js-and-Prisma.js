import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/book/book.module';

@Module({
  imports: [ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
