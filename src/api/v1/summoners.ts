import { Request, Response, Router } from 'express';
import { SummonerService } from '../../services/summoner.service';
import { MatchService } from '../../services/match.service'
import { ISummoner } from '../../models/summoner.model'

const router = Router();

router.get('/:summonerName', async (req: Request, res: Response) => {
  const summonerName = encodeURIComponent(req.params.summonerName);
  const summoner: ISummoner = await SummonerService.findByName(summonerName) as ISummoner;
  const match = await MatchService.findByPuuid(summoner.puuid);
  res.status(200).json({ errorCode: 200, summoner: summoner, match: match });
});

export default router;