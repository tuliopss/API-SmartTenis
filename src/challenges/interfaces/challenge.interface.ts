import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/Player.interface';

export interface Challenge extends Document {
  dateHourChallenge: Date;
  dateHourRequest: Date;
  requester: Player;
  category: string;
  players: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: String;
  players: Array<Player>;
  challenger: Player;
  result: Array<Result>;
}

export interface Result {
  set: String;
}
