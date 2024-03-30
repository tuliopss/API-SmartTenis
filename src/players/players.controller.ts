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
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Player } from './interfaces/Player.interface';
import { validationsParamsPipe } from '../common/pipes/validationsParams.pipe';
import { EditPlayerDTO } from './dtos/editPlayerDTO.dto';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
    return await this.playersService.createPlayer(createPlayerDTO);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Body() editPlayerDTO: EditPlayerDTO,
    @Param('id', validationsParamsPipe) id: string,
  ) {
    console.log('controller', editPlayerDTO);
    return await this.playersService.updatePlayer(id, editPlayerDTO);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return await this.playersService.getPlayers();
  }

  @Get('/:id')
  async getPlayerById(
    @Param('id', validationsParamsPipe) id: string,
  ): Promise<Player> {
    return await this.playersService.getPlayerById(id);
  }

  @Delete('/:id')
  async deletePlayer(
    @Param('id', validationsParamsPipe) id: string,
  ): Promise<void> {
    return this.playersService.deletePlayer(id);
  }
}
