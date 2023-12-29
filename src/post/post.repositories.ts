/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create.post.dto';
import { UpdatePostDto } from './dto/update.post.dto';

@Injectable()
export class PostRepositories {
  constructor(private prisma: PrismaService) {}

  create(payload: CreatePostDto) {
    return this.prisma.post.create({
      data: { ...payload },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            age: true,
            email: true,
            image: true,
          },
        }
      },
    });
  }

  findAllByUser(id: string) {
    return this.prisma.post.findMany({
      where: { user_id: id },
      include: {
        user: {
          select: {
            name: true,
            age: true,
            email: true,
            image: true,
          },
        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            age: true,
            email: true,
            image: true,
          },
        },
      },
    });
  }

  update(id: string, payload: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: { ...payload },
    });
  }

  destroy(id: string) {
    return this.prisma.post.delete({
        where: { id },
    })
  }
}
