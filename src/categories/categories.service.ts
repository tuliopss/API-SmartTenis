import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dtos/CreateCategoryDTO.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditCategoryDTO } from './dtos/EditCategoryDTO.dto';
import { PlayersService } from 'src/players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const { category } = createCategoryDTO;

    const categoryFound = await this.categoryModel.findOne({
      category: category,
    });

    if (categoryFound) {
      throw new BadRequestException(`Category ${category} already registred`);
    }

    const categoryCreated = new this.categoryModel(createCategoryDTO);
    return await categoryCreated.save();
  }

  async getCategories(): Promise<Array<Category>> {
    return await this.categoryModel
      .find()
      .populate([{ path: 'players', model: 'player' }])
      .exec();
  }

  async getCategoryById(category: string): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({
      category: category,
    });

    if (!categoryFound) {
      throw new BadRequestException(`Category ${category} not found`);
    }

    return categoryFound;
  }

  async updateCategory(
    category: string,
    editCategoryDTO: EditCategoryDTO,
  ): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({
      category: category,
    });

    if (!categoryFound) {
      throw new BadRequestException(`Category ${category} not found`);
    }

    return await this.categoryModel.findOneAndUpdate(
      { category: category },
      { $set: editCategoryDTO },
    );
  }

  async assignPlayerCategory(params: string[]): Promise<void> {
    const category = params['category'];
    const playerID = params['playerID'];

    const categoryFound = await this.categoryModel.findOne({
      category: category,
    });

    await this.playersService.getPlayerById(playerID);

    const playerAlreadyRegistredCategory = await this.categoryModel
      .find({ category: category })
      .where('players')
      .in(playerID);

    if (!categoryFound) {
      throw new BadRequestException(`Category ${category} not found`);
    }

    if (playerAlreadyRegistredCategory.length > 0) {
      throw new BadRequestException(
        `Player already registred in category ${category}`,
      );
    }

    categoryFound.players.push(playerID);

    await this.categoryModel.findOneAndUpdate(
      { category: category },
      { $set: categoryFound },
    );
  }
}
