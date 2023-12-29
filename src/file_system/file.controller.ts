/* eslint-disable prettier/prettier */

import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('api/file')
export class FileController {
    @Get()
    getFile(@Res() res: Response) {
      const file = createReadStream(join(process.cwd(), 'username.csv'));
      file.pipe(res);
    }
}
