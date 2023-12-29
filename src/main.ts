/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import  rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  
    handler: (req, res, next, options) =>
      res.status(options.statusCode).json({
        status: 'FAIL',
        message: 'Too many requests, please try again later'
      })
  })

  app.enableCors();
  app.use(cookieParser());
  app.use(compression());
  app.use(limiter)
  await app.listen(3000);
}
bootstrap();
