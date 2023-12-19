import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(file: any): Promise<string> {
    try {
      const fileExtension = (file.originalname).split(".").pop();
      console.log(fileExtension);

      const fileName = uuid.v4() + ".jpg";
      const filePath = path.resolve(__dirname, "..", "static");

      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath, {recursive: true});

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (error) {
      throw new HttpException("Error saving file", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}