import { PlayersService } from 'src/players/players.service';
import { CreateChallengeDTO } from './dtos/CreateChallenge.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Challenge } from './interfaces/challenge.interface';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { ChallengeStatus } from './enums/challengeStatus.enum';
import { UpdateChallengeDTO } from './dtos/updateChallenge.dto';

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

    const playerCategory = await this.categoriesService.getPlayerCategory(
      createChallengeDTO.requester,
    );

    if (!playerCategory) {
      throw new BadRequestException(
        `Requester must be registred in a category`,
      );
    }

    const challengeCreated = new this.challengeModel(createChallengeDTO);
    challengeCreated.category = playerCategory.category;
    challengeCreated.dateHourRequest = new Date();

    challengeCreated.status = ChallengeStatus.PENDING;
    return await challengeCreated.save();
  }

  async getChallenges(): Promise<Challenge[]> {
    return await this.challengeModel
      .find()
      .populate([{ path: 'players', model: 'player' }])
      .populate({ path: 'requester', model: 'player' });
  }

  async getChallengesByPlayer(idPlayer: any): Promise<Challenge[]> {
    await this.playersService.getPlayerById(idPlayer);

    return await this.challengeModel
      .find()
      .where('players')
      .in(idPlayer)
      .populate([{ path: 'players', model: 'player' }])
      .populate({ path: 'requester', model: 'player' });
  }

  async updateChallenge(
    id: string,
    updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<Challenge> {
    const challenge = await this.challengeModel.findById(id);

    if (!challenge) {
      throw new BadRequestException('Challenge not found');
    }

    if (updateChallengeDTO.status) {
      challenge.dateHourResponse = new Date();
    }

    challenge.status = updateChallengeDTO.status;
    console.log(challenge.status);
    challenge.dateHourChallenge = updateChallengeDTO.dateHourChallenge;
    console.log(challenge);
    return await this.challengeModel.findOneAndUpdate(
      { _id: id },
      { $set: challenge },
    );
  }
}
