/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { LikeRepositories } from './like.repositories';
import { ApplicationError } from 'error';
import { CreateLikeDto } from './dto/create.like.dto';

@Injectable()
export class LikeService {
    constructor(private likeRepo: LikeRepositories){}

    async create(payload: CreateLikeDto) {
        try {
            const {user_id, post_id} = payload
            const user = await this.likeRepo.findByUserId(user_id)

            let likes:any
            if(user[0]) {
                throw new ApplicationError('User already like', 403)
            } else {
                likes = await this.likeRepo.create({...payload, user_id, post_id})
            }
            
            return likes

        } catch (error) {
            throw new ApplicationError(error.message, error.statusCode)
        }
    }

    async getAllLikeByPost(post_id: string) {
        try {            
            const likesUser = await this.likeRepo.findAllPost(post_id)
            return likesUser
        } catch (error) {
            throw new ApplicationError(error.message, error.statusCode)
        }
    }

    async getAllLikes() {
        try {
            const likes = await this.likeRepo.findAllLike()
            return likes
        } catch (error) {
            throw new ApplicationError(error.message, error.statusCode)
        }
    }
}
 