import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema(
  {
    dateHourChallenge: { type: Date },
    dateHourRequest: { type: Date },
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    category: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],

    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    status: { type: String },
  },
  { timestamps: true, collection: 'challenges' },
);
