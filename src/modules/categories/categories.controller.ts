import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { CategoryCreateInput } from './categories.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post('create')
  async createCategorie(@Body() data: CategoryCreateInput) {
    if (data.id) {
      throw new BadRequestException('Post não autorizado.');
    }

    if (data.parentId) {
      const existParentId = await this.categoriesService.findById(
        data.parentId,
      );

      if (!existParentId) {
        throw new BadRequestException('Categoria pai não existe');
      }
    }

    return await this.categoriesService.createCategory(data);
  }

  @Get()
  async getAllCategories() {
    return await this.categoriesService.getAll();
  }

  @Get('category')
  async getCategory(@Query() data: { query: string }) {
    return await this.categoriesService.findCategoryById(data.query);
  }
}
