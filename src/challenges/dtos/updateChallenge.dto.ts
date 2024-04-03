import { IsOptional } from 'class-validator';
import { ChallengeStatus } from '../enums/challengeStatus.enum';

export class UpdateChallengeDTO {
  @IsOptional()
  //@IsDate()
  dateHourChallenge: Date;

  @IsOptional()
  status: ChallengeStatus;
}
