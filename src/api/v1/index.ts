import { Router } from 'express'
import summoners from './summoners'

const router = Router();

router.use('/summoners', summoners);

export default router;