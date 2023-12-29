/* eslint-disable prettier/prettier */

import { Controller, Res, Body, Post, Req, Get, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { Request, Response } from 'express';

interface UserProps  extends Request{
    image: string
}

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('register')
  async register(@Body() payload: CreateUserDto, @Req() req: UserProps, @Res() res: Response) {
    try {
      const image = req.image
      const response = await this.userService.create({...payload, image});
      res.status(201).json({
        status: 'OK',
        message: 'User Success Register',
        data: response,
      });
    } catch (error) {
        console.log(error);
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Post('login')
  async login(@Body() payload: LoginDto, @Req() req, @Res() res) {
    try {
      const response = await this.userService.login(payload);
      res.status(200).json({
        status: 'OK',
        message: 'User Success Login',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Get('users')
  async getAllUser(@Res() res) {
    try {
      const response = await this.userService.getALLUser();
      res.status(200).json({
        status: 'OK',
        message: 'User Success Get Current User',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Get('me')
  async currentUser(@Req() req, @Res() res) {
    try {
      const { id } = req.user;
      const response = await this.userService.currentUser(id);
      res.status(200).json({
        status: 'OK',
        message: 'User Success Get Current User',
        data: response,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'FAIL',
        message: error.message,
      });
    }
  }

  @Put('users')
  async updateUser(@Body() payload: UpdateUserDto, @Req() req, @Res() res) {
    try {
      const { id } = req.user;
      const response = await this.userService.updateUser(id, payload);
      res.status(201).json({
        status: 'OK',
        message: 'User Success update profile',
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
