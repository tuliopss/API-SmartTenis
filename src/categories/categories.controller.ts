import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/CreateCategoryDTO.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoryService.createCategory(createCategoryDTO);
  }

  @Get()
  async getCategories(): Promise<Array<Category>> {
    return await this.categoryService.getCategories();
  }
}
