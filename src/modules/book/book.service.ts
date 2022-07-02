import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BookCreateInput) {
    const bookExist = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code,
      },
    });

    if (bookExist) {
      throw new BadRequestException('Livro já existente');
    }

    const book = await this.prisma.book.create({
      data,
    });

    return book;
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async update(data: Prisma.BookCreateInput) {
    if (data.id) {
      const { id, title, description } = data;
      const bookExists = await this.prisma.book.findUnique({
        where: {
          id,
        },
      });

      if (!bookExists) {
        throw new BadRequestException('Livro nao existe');
      }

      console.log(!title);

      if (!title || !description) {
        throw new BadRequestException(
          'Por favor valide os campos e tente novamente.',
        );
      }

      return await this.prisma.book.update({
        data,
        where: {
          id,
        },
      });
    }

    throw new BadRequestException('payload inválido.');
  }

  async delete(data: Prisma.BookCreateInput) {
    if (data.id) {
      const { id } = data;

      const bookExists = await this.prisma.book.findUnique({
        where: {
          id,
        },
      });

      if (!bookExists) {
        throw new BadRequestException('Livro nao existe');
      }

      return await this.prisma.book.delete({
        where: {
          id,
        },
      });
    }
  }
}
