import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';
import { Player } from 'src/players/interfaces/Player.interface';

export class CreateChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  dateHourChallenge: Date;

  @IsNotEmpty()
  requester: Player;

  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  players: Array<Player>;
}
