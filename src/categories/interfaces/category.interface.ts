import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/Player.interface';

export interface Category extends Document {
  readonly category: string;
  description: string;
  events: Array<Evento>;
  players: Array<Player>;
}

export interface Evento {
  name: string;
  operation: string;
  value: number;
}
