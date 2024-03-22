import { PlayersService } from './players.service';
import { CreatePlayerDTO } from './dtos/createPlayerDTO.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Player } from './interfaces/Player.interface';
import { PlayersValidationsParamsPipe } from './pipes/playersValidationsParams.pipe';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    await this.playersService.createPlayer(createPlayerDTO);
  }

  @Patch('/:id')
  async updatePlayer(
    @Body() createPlayerDTO: CreatePlayerDTO,
    @Param('id', PlayersValidationsParamsPipe) id: string,
  ) {
    console.log('controller', createPlayerDTO);
    return await this.playersService.updatePlayer(id, createPlayerDTO);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return await this.playersService.getPlayers();
  }

  @Get('/:id')
  async getPlayerById(
    @Param('id', PlayersValidationsParamsPipe) id: string,
  ): Promise<Player> {
    return await this.playersService.getPlayerById(id);
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', PlayersValidationsParamsPipe) id: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(id);
  }
}
