import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Player } from './interfaces/Player.interface';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(createPlayerDTO);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return await this.playersService.getPlayers();
  }
}
