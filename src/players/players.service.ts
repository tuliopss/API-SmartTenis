import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const { email } = createPlayerDTO;

    // const playerFound = await this.players.find(
    //   (player) => player.email == email,
    // );
    const playerFound = await this.playerModel.findOne({ email: email });

    if (playerFound) return this.update(createPlayerDTO);

    this.create(createPlayerDTO);
  }

  private async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDTO);

    try {
      return await playerCreated.save();
    } catch (error) {
      console.log(error);
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
  }

  private async update(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    try {
      return await this.playerModel.findOneAndUpdate(
        { email: createPlayerDTO.email },
        { $set: createPlayerDTO },
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ email: email });
    if (!playerFound) {
      throw new NotFoundException(`Jogador "${email} não foi encontrado"`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerFound = await this.playerModel.findOne({ email: email });

    if (!playerFound) {
      throw new NotFoundException(`Jogador "${email} não foi encontrado"`);
    }

    await this.playerModel.findOneAndDelete({ email: playerFound.email });
  }
}
