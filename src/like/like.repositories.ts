/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateLikeDto } from "./dto/create.like.dto";

@Injectable()
export class LikeRepositories {
    constructor( private prisma: PrismaService){}

    create(payload: CreateLikeDto) {
        return this.prisma.like.create({
            data: {...payload}
        })
    }

    findAllLike() {
        return this.prisma.like.findMany()
    }

    findByUserId(user_id: string) {
        return this.prisma.like.findMany({
            where: {user_id}
        })
    }

    findAllPost(post_id: string) {
        return this.prisma.like.findMany({
            where: {post_id},
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
    }

    find_total_like(post_id: string) {
        return this.prisma.like.count({
            where: {post_id},

        })
    }
}