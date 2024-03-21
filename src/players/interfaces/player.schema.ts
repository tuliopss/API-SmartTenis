import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema(
  {
    phone: { type: String, unique: true },
    name: { type: String },
    email: { type: String, unique: true },
    ranking: { type: String },
    positionRanking: { type: Number },
    urlPhoto: { type: String },
  },
  { timestamps: true, collection: 'players' },
);
