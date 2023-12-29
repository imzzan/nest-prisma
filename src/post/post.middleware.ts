/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PostService } from './post.service';

interface Post extends Request{
  post: object
}

@Injectable()
export class PostMiddleware implements NestMiddleware {

  constructor (private postService: PostService){}
  
   async use(req: Post, res: Response, next: NextFunction) {
    const {id} = req.params;
    
    const post = await this.postService.detailPost(id)
    
    if(!post) {
      return res.status(404).json({
        status: 'FAIL',
        message: 'Post not found'
      })
    }

    req.post = post
    next();
  }
}
