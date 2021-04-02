import { HttpException, HttpStatus } from '@nestjs/common';
import crypto from 'crypto';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload';
import { resolve } from 'path';
import { uploadFile } from '../storage/AWS';
import fs from 'fs';

const upload = async (
  folder: string,
  file: FileUpload,
  type: string,
): Promise<{ fileName: string; path: string }> => {
  switch (type) {
    case 'image':
      if (
        !['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'].find(
          (element) => element === file.mimetype,
        )
      ) {
        throw new HttpException('Format file invalid!', HttpStatus.BAD_REQUEST);
      }
      break;
  }

  const fileHash = crypto.randomBytes(16).toString('hex');

  const fileName = `${fileHash}-${file.filename}`;

  fileName.replace(/=/g, '').replace(/\//g, '-').replace(/\+/, '_');

  const path = resolve(__dirname, '..', '..', 'uploads', folder, fileName);

  // uploadFile(file);
  if (!fs.existsSync(resolve(__dirname, '..', '..', 'uploads', folder))) {
    console.log(1);
    fs.mkdirSync(resolve(__dirname, '..', '..', 'uploads'));
    fs.mkdirSync(resolve(__dirname, '..', '..', 'uploads', folder));
  }

  console.log('aqui', resolve(__dirname, '..', '..', 'uploads', folder));

  await new Promise(async (resolve, reject) =>
    file
      .createReadStream()
      .pipe(createWriteStream(path))
      .on('finish', (_data: any) => {
        resolve(true);
      })
      .on('error', (_error) => {
        reject(false);
      }),
  );

  return { fileName, path };
};

export default upload;
