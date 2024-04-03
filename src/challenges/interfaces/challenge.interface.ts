import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/Player.interface';
import { ChallengeStatus } from '../enums/challengeStatus.enum';

export interface Challenge extends Document {
  dateHourChallenge: Date;
  dateHourRequest: Date;
  dateHourResponse: Date;
  requester: Player;
  category: string;
  players: Array<Player>;
  match: Match;
  status: ChallengeStatus;
}

export interface Match extends Document {
  category: String;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: String;
}
