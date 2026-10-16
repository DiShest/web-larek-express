import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { isCelebrateError } from 'celebrate';

interface IAppError extends Error {
  statusCode?: number;
  code?: number;
}

const errorHandler: ErrorRequestHandler = (err: IAppError, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (isCelebrateError(err)) {
    res.status(400).json({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err instanceof mongoose.Error.ValidationError || err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'Переданы некорректные данные' });
    return;
  }
  if (err.code === 11000) {
    res.status(409).json({ message: 'Товар с таким названием уже существует' });
    return;
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message,
  });
};

export default errorHandler;
