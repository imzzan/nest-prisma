/* eslint-disable prettier/prettier */

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaService } from 'src/prisma.service';
import { AuthMiddleware } from 'src/_middleware/auth.middleware';
import { UploadCloudMiddleware } from 'src/_middleware/uploadcloud.middleware';
import * as multer from 'multer';

const storage = multer.memoryStorage();

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/register', method: RequestMethod.POST },
        { path: 'api/login', method: RequestMethod.POST },
        { path: 'api/users', method: RequestMethod.GET },
      )
      .forRoutes(UserController);
    consumer
      .apply(multer({ storage }).single('image'))
      .exclude(
        { path: 'api/login', method: RequestMethod.POST },
        { path: 'api/users', method: RequestMethod.GET },
        { path: 'api/me', method: RequestMethod.GET },
      )
      .forRoutes(UserController);
    consumer
      .apply(UploadCloudMiddleware)
      .exclude(
        { path: 'api/login', method: RequestMethod.POST },
        { path: 'api/users', method: RequestMethod.GET },
        { path: 'api/me', method: RequestMethod.GET },
      )
      .forRoutes(UserController);
  }
}
