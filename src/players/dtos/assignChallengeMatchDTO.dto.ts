import { IsNotEmpty } from 'class-validator';
import { Player } from '../interfaces/Player.interface';
import { Result } from 'src/challenges/interfaces/challenge.interface';

export class AssignChallengeMatchDTO {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  result: Array<Result>;
}
