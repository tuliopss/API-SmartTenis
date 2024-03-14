import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Player } from './interfaces/Player.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const { email } = createPlayerDTO;

    const playerFound = await this.players.find(
      (player) => player.email == email,
    );

    if (playerFound) return this.update(playerFound, createPlayerDTO);

    this.create(createPlayerDTO);
  }

  private create(createPlayerDTO: CreatePlayerDTO): void {
    const { name, email, phone } = createPlayerDTO;

    const player: Player = {
      _id: uuidv4(),
      name,
      email,
      phone,
      ranking: 'A',
      posicaoRanking: 1,
      urlPhoto: '',
    };

    this.players.push(player);
  }

  private update(playerFound: Player, createPlayerDTO: CreatePlayerDTO): void {
    const { name } = createPlayerDTO;

    playerFound.name = name;
  }

  async getPlayers(): Promise<Player[]> {
    return await this.players;
  }
}
