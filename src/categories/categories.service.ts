import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dtos/CreateCategoryDTO.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const { category } = createCategoryDTO;

    const categoryFound = await this.categoryModel.findOne({
      category: category,
    });

    if (categoryFound) {
      throw new BadRequestException(`Category already registred`);
    }

    const categoryCreated = new this.categoryModel(createCategoryDTO);
    return await categoryCreated.save();
  }
}
