import axios from 'axios'

export class SummonerService {
  public static async find(summonerName: string) {
    const headers = { 'X-Riot-Token': process.env.RIOT_API_KEY };
    const accountUri = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    const accountRes = await axios.get(accountUri, {headers: headers});
    const id = accountRes.data.id;
    const puuid = accountRes.data.puuid;
    const rankUri = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`;
    const rankRes = await axios.get(rankUri, {headers: headers});
    const masteryUri = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`;
    const masteryRes = await axios.get(masteryUri, {headers: headers});
    const matchIdUri = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`;
    const matchIdRes = await axios.get(matchIdUri, {headers: headers});
    const matchIds = matchIdRes.data;
    let matchs = [];
    for (let matchId of matchIds) {
      let matchUri = `https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`;
      try {
        let matchRes = await axios.get(matchUri, {headers: headers});
        matchs.push(matchRes.data);
      } catch (err) {
        break;
      }
    }

    return {
      account: accountRes.data,
      rank: rankRes.data,
      mastery: masteryRes.data,
      matchs: matchs
    };
  }
}