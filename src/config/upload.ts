import fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { resolve } from 'path';
import { createReader } from 'awaitify-stream';

import { handleFileData } from '../storage/upload';
import validate from '../utils/validateFile';
import compressPicture from '../utils/compressPicture';
import generateName from '../utils/generateName';
import mkdirp from 'mkdirp';

interface IUploadFile {
  url: string;
  filename: string;
}

const uploadFile = async (
  file: FileUpload,
  type: string,
  dir?: string,
): Promise<IUploadFile> => {
  validate(type, file.mimetype);

  let filename = generateName(file.filename);
  let mimetype: string;
  let buffer: Buffer;
  let url: string;

  await mkdirp(resolve(__dirname, '..', '..', 'temp'));

  const pathTemp = resolve(__dirname, '..', '..', 'temp', filename);

  if (type === 'image') {
    const upload = new Promise(async (resolve) => {
      file
        .createReadStream()
        .pipe(fs.createWriteStream(pathTemp))
        .on('finish', () => resolve(true))
        .on('error', () => {
          throw new HttpException(
            'Error uploading file',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    });

    await upload.then(async () => {
      const pathCompress = await compressPicture(pathTemp, filename, 500);

      fs.unlink(pathTemp, (err) => {
        if (err) console.log(err);
      });

      buffer = pathCompress.buffer;
      filename = pathCompress.filename;
      mimetype = pathCompress.mimetype;
    });
  } else {
    let bufferArray: Array<any> = [];
    let reader = createReader(file.createReadStream());
    let chunk: any;

    while (null !== (chunk = await reader.readAsync())) {
      bufferArray.push(chunk);
    }

    buffer = Buffer.concat(bufferArray);
  }

  if (dir) filename = dir + '/' + filename;

  try {
    const upload = await handleFileData(buffer, filename, mimetype);

    url = upload.Location;
  } catch (error) {
    throw new HttpException(
      'Error uploading file',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  return { url, filename };
};

export { uploadFile };
