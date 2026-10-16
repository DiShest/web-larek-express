import { RequestHandler, ErrorRequestHandler } from 'express';
import winston from 'winston';

const format = winston.format.json();
const requestLog = winston.createLogger({
  format,
  transports: [new winston.transports.File({ filename: 'request.log' })],
});
const errorLog = winston.createLogger({
  format,
  transports: [new winston.transports.File({ filename: 'error.log' })],
});

export const requestLogger: RequestHandler = (req, res, next) => {
  const started = Date.now();
  res.on('finish', () => {
    requestLog.info('HTTP request', {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: Date.now() - started,
    });
  });
  next();
};

export const errorLogger: ErrorRequestHandler = (err: Error, req, _res, next) => {
  errorLog.error(err.message, { method: req.method, url: req.originalUrl, stack: err.stack });
  next(err);
};
