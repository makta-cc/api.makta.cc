import { Schema, model } from 'mongoose'

interface MatchInfo {
  gameCreation: number;
  gameDuration: number;
  gameId: number;
  gameMode: string;
  participants: {
    summonerName: string;
    teamPosition: string;
    championId: number;
    champLevel: number;
    goldEarned: number;
    item0: number;
    item1: number;
    item2: number;
    item3: number;
    item4: number;
    item5: number;
    item6: number;
    summoner1Id: number;
    summoner2Id: number;
    perks: {
      statPerks: {
        defense: number;
        flex: number;
        offense: number;
      },
      styles: {
        description: string;
        selections: {
          perk: number;
          var1: number;
          var2: number;
          var3: number;
        }[];
        style: number;
      }[]
    };
    kills: number;
    deaths: number;
    assists: number;
    totalDamageDealtToChampions: number;
    teamId: number;
  }[];
  teams: {
    bans: {
      championId: number;
      pickTurn: number;
    }[];
    objectives: {
      baron: {
        first: boolean;
        kills: number;
      };
      champion: {
        first: boolean;
        kills: number;
      };
      dragon: {
        first: boolean;
        kills: number;
      };
      inhibitor: {
        first: boolean;
        kills: number;
      };
      riftHerald: {
        first: boolean;
        kills: number;
      };
      tower: {
        first: boolean;
        kills: number;
      };
    };
    teamId: number;
    win: boolean;
  }[];
}

interface MatchDetail {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: MatchInfo;
}

interface MatchSimple {
  matchId: string;
  gameCreation: number;
  gameDuration: number;
  gameMode: string;
  teamPosition: string;
  championId: number;
  champLevel: number;
  kills: number;
  deaths: number;
  assists: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summoner1Id: number;
  summoner2Id: number;
  perks: {
    statPerks: {
      defense: number;
      flex: number;
      offense: number;
    },
    styles: {
      description: string;
      selections: {
        perk: number;
        var1: number;
        var2: number;
        var3: number;
      }[];
      style: number;
    }[]
  };
  participants: {
    championId: number;
    individualPosition: string;
    summonerName: string;
  }[];
}

const matchSchema: Schema = new Schema({
  metadata: {
    dataVersion: {
      type: String,
      required: true
    },
    matchId: {
      type: String,
      required: true
    },
    participants: [{
      type: String
    }]
  },
  info: {
    gameCreation: {
      type: Number,
      required: true
    },
    gameDuration: {
      type: Number,
      required: true
    },
    gameId: {
      type: Number,
      required: true
    },
    gameMode: {
      type: String,
      required: true
    },
    participants: [{
      summonerName: {
        type: String,
        required: true
      },
      teamPosition: {
        type: String
      },
      championId: {
        type: Number,
        required: true
      },
      champLevel: {
        type: Number
      },
      goldEarned: {
        type: Number
      },
      item0: {
        type: Number
      },
      item1: {
        type: Number
      },
      item2: {
        type: Number
      },
      item3: {
        type: Number
      },
      item4: {
        type: Number
      },
      item5: {
        type: Number
      },
      item6: {
        type: Number
      },
      summoner1Id: {
        type: Number
      },
      summoner2Id: {
        type: Number
      },
      perks: {
        statPerks: {
          defense: {
            type: Number
          },
          flex: {
            type: Number
          },
          offense: {
            type: Number
          },
        },
        styles: [{
          description: {
            type: String
          },
          selections: [{
            perk: {
              type: Number
            },
            var1: {
              type: Number
            },
            var2: {
              type: Number
            },
            var3: {
              type: Number
            },
            versionKey: false
          }],
          style: {
            type: Number
          },
          versionKey: false
        }]
      },
      kills: {
        type: Number
      },
      deaths: {
        type: Number
      },
      assists: {
        type: Number
      },
      totalDamageDealtToChampions: {
        type: Number
      },
      teamId: {
        type: Number
      },
      versionKey: false
    }],
    teams: [{
      bans: [{
        championId: {
          type: Number
        },
        pickTurn: {
          type: Number
        }
      }],
      objectives: {
        baron: {
          first: {
            type: Boolean
          },
          kills: {
            type: Number
          },
        },
        champion: {
          first: {
            type: Boolean
          },
          kills: {
            type: Number
          }
        },
        dragon: {
          first: {
            type: Boolean
          },
          kills: {
            type: Number
          }
        },
        inhibitor: {
          first: {
            type: Boolean
          },
          kills: {
            type: Number
          }
        },
        riftHerald: {
          first: {
            type: Boolean
          },
          kills: {
            type: Number
          }
        },
        tower: {
          first: {
            type: Boolean
          },
          kills: {
            type: Number
          }
        },
      },
      teamId: {
        type: Number
      },
      win: {
        type: Boolean
      },
      versionKey: false
    }]
  }
}, { versionKey: false });

const Match = model('match', matchSchema);
export { Match, MatchDetail, MatchSimple };