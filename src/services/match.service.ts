import axios from 'axios';
import { Match, MatchDetail, MatchSimple } from '../models/match.model';


export class MatchService {
  private static async findFromRiotApi(puuid: string) {
    const headers = { 'X-Riot-Token': process.env.RIOT_API_KEY };
    const matchIdUri = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?limits=10`;
    const matchIdRes = await axios.get(matchIdUri, { headers: headers });
    const matchIds = matchIdRes.data;
    let matchs: MatchSimple[] = [];
    for (let matchId of matchIds) {
      let matchUri = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
      try {
        let matchRes = await axios.get(matchUri, { headers: headers });
        let matchDetail = new Match(matchRes.data);
        let myInfo = matchRes.data.info.participants.filter((p: any) => p.puuid === puuid)[0];
        let teamInfo: any[] = [];
        matchRes.data.info.participants.forEach((p: any) => {
          teamInfo.push({
            championId: p.championId,
            individualPosition: p.individualPosition,
            summonerName: p.summonerName
          });
        });
        matchDetail.save();
        let match: MatchSimple = {
          matchId: matchRes.data.metadata.matchId,
          gameCreation: matchRes.data.info.gameCreation,
          gameDuration: matchRes.data.info.gameDuration,
          gameMode:  matchRes.data.info.gameMode,
          teamPosition: myInfo.teamPosition,
          championId: myInfo.championId,
          champLevel: myInfo.champLevel,
          kills: myInfo.kills,
          deaths: myInfo.deaths,
          assists: myInfo.assists,
          item0: myInfo.item0,
          item1: myInfo.item1,
          item2: myInfo.item2,
          item3: myInfo.item3,
          item4: myInfo.item4,
          item5: myInfo.item5,
          item6: myInfo.item6,
          summoner1Id: myInfo.summoner1Id,
          summoner2Id: myInfo.summoner2Id,
          perks: myInfo.perks,
          participants: teamInfo
        };
        matchs.push(match);
      } catch (err) {
        break;
      }
    }
    return matchs;
  }

  public static async findByPuuid(puuid: string) {
    console.log('find match');
    const res = await Match.find({ "metadata.participants": puuid }).limit(10);
    if (res.length < 1) {
      return this.findFromRiotApi(puuid);
    }
    return res;
  }
}