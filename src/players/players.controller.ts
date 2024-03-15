import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Player } from './interfaces/Player.interface';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createUpdatePlayer(createPlayerDTO);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[] | Player> {
    if (email) return await this.playersService.getPlayerByEmail(email);
    return await this.playersService.getPlayers();
  }

  @Delete('/:email')
  async deletePlayer(@Param('email') email: string): Promise<void> {
    console.log('controller', email);
    return this.playersService.deletePlayer(email);
  }
}
