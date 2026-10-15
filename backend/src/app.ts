import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import {
  PORT, DB_ADDRESS, ORIGIN_ALLOW, UPLOAD_PATH,
} from './config';
import indexRouter from './routes';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import NotFoundError from './errors/not-found-error';

const app = express();

app.use(requestLogger);
app.use(cors({ origin: ORIGIN_ALLOW }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'src', 'public', UPLOAD_PATH)));
app.use('/', indexRouter);
app.use((_req, _res, next) => next(new NotFoundError('Маршрут не найден')));
app.use(errorLogger);
app.use(errorHandler);

mongoose.connect(DB_ADDRESS)
  .then(() => {
    app.listen(PORT, () => {
      process.stdout.write(`Сервер запущен на порте ${PORT}\n`);
    });
  })
  .catch((error: unknown) => {
    process.stderr.write(`Не удалось подключиться к MongoDB: ${String(error)}\n`);
    process.exitCode = 1;
  });

export default app;
