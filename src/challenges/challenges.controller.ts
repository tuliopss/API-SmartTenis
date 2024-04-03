import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDTO } from './dtos/CreateChallenge.dto';
import { Challenge } from './interfaces/challenge.interface';
import { UpdateChallengeDTO } from './dtos/updateChallenge.dto';
import { ChallengeValidationPipe } from './pipes/challengeValidationsPipe.pipe';
import { AssignChallengeMatchDTO } from 'src/players/dtos/assignChallengeMatchDTO.dto';

@Controller('api/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(
    @Body() createChallengeDTO: CreateChallengeDTO,
  ): Promise<Challenge> {
    return await this.challengesService.createChallenge(createChallengeDTO);
  }

  @Get()
  async getChallenges(): Promise<Challenge[]> {
    return await this.challengesService.getChallenges();
  }

  @Get('/:idPlayer')
  async getChallengesByPlayer(
    @Param('idPlayer') idPlayer: any,
  ): Promise<Challenge[]> {
    return await this.challengesService.getChallengesByPlayer(idPlayer);
  }

  @Patch('/:id')
  async updateChallenge(
    @Param('id') id: string,
    @Body(ChallengeValidationPipe) updateChallengeDTO: UpdateChallengeDTO,
  ): Promise<Challenge> {
    console.log(`controller`);

    return await this.challengesService.updateChallenge(id, updateChallengeDTO);
  }

  @Post('/:idChallenge/match')
  async assignChallengeMatch(
    @Body(ValidationPipe) assignChallengeMatchDTO: AssignChallengeMatchDTO,
    @Param('idChallenge') idChallenge: string,
  ) {
    return await this.challengesService.AssignChallengeMatch(
      idChallenge,
      assignChallengeMatchDTO,
    );
  }
}
