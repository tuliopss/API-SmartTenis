import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Player } from './interfaces/Player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { log } from 'console';
@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}

  async createPlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;
    const playerFound = await this.playerModel.findOne({ email: email });

    if (playerFound) {
      throw new BadRequestException(
        `Player with email: ${email} already registred`,
      );
    }

    const playerCreated = new this.playerModel(createPlayerDTO);
    return await playerCreated.save();
  }

  async updatePlayer(
    id: string,
    createPlayerDTO: CreatePlayerDTO,
  ): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id: id });

    if (!playerFound) {
      throw new NotFoundException(`Player with ID "${id} not found`);
    }

    return await this.playerModel.findOneAndUpdate(
      { _id: id },
      { $set: createPlayerDTO },
    );
  }

  // const { name, email, phone } = createPlayerDTO;

  // const player: Player = {
  //   _id: uuidv4(),
  //   name,
  //   email,
  //   phone,
  //   ranking: 'A',
  //   posicaoRanking: 1,
  //   urlPhoto: '',
  // };

  // this.players.push(player);

  // private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
  //   console.log('service', createPlayerDTO);

  // }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerById(id: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id: id });
    if (!playerFound) {
      throw new NotFoundException(`Jogador "${id} não foi encontrado"`);
    }
    return playerFound;
  }

  async deletePlayer(id: string): Promise<void> {
    // const playerFound = await this.playerModel.findOne({ email: email });

    // if (!playerFound) {
    //   throw new NotFoundException(`Jogador "${email} não foi encontrado"`);
    // }

    await this.playerModel.findOneAndDelete({ _id: id });
    // await this.playerModel.findOneAndDelete({ email: playerFound.email });
  }
}
