/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import cloudinary from 'utils/cloudinary';

interface RequestImge extends Request {
  image: string;
}

@Injectable()
export class UploadCloudMiddleware implements NestMiddleware {
  use(req: RequestImge, res: Response, next: NextFunction) {
    const fileBase64 = req.file.buffer.toString('base64');
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
    cloudinary.uploader.upload(file, function (err, result) {
      if (err) {
        return res.status(400).json({
          message: 'Failed upload file!',
        });
      }
      req.image = result.url;
      next();
    });
  }
}
