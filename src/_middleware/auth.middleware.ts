/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/middleware#middleware
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';

interface AuthInterface extends Request {
  user: any;
}

config();
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthInterface, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({
        status: 'FAIL',
        message: 'Unauthorized',
      });
    }
    const bererToken = authHeader.split(' ');
    const token = bererToken[1];
    const user = verify(token, process.env.ACCESS_TOKEN, (error, payload) => {
      if (error) {
        return res.status(403).json({
          status: 'FAIL',
          message: 'Access token not valid / time is out'
        })
      }
      return payload;
    });

    req.user = user;
    next();
  }
}
