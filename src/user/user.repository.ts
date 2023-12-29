/* eslint-disable prettier/prettier */

import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}
  create(payload: CreateUserDto) {
    return this.prisma.user.create({
      data: payload,
    });
  }

  findEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  updateUser(id: string, payload: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { ...payload },
    });
  }
}
