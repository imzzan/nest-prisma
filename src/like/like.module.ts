/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma.service';
import { LikeController } from './like.controller';
import { LikeRepositories } from './like.repositories';
import { LikeService } from './like.service'

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from 'src/_middleware/auth.middleware';

@Module({
  imports: [],
  controllers: [LikeController],
  providers: [PrismaService,LikeRepositories, LikeService],
})
export class LikeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(LikeController);
  }
}
