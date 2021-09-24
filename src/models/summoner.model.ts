import { Schema, model } from 'mongoose';

interface Rank {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

interface Mastery {
  championId: number;
  championLevel: number;
  championPoints: number;
}

interface ISummoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  rank: Rank[];
  mastery: Mastery[];
}

const summonerSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  accountId: {
    type: String,
    required: true,
    unique: true
  },
  puuid: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  profileIconId: {
    type: Number
  },
  revisionDate: {
    type: Number
  },
  summonerLevel: {
    type: Number,
    required: true
  },
  rank: {
    type: Array,
    schema: new Schema ({
      leagueId: {
        type: String,
        required: true
      },
      queueType: {
        type: String,
        required: true
      },
      tier: {
        type: String,
        required: true
      },
      rank: {
        type: String
      },
      leaguePoints: {
        type: Number
      },
      wins: {
        type: Number
      },
      losses: {
        type: Number
      }
    }, { _id: false, versionKey: false })
  },
  mastery: {
    type: Array,
    schema: new Schema ({
      championId: {
        type: Number,
        required: true,
        unique: true
      },
      championLevel: {
        type: Number,
        required: true
      },
      championPoints: {
        type: Number,
        required: true
      }
    }, { _id: false, versionKey: false })
  }
}, { versionKey: false });

const Summoner = model('Summoner', summonerSchema);
export { Summoner, ISummoner, Rank, Mastery };