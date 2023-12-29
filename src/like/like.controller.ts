/* eslint-disable prettier/prettier */

import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create.like.dto';
import { Request, Response } from 'express';

interface User {
    id: string;
}

interface RequestLike extends Request{
    user: User
    course: object
}

@Controller('api/likes')
export class LikeController {
    constructor (private likeServices: LikeService){}

    @Post()
    async create(@Body() payload: CreateLikeDto, @Req() req: RequestLike, @Res() res: Response) {
        try {
            const {id: user_id} = req.user
            const {post_id} = payload
            const response = await this.likeServices.create({...payload, user_id, post_id})
            res.status(201).json({
                status: 'OK',
                message: 'Like was created successfully',
                data: response
            })
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'FAIL',
                message: error.message
            })
        }
    }

    @Post('user')
    async getLikes(@Req() req: RequestLike, @Res() res: Response) {
        try {
            const {post_id} = req.body
            const response = await this.likeServices.getAllLikeByPost(post_id)
            res.status(201).json({
                status: 'OK',
                message: 'Get Like success',
                data: response
            })
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'FAIL',
                message: error.message
            })
        }
    }

    @Get()
    async getAllLikes(@Req() req: RequestLike, @Res() res: Response) {
        try {
            const response = await this.likeServices.getAllLikes()
            res.status(201).json({
                status: 'OK',
                message: 'Get Like success',
                data: response
            })
        } catch (error) {
            res.status(error.statusCode || 500).json({
                status: 'FAIL',
                message: error.message
            })
        }
    }
}
