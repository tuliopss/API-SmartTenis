import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDTO } from './dtos/CreateChallenge.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('challenge') private readonly challengeModel: Model<Challenge>,
    private readonly categoriesService: CategoriesService,
    private readonly playersService: PlayersService,
  ) {}

  async createChallenge(
    createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    const players = await this.playersService.getPlayers();

    createChallengeDTO.players.map((playerDTO) => {
      const playerFilter = players.filter(
        (player) => player._id == playerDTO._id,
      );

      if (playerFilter.length === 0) {
        throw new BadRequestException(
          `The id ${playerDTO._id} its not a player`,
        );
      }
    });

    const requesterIsMatchPlayer = await createChallengeDTO.players.filter(
      (player) => player._id == createChallengeDTO.requester,
    );

    console.log(requesterIsMatchPlayer);
    if (requesterIsMatchPlayer.length == 0) {
      throw new BadRequestException(`Requester must be a match player`);
    }

    // const playerCategory = await this.categoriesService.getCategoryById(
    //   createChallengeDTO.requester,
    // );

    return;
  }
}
