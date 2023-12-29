/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PostRepositories } from './post.repositories';
import { ApplicationError } from 'error';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';
import { LikeRepositories } from 'src/like/like.repositories';

@Injectable()
export class PostService {
  constructor(
    private postRepo: PostRepositories,
    private likeRepo: LikeRepositories,
  ) {}

  async create(id: string, payload: CreatePostDto) {
    try {
      const post = await this.postRepo.create({ ...payload, user_id: id });
      return post;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async findAll() {
    try {
      const posts = await this.postRepo.findAll();
      await Promise.resolve(
        posts.map(async (item) => {
          const { id } = item;
          const total_like = await this.likeRepo.find_total_like(id);
          return await this.postRepo.update(id, { total_like });
        }),
      );
      return posts;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async findAllByUser(id: string) {
    try {
      const posts = await this.postRepo.findAllByUser(id);
      return posts;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async detailPost(id: string) {
    try {
      const posts = await this.postRepo.findById(id);
      return posts;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async updatePost(id: string, payload: UpdatePostDto) {
    try {
      const posts = await this.postRepo.update(id, payload);
      return posts;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async deletePost(id: string) {
    try {
      const posts = await this.postRepo.destroy(id);
      return posts;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }
}
