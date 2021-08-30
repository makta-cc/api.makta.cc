import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import v1 from './api/v1';

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('short'));

app.get('/healthCheck', (req: Request, res: Response) => {
  res.status(200).json({ errorCode: 200, message: 'OK' });
});

app.use('/api/v1', v1);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  err.code = 404;
  next(err);
});

app.use((err: any, req: Request, res: Response, _: NextFunction) => {
  res.status(err.status || 500).json({
    errorCode: err.code,
    message: err.message
  });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));