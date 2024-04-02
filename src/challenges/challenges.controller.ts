import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDTO } from './dtos/CreateChallenge.dto';

@Controller('api/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() createChallengeDTO: CreateChallengeDTO) {
    return await this.challengesService.createChallenge(createChallengeDTO);
  }
}
