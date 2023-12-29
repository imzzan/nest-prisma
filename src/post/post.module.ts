/* eslint-disable prettier/prettier */
import { PrismaService } from 'src/prisma.service';
import { PostController } from './post.controller';
import { PostRepositories } from './post.repositories';
import { PostService } from './post.service';
import { MiddlewareConsumer, Module, NestModule,RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from 'src/_middleware/auth.middleware';
import { PostMiddleware } from './post.middleware';
import { LikeRepositories } from 'src/like/like.repositories';

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PostService, PostRepositories, PrismaService, LikeRepositories],
})
export class PostModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .exclude(
          { path: 'api/posts', method: RequestMethod.GET},
        )
        .forRoutes(PostController);
      consumer
        .apply(PostMiddleware)
        .exclude(
          { path: 'api/posts', method: RequestMethod.POST },
          { path: 'api/posts', method: RequestMethod.GET },
          { path: 'api/users/posts', method: RequestMethod.GET}
        )
        .forRoutes(PostController)
    }
}