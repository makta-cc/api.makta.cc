import axios from 'axios';
import { ISummoner, Mastery, Rank, Summoner } from '../models/summoner.model';

export class SummonerService {
  private static async findFromRiotApi(summonerName: string) {
    const headers = { 'X-Riot-Token': process.env.RIOT_API_KEY };
    const accountUri = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    const accountRes = await axios.get(accountUri, {headers: headers});
    const { id, accountId, puuid, profileIconId, revisionDate, summonerLevel } = accountRes.data;

    const rankUri = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`;
    const rankRes = await axios.get(rankUri, {headers: headers});
    const rankArr: Rank[] = [];
    rankRes.data.forEach((r: any) => {
      let { leagueId, queueType, tier, rank, leaguePoints, wins, losses } = r;
      rankArr.push({
        leagueId: leagueId,
        queueType: queueType,
        tier: tier,
        rank: rank,
        leaguePoints: leaguePoints,
        wins: wins,
        losses: losses
      });
    });

    const masteryUri = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`;
    const masteryRes = await axios.get(masteryUri, {headers: headers});
    const masteryArr: Mastery[] = [];
    masteryRes.data.forEach((m: any) => {
      masteryArr.push({
        championId: m.championId,
        championLevel: m.championLevel,
        championPoints: m.championPoints
      });
    });

    const summoner: ISummoner = {
      id: id,
      accountId: accountId,
      puuid: puuid,
      name: summonerName,
      profileIconId: profileIconId,
      revisionDate: revisionDate,
      summonerLevel: summonerLevel,
      rank: rankArr,
      mastery: masteryArr
    };
    return summoner;
  }

  public static async findByName(summonerName: string) {
    const res = await Summoner.findOne({ name: summonerName });
    if (res === null) {
      const summoner = await this.findFromRiotApi(encodeURIComponent(summonerName));
      const summonerDoc = new Summoner(summoner);
      summonerDoc.save();
      return summoner;
    }
    return res;
  }
}