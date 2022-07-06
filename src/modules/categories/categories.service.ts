import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    const categories = await this.prismaService.category.findMany();

    if (categories.length > 0) {
      const getTree = (arr, p = 'parentId') =>
        arr.reduce((o, n) => {
          if (!o[n.id]) o[n.id] = {};
          if (!o[n[p]]) o[n[p]] = {};
          if (!o[n[p]].children) o[n[p]].children = [];
          if (o[n.id].children) n.children = o[n.id].children;
          o[n[p]].children.push(n);
          o[n.id] = n;
          return o;
        }, {});

      const myTree = getTree(categories)[0].children;

      return myTree;
    }

    return [];
  }

  async findById(id: number) {
    return this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
  }

  async findCategoryById(id: string) {
    const categoryExist = await this.prismaService.category.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!categoryExist || isNaN(Number(id))) {
      throw new BadRequestException('Categoria inválida');
    }

    const AllList = await this.getAll();

    const filteredList = AllList.filter(
      (item) => Number(item.id) === Number(id),
    );

    return filteredList;
  }

  async createCategory(data: Prisma.CategoryCreateInput) {
    return await this.prismaService.category.create({
      data,
    });
  }
}
