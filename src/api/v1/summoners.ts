import { Request, Response, Router } from 'express';
import { SummonerService } from '../../services/summoners.service';

const router = Router();

router.get('/:summonerName', async (req: Request, res: Response) => {
  const summonerName = req.params.summonerName;
  const summoner = await SummonerService.find(summonerName);
  res.status(200).json({ errorCode: 200, summoner: summoner });
});

export default router;