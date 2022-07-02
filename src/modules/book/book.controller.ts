import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BookService } from './book.service';

@Controller('book')
export class ModulesController {
  constructor(private readonly BookService: BookService) {}

  @Post()
  async create(@Body() data: Prisma.BookCreateInput) {
    return this.BookService.create(data);
  }

  @Get()
  async findAll() {
    return this.BookService.findAll();
  }

  @Put()
  async put(@Body() data: Prisma.BookCreateInput) {
    return this.BookService.update(data);
  }

  @Delete()
  async delete(@Body() data: Prisma.BookCreateInput) {
    return this.BookService.delete(data);
  }
}
