/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create.post.dto';
import { Request, Response } from 'express';
import { UpdatePostDto } from './dto/update.post.dto';

interface User {
  id: string;
}

interface PostType {
  id: string;
}

interface RequestAll extends Request {
  user?: User;
  post?: PostType;
}

@Controller('api')
export class PostController {
  constructor(private postServices: PostService) {}

  @Post('/posts')
  async create(
    @Body() payload: CreatePostDto,
    @Req() req: RequestAll,
    @Res() res: Response,
  ) {
    try {
      const { id } = req.user;
      const response = await this.postServices.create(id, payload);
      res.status(201).json({
        status: 'OK',
        message: 'Created Post Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Get('posts')
  async getAll(@Res() res: Response) {
    try {
      const response = await this.postServices.findAll();
      res.status(200).json({
        status: 'OK',
        message: 'Get All Posts Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Get('users/posts')
  async getAllByUser(@Req() req: RequestAll, @Res() res: Response) {
    try {
      const { id } = req.user;
      const response = await this.postServices.findAllByUser(id);
      res.status(200).json({
        status: 'OK',
        message: 'Get All Posts by User Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Get('posts/:id')
  async getById(@Req() req: RequestAll, @Res() res: Response) {
    try {
      const response = req.post;
      res.status(200).json({
        status: 'OK',
        message: 'Get All Posts by User Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Put('posts/:id')
  async updatePost(
    @Body() payload: UpdatePostDto,
    @Req() req: RequestAll,
    @Res() res: Response,
  ) {
    try {
      const { id } = req.post;
      const response = await this.postServices.updatePost(id, payload);
      res.status(201).json({
        status: 'OK',
        message: 'Updated Post Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Delete('posts/:id')
  async deletePost(@Req() req: RequestAll, @Res() res: Response) {
    try {
      const { id } = req.post;
      const response = await this.postServices.deletePost(id);
      res.status(201).json({
        status: 'OK',
        message: 'Deleted Post Success',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }
}
