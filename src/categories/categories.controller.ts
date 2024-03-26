import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dtos/CreateCategoryDTO.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { EditCategoryDTO } from './dtos/EditCategoryDTO.dto';

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

  @Get('/:category')
  async getCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoryService.getCategoryById(category);
  }

  @Patch('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() editCategoryDTO: EditCategoryDTO,
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoryService.updateCategory(category, editCategoryDTO);
  }

  @Post('/:category/players/:playerID')
  async assignPlayerCategory(@Param() params: string[]): Promise<void> {
    return await this.categoryService.assignPlayerCategory(params);
  }
}
