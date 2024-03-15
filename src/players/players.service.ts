import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async getPlayerByEmail(email: string): Promise<Player> {
    const playerFound = await this.players.find(
      (player) => player.email == email,
    );
    if (!playerFound) {
      throw new NotFoundException(`Jogador "${email} não foi encontrado"`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<void> {
    const playerFound = await this.players.find(
      (player) => player.email == email,
    );
    console.log('service email', email);
    console.log('service player', playerFound);
    if (!playerFound) {
      throw new NotFoundException(`Jogador "${email} não foi encontrado"`);
    }

    this.players = this.players.filter(
      (player) => player.email != playerFound.email,
    );
  }
}
