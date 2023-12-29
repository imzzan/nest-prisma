/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserMiddleware implements NestMiddleware {

  constructor( private prisma: PrismaService){}

  async use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
