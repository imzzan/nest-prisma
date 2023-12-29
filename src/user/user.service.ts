/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ApplicationError } from '../../error';
import { CreateUserDto } from './dto/create.user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update.user.dto';

config()
@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}
  async create(payload: CreateUserDto) {
    try {
      const { password, email, age } = payload;

      const currentUser = await this.userRepo.findEmail(email);

      if (currentUser) {
        throw new ApplicationError('Email has already been used', 409);
      }

      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);

      const user = await this.userRepo.create({
        ...payload,
        password: hashPassword,
        age: Number(age)
      });
      return user;
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async login(payload: LoginDto) {
    try {
      const { email, password } = payload;

      const currentUser = await this.userRepo.findEmail(email);
      if (!currentUser) {
        throw new ApplicationError('Email not found', 404);
      }
      const { id, age } = currentUser

      const matchPassword = await compare(password, currentUser.password);
      if (!matchPassword) {
        throw new ApplicationError('Password you entered is wrong', 400);
      }

      const accessToken = sign({id, email, age}, process.env.ACCESS_TOKEN, {
        expiresIn: '2h'
      })

      return { currentUser, accessToken };
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async getALLUser() {
    try {
      const user = await this.userRepo.findAll()
      return user
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }


  async currentUser(id: string) {
    try {
      const user = await this.userRepo.findById(id)
      return user
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    try {
      const {password} = payload
      const currentUser = await this.userRepo.findById(id);
      if(!currentUser) {
        throw new ApplicationError('User not found', 404)
      }
      
      const salt = await genSalt(10)
      const hashPassword = await hash(password, salt)
      
      const user = await this.userRepo.updateUser(id, {...payload, password: hashPassword})
      
      return user
    } catch (error) {
      throw new ApplicationError(error.message, error.statusCode);
    }
  }
}
